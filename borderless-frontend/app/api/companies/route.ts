import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const companiesFilePath = path.join(process.cwd(), "app", "data", "companies.json");

async function getCompanies() {
  const data = await fs.readFile(companiesFilePath, "utf8");
  return JSON.parse(data);
}

async function saveCompanies(companies: any[]) {
  await fs.writeFile(companiesFilePath, JSON.stringify(companies, null, 2));
}

export async function GET() {
  try {
    const companies = await getCompanies();
    return NextResponse.json(companies);
  } catch (error) {
    console.error("Error reading companies:", error);
    return NextResponse.json(
      { error: "Failed to get companies" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const newCompany = await req.json();
    const companies = await getCompanies();

    // Generate a new ID
    const maxId = Math.max(...companies.map((c: any) => parseInt(c.id)), 0);
    newCompany.id = (maxId + 1).toString();

    companies.push(newCompany);
    await saveCompanies(companies);

    return NextResponse.json(newCompany, { status: 201 });
  } catch (error) {
    console.error("Error adding company:", error);
    return NextResponse.json(
      { error: "Failed to add company" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Company ID is required" },
        { status: 400 }
      );
    }

    let companies = await getCompanies();
    companies = companies.filter((company: any) => company.id !== id);
    await saveCompanies(companies);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting company:", error);
    return NextResponse.json(
      { error: "Failed to delete company" },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const updatedCompany = await req.json();
    let companies = await getCompanies();

    const index = companies.findIndex(
      (company: any) => company.id === updatedCompany.id
    );
    if (index === -1) {
      return NextResponse.json({ error: "Company not found" }, { status: 404 });
    }

    companies[index] = updatedCompany;
    await saveCompanies(companies);

    return NextResponse.json(updatedCompany);
  } catch (error) {
    console.error("Error updating company:", error);
    return NextResponse.json(
      { error: "Failed to update company" },
      { status: 500 }
    );
  }
}

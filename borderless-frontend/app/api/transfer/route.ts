// app/api/transfer/route.ts

import { NextResponse } from "next/server";
import { operatorTransferTokens } from "../../utils/blockchain";
import companies from "../../data/companies.json";

export async function POST(request: Request) {
  const body = await request.json();
  const { toAddress, amount } = body;

  if (!toAddress || !amount) {
    return NextResponse.json(
      { message: "Missing parameters" },
      { status: 400 }
    );
  }

  // Get agent's wallet address from companies.json
  const agentCompany = companies.find((company) => company.type === "agent");
  if (!agentCompany) {
    return NextResponse.json(
      { message: "Agent company not found" },
      { status: 500 }
    );
  }
  const fromAddress = agentCompany.wallet;

  try {
    const txHash = await operatorTransferTokens(fromAddress, toAddress, amount);
    return NextResponse.json(
      { message: "Tokens transferred successfully", txHash },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error transferring tokens:", error);
    return NextResponse.json(
      { message: "Error transferring tokens", error: error.message },
      { status: 500 }
    );
  }
}

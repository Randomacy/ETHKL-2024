// app/api/burn/route.ts
import { NextRequest, NextResponse } from "next/server";
import { burnTokens } from "../../utils/blockchain";

export async function POST(req: NextRequest) {
  try {
    const { address, amount } = await req.json();

    if (!address || !amount) {
      return NextResponse.json(
        { message: "Missing parameters" },
        { status: 400 }
      );
    }

    const txHash = await burnTokens(address, amount);
    return NextResponse.json({ message: "Tokens burned successfully", txHash });
  } catch (error: any) {
    console.error("Error burning tokens:", error);
    return NextResponse.json(
      { message: "Error burning tokens", error: error.message },
      { status: 500 }
    );
  }
}

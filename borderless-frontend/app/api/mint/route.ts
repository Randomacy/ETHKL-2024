// app/api/mint/route.ts
import { NextRequest, NextResponse } from "next/server";
import { mintTokens } from "../../utils/blockchain";

export async function POST(req: NextRequest) {
  try {
    const { address, amount } = await req.json();

    if (!address || !amount) {
      return NextResponse.json(
        { message: "Missing parameters" },
        { status: 400 }
      );
    }

    const txHash = await mintTokens(address, amount);
    return NextResponse.json({ message: "Tokens minted successfully", txHash });
  } catch (error: any) {
    console.error("Error minting tokens:", error);
    return NextResponse.json(
      { message: "Error minting tokens", error: error.message },
      { status: 500 }
    );
  }
}

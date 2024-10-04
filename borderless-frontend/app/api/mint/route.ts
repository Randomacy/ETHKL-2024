import { NextResponse } from "next/server";
import { mintTokens } from "@/app/utils/blockchain";

export async function POST(request: Request) {
  const body = await request.json();
  const { address, amount } = body;

  if (!address || !amount) {
    return NextResponse.json(
      { error: "Missing required parameters" },
      { status: 400 }
    );
  }

  try {
    const amountString = amount.toString();
    const txHash = await mintTokens(address, amountString);
    return NextResponse.json({ txHash });
  } catch (error) {
    console.error("Error minting tokens:", error);
    let errorMessage = "Failed to mint tokens";
    if (error instanceof Error) {
      errorMessage += `: ${error.message}`;
      // Check for specific error conditions
      if (error.message.includes("does not have the minter role")) {
        return NextResponse.json(
          { error: "Unauthorized: Minter role required" },
          { status: 403 }
        );
      }
    }
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

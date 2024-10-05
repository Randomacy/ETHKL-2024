// app/api/history/route.ts
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const walletAddress = "0x529354De2CAAcBB8Fa5f4A2F24Bf586427b8da5E";
  const contractAddress = "0x5543005f3aA8716EE90b627aa9Ae52AB4127Ab93";

  // Manta Pacific Sepolia testnet API endpoint for transaction history
  const mantaPacificAPI = `https://pacific-explorer.sepolia-testnet.manta.network/api?module=account&action=txlist&address=${walletAddress}`;

  try {
    const response = await fetch(mantaPacificAPI);
    const data = await response.json();

    if (data.status === "1") {
      // Filter only relevant transactions involving the contract address
      const filteredTransactions = data.result.filter(
        (tx: any) => tx.to === contractAddress || tx.from === contractAddress
      );

      return NextResponse.json({
        status: "success",
        transactions: filteredTransactions,
      });
    } else {
      return NextResponse.json({
        status: "error",
        message: "No transactions found",
      });
    }
  } catch (error) {
    console.error("Error fetching transaction history:", error);
    return NextResponse.json({
      status: "error",
      message: "Failed to fetch transaction history",
    });
  }
}

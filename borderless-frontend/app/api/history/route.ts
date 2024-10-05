import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const walletAddress =
    "0x529354De2CAAcBB8Fa5f4A2F24Bf586427b8da5E".toLowerCase();

  // Manta Pacific Sepolia testnet API endpoint for ERC-20 token transfer history
  const mantaPacificAPI = `https://pacific-explorer.sepolia-testnet.manta.network/api?module=account&action=tokentx&address=${walletAddress}`;

  try {
    const response = await fetch(mantaPacificAPI, {
      method: "GET",
      headers: {
        "Cache-Control":
          "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0",
      },
    });
    const data = await response.json();

    if (data.status === "1") {
      const filteredTransactions = data.result.map((tx: any) => {
        const txFrom = tx.from.toLowerCase();
        const txTo = tx.to.toLowerCase();

        // Calculate token amount by dividing value by 10^tokenDecimal and rounding to 2 decimal places
        const tokenAmount = (
          parseFloat(tx.value) / Math.pow(10, tx.tokenDecimal)
        ).toFixed(2);

        // Convert gas price to Gwei and round to 2 decimal places
        const gasPriceGwei = (
          parseFloat(tx.gasPrice) / Math.pow(10, 9)
        ).toFixed(2);

        return {
          blockNumber: tx.blockNumber,
          from: txFrom,
          to: txTo,
          tokenAmount, // Readable token amount with 2 decimal places
          contractAddress: tx.contractAddress,
          tokenName: tx.tokenName,
          tokenSymbol: tx.tokenSymbol,
          gasUsed: tx.gasUsed,
          gasPrice: gasPriceGwei, // Gas price in Gwei with 2 decimal places
          date: tx.timeStamp,
        };
      });

      return NextResponse.json({
        status: "success",
        transactions: filteredTransactions,
      });
    } else {
      return NextResponse.json({
        status: "error",
        message: "No token transactions found",
      });
    }
  } catch (error) {
    console.error("Error fetching token transaction history:", error);
    return NextResponse.json({
      status: "error",
      message: "Failed to fetch token transaction history",
    });
  }
}

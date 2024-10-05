import { NextResponse } from "next/server";
import {
  transferTokens,
  mintTokens,
  burnTokens,
  getTokenBalance,
} from "../../utils/blockchain";
import companies from "../../data/companies.json";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type");
  const action = searchParams.get("action");

  if (action === "balance") {
    const agentWallet = companies.find((c) => c.id === "agent1")?.wallet;
    if (!agentWallet) {
      return NextResponse.json(
        { error: "Agent wallet not found" },
        { status: 400 }
      );
    }
    try {
      const balance = await getTokenBalance(agentWallet);
      return NextResponse.json({ balance });
    } catch (error) {
      return NextResponse.json(
        { error: "Failed to get balance" },
        { status: 500 }
      );
    }
  }

  if (type) {
    const filteredCompanies = companies.filter(
      (company) => company.type === type
    );
    return NextResponse.json(filteredCompanies);
  }

  return NextResponse.json(companies);
}

export async function POST(req: Request) {
  try {
    const { action, fromId, toId, amount } = await req.json();

    const fromCompany = companies.find((c) => c.id === fromId);
    const toCompany = companies.find((c) => c.id === toId);

    if (
      (action === "transfer" && (!fromCompany || !toCompany)) ||
      (action === "mint" && !toCompany) ||
      (action === "burn" && !fromCompany)
    ) {
      return NextResponse.json(
        { error: "Invalid company ID" },
        { status: 400 }
      );
    }

    let txHash;

    switch (action) {
      case "transfer":
        if (!fromCompany?.wallet || !toCompany?.wallet) {
          return NextResponse.json(
            { error: "Wallet not found for one or both companies" },
            { status: 400 }
          );
        }
        txHash = await transferTokens(
          fromCompany.wallet,
          toCompany.wallet,
          amount
        );
        break;
      case "mint":
        if (!toCompany?.wallet) {
          return NextResponse.json(
            { error: "Wallet not found for minting" },
            { status: 400 }
          );
        }
        txHash = await mintTokens(toCompany.wallet, amount);
        break;
      case "burn":
        if (!fromCompany?.wallet) {
          return NextResponse.json(
            { error: "Wallet not found for burning" },
            { status: 400 }
          );
        }
        txHash = await burnTokens(fromCompany.wallet, amount);
        break;
      default:
        return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }

    return NextResponse.json({ success: true, transactionHash: txHash });
  } catch (error) {
    console.error("Error processing transaction:", error);

    // Type narrowing for `error`
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message || "Transaction failed" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: "An unknown error occurred" },
      { status: 500 }
    );
  }
}

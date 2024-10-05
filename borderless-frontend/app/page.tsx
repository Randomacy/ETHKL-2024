"use client";

import { useState, useEffect } from "react";
import {
  FaShip,
  FaUserCircle,
  FaExchangeAlt,
  FaMoneyBillWave,
  FaUserTie,
} from "react-icons/fa";
import companiesData from "./data/companies.json";

interface Company {
  id: string;
  name: string;
  type: string;
  wallet: string;
}

interface Transaction {
  blockNumber: string;
  date: string;
  tokenAmount: string;
  from: string;
  to: string;
  status: string;
}

export default function BorderlessMaritimeFinance() {
  const [balance, setBalance] = useState("0.00");
  const [amount, setAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  const [transactionType, setTransactionType] = useState("pay");
  const [companies, setCompanies] = useState<Company[]>(companiesData);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  // Get agent's wallet address from companiesData
  const agentCompany = companies.find((company) => company.type === "agent");
  const agentWalletAddress = agentCompany ? agentCompany.wallet : "";

  // API to fetch balance
  const fetchBalance = async () => {
    try {
      const response = await fetch(
        `/api/transaction?action=balance&address=${agentWalletAddress}`
      );
      if (!response.ok) throw new Error("Failed to fetch balance");
      const data = await response.json();
      setBalance(data.balance); // Sets the balance in two decimal places
    } catch (error) {
      console.error("Error fetching balance:", error);
    }
  };

  // Fetch balance and transaction history on component mount
  useEffect(() => {
    fetchBalance();
    fetchTransactionHistory();
  }, []);

  // Function to fetch transaction history from the API
  const fetchTransactionHistory = async () => {
    try {
      const response = await fetch("/api/history", {
        method: "GET",
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
        },
      });
      const data = await response.json();
      if (data.status === "success") {
        // Update the transactions state
        setTransactions(data.transactions); // Show only last 10 transactions
      } else {
        setError("Failed to fetch transaction history.");
      }
    } catch (err) {
      console.error("Error fetching transaction history:", err);
      setError("Failed to fetch transaction history.");
    }
  };

  // Function to get company name by wallet address
  const getCompanyNameByWallet = (wallet: string) => {
    const company = companies.find(
      (company) => company.wallet.toLowerCase() === wallet.toLowerCase()
    );
    return company ? company.name : "Unknown";
  };

  const handleTransaction = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true); // Set loading to true when transaction starts

    if (parseFloat(amount) <= 0) {
      setError("Amount must be greater than zero");
      setLoading(false); // Reset loading state
      return;
    }

    try {
      if (transactionType === "pay") {
        // Get the recipient company's wallet address
        const supplier = companies.find((company) => company.id === recipient);
        if (!supplier) {
          setError("Supplier not found.");
          setLoading(false); // Reset loading state
          return;
        }

        // Call the API endpoint to transfer tokens
        const response = await fetch("/api/transfer", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            toAddress: supplier.wallet,
            amount: amount,
          }),
        });

        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || "Failed to transfer tokens");
        }

        // Refresh the transaction history after the transaction completes
        fetchTransactionHistory();
        fetchBalance();

        setSuccess(
          `Transaction completed successfully. TX Hash: ${data.txHash}`
        );
        setAmount("");
        setRecipient("");
      }
    } catch (err) {
      console.error("Transaction failed:", err);
      if (err instanceof Error) {
        setError(err.message || "Transaction failed. Please try again.");
      } else {
        setError("Transaction failed. Please try again.");
      }
    } finally {
      setLoading(false); // Reset loading state when transaction is done
    }
  };

  // Filter companies based on transaction type
  const filteredCompanies = companies.filter((company) => {
    if (transactionType === "pay") {
      return company.type === "supplier";
    } else if (transactionType === "exchange") {
      return company.type === "agent";
    }
    return false;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-blue-600 p-4 shadow-md">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <FaShip className="h-8 w-8 text-white" />
            <span className="text-xl font-bold text-white">
              Borderless Maritime Finance
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <FaUserCircle className="h-8 w-8 text-white" />
            <span className="text-white">Ship Agent</span>
          </div>
        </div>
      </nav>

      <main className="container mx-auto mt-8 px-4">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="rounded-lg bg-white p-6 shadow-md">
            <h2 className="mb-4 text-xl font-semibold text-gray-800">
              Account Balance
            </h2>
            <div className="text-3xl font-bold text-blue-600">
              ${balance} USD
            </div>
          </div>

          <div className="rounded-lg bg-white p-6 shadow-md">
            <h2 className="mb-4 text-xl font-semibold text-gray-800">
              Quick Actions
            </h2>
            <div className="flex justify-around">
              <button
                onClick={() => setTransactionType("pay")}
                className="flex flex-col items-center p-2 hover:bg-gray-100 rounded"
              >
                <FaMoneyBillWave className="h-8 w-8 text-green-500 mb-2" />
                <span>Pay Supplier</span>
              </button>
              <button
                onClick={() => setTransactionType("exchange")}
                className="flex flex-col items-center p-2 hover:bg-gray-100 rounded"
              >
                <FaExchangeAlt className="h-8 w-8 text-blue-500 mb-2" />
                <span>Exchange</span>
              </button>
              <button
                onClick={() => setTransactionType("redeem")}
                className="flex flex-col items-center p-2 hover:bg-gray-100 rounded"
              >
                <FaUserTie className="h-8 w-8 text-purple-500 mb-2" />
                <span>Redeem Fiat</span>
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 rounded-lg bg-white p-6 shadow-md">
          <h2 className="mb-4 text-xl font-semibold text-gray-800">
            {transactionType === "exchange" && "Exchange Funds"}
            {transactionType === "pay" && "Pay Ship Supplier"}
            {transactionType === "redeem" && "Redeem Fiat"}
          </h2>
          {error && <div className="mb-4 text-red-500">{error}</div>}
          {success && <div className="mb-4 text-green-500">{success}</div>}
          <form onSubmit={handleTransaction} className="space-y-4">
            <div>
              <label
                htmlFor="amount"
                className="block text-sm font-medium text-gray-700"
              >
                Amount (USD)
              </label>
              <input
                id="amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="recipient"
                className="block text-sm font-medium text-gray-700"
              >
                {transactionType === "exchange" && "Borderless Account"}
                {transactionType === "pay" && "Ship Supplier"}
                {transactionType === "redeem" && "Your Bank Account"}
              </label>
              {transactionType === "exchange" || transactionType === "pay" ? (
                <select
                  id="recipient"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option value="">Select a company</option>
                  {filteredCompanies.map((company) => (
                    <option key={company.id} value={company.id}>
                      {company.name}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  id="recipient"
                  type="text"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  placeholder="Enter your bank account"
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              )}
            </div>
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              disabled={loading} // Disable button when loading
            >
              {loading ? ( // Show spinner if loading
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  ></path>
                </svg>
              ) : (
                // Normal button text when not loading
                <>
                  {transactionType === "exchange" && "Exchange Funds"}
                  {transactionType === "pay" && "Pay Supplier"}
                  {transactionType === "redeem" && "Redeem Fiat"}
                </>
              )}
            </button>
          </form>
        </div>

        <div className="mt-8 rounded-lg bg-white p-6 shadow-md">
          <h2 className="mb-4 text-xl font-semibold text-gray-800">
            Transaction History
          </h2>
          <ul className="space-y-4">
            {transactions.length > 0 ? (
              transactions.slice(0, 10).map((tx) => (
                <li
                  key={tx.blockNumber}
                  className="flex items-center justify-between border-b pb-2"
                >
                  <div>
                    <p className="font-medium">
                      {tx.from === "0x529354de2caacbb8fa5f4a2f24bf586427b8da5e"
                        ? "Sent to"
                        : "Received from"}
                      :{" "}
                      {tx.from === "0x529354de2caacbb8fa5f4a2f24bf586427b8da5e"
                        ? getCompanyNameByWallet(tx.to)
                        : getCompanyNameByWallet(tx.from)}
                    </p>
                    <p className="text-sm text-gray-500">
                      {new Date(parseInt(tx.date) * 1000).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <span
                      className={`font-bold ${
                        tx.from === agentWalletAddress
                          ? "text-red-500"
                          : "text-green-500"
                      }`}
                    >
                      ${tx.tokenAmount}
                    </span>
                    <span className="ml-2 text-sm text-gray-500">
                      {tx.status || "Completed"}
                    </span>
                  </div>
                </li>
              ))
            ) : (
              <li>No transactions found.</li>
            )}
          </ul>
        </div>
      </main>
    </div>
  );
}

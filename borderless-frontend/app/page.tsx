"use client"

import { useState } from "react"
import { FaShip, FaUserCircle, FaExchangeAlt, FaMoneyBillWave, FaUserTie } from 'react-icons/fa'

export default function BorderlessMaritimeFinance() {
  const [balance, setBalance] = useState("10000.00")
  const [amount, setAmount] = useState("")
  const [recipient, setRecipient] = useState("")
  const [transactionType, setTransactionType] = useState("exchange")
  const [transactions, setTransactions] = useState([
    { id: 1, date: "2024-04-10", amount: "5000.00", type: "Received from Ship Charter", status: "Completed" },
    { id: 2, date: "2024-04-09", amount: "3000.00", type: "Paid to Ship Supplier", status: "Completed" },
  ])
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const handleTransaction = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")

    if (parseFloat(amount) <= 0) {
      setError("Amount must be greater than zero")
      return
    }

    try {
      // Simulating an API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Update balance (in a real app, this would come from the API response)
      const newBalance = (parseFloat(balance) - parseFloat(amount)).toFixed(2)
      setBalance(newBalance)

      // Add new transaction to history
      const newTransaction = {
        id: transactions.length + 1,
        date: new Date().toISOString().split('T')[0],
        amount: amount,
        type: `${transactionType === 'exchange' ? 'Exchanged' : transactionType === 'pay' ? 'Paid to' : 'Redeemed'} ${recipient}`,
        status: "Completed"
      }
      setTransactions([newTransaction, ...transactions])

      setSuccess("Transaction completed successfully")
      setAmount("")
      setRecipient("")
    } catch (err) {
      setError("Transaction failed. Please try again.")
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-blue-600 p-4 shadow-md">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <FaShip className="h-8 w-8 text-white" />
            <span className="text-xl font-bold text-white">Borderless Maritime Finance</span>
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
            <h2 className="mb-4 text-xl font-semibold text-gray-800">Account Balance</h2>
            <div className="text-3xl font-bold text-blue-600">${balance} USD</div>
          </div>

          <div className="rounded-lg bg-white p-6 shadow-md">
            <h2 className="mb-4 text-xl font-semibold text-gray-800">Quick Actions</h2>
            <div className="flex justify-around">
              <button onClick={() => setTransactionType("exchange")} className="flex flex-col items-center p-2 hover:bg-gray-100 rounded">
                <FaExchangeAlt className="h-8 w-8 text-blue-500 mb-2" />
                <span>Exchange</span>
              </button>
              <button onClick={() => setTransactionType("pay")} className="flex flex-col items-center p-2 hover:bg-gray-100 rounded">
                <FaMoneyBillWave className="h-8 w-8 text-green-500 mb-2" />
                <span>Pay Supplier</span>
              </button>
              <button onClick={() => setTransactionType("redeem")} className="flex flex-col items-center p-2 hover:bg-gray-100 rounded">
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
              <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
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
              <label htmlFor="recipient" className="block text-sm font-medium text-gray-700">
                {transactionType === "exchange" && "Borderless Account"}
                {transactionType === "pay" && "Ship Supplier"}
                {transactionType === "redeem" && "Your Bank Account"}
              </label>
              <input
                id="recipient"
                type="text"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                placeholder={`Enter ${transactionType === "exchange" ? "Borderless account" : transactionType === "pay" ? "supplier's account" : "your bank account"}`}
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              {transactionType === "exchange" && "Exchange Funds"}
              {transactionType === "pay" && "Pay Supplier"}
              {transactionType === "redeem" && "Redeem Fiat"}
            </button>
          </form>
        </div>

        <div className="mt-8 rounded-lg bg-white p-6 shadow-md">
          <h2 className="mb-4 text-xl font-semibold text-gray-800">Transaction History</h2>
          <ul className="space-y-4">
            {transactions.map((tx) => (
              <li key={tx.id} className="flex items-center justify-between border-b pb-2">
                <div>
                  <p className="font-medium">{tx.type}</p>
                  <p className="text-sm text-gray-500">{tx.date}</p>
                </div>
                <div>
                  <span className={`font-bold ${tx.type.includes('Received') || tx.type.includes('Exchanged') ? 'text-green-500' : 'text-red-500'}`}>
                    ${tx.amount}
                  </span>
                  <span className="ml-2 text-sm text-gray-500">{tx.status}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  )
}
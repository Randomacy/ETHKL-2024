"use client";

import { useState, useEffect } from "react";
import {
  FaShip,
  FaUserCircle,
  FaPlus,
  FaEdit,
  FaTrash,
  FaCoins,
  FaFire,
} from "react-icons/fa";

interface Company {
  id: string;
  name: string;
  type: "agent" | "supplier";
  wallet: string;
}

export default function AdminDashboard() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isMintDialogOpen, setIsMintDialogOpen] = useState(false);
  const [isBurnDialogOpen, setIsBurnDialogOpen] = useState(false);
  const [currentCompany, setCurrentCompany] = useState<Company | null>(null);
  const [newCompany, setNewCompany] = useState<Partial<Company>>({
    type: "agent",
  });
  const [mintAmount, setMintAmount] = useState("");
  const [burnAmount, setBurnAmount] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      const response = await fetch("/api/companies");
      if (!response.ok) throw new Error("Failed to fetch companies");
      const data = await response.json();
      setCompanies(data);
    } catch (error) {
      console.error("Error fetching companies:", error);
      setError("Failed to fetch companies");
    }
  };

  const handleAddCompany = async () => {
    if (newCompany.name && newCompany.type && newCompany.wallet) {
      try {
        const response = await fetch("/api/companies", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newCompany),
        });
        if (!response.ok) throw new Error("Failed to add company");
        await fetchCompanies();
        setNewCompany({ type: "agent" });
        setIsAddDialogOpen(false);
        setSuccess("Company added successfully");
      } catch (error) {
        console.error("Error adding company:", error);
        setError("Failed to add company");
      }
    }
  };

  const handleEditCompany = async () => {
    if (currentCompany) {
      try {
        const response = await fetch("/api/companies", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(currentCompany),
        });
        if (!response.ok) throw new Error("Failed to update company");
        await fetchCompanies();
        setIsEditDialogOpen(false);
        setSuccess("Company updated successfully");
      } catch (error) {
        console.error("Error updating company:", error);
        setError("Failed to update company");
      }
    }
  };

  const handleDeleteCompany = async (id: string) => {
    try {
      const response = await fetch(`/api/companies?id=${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete company");
      await fetchCompanies();
      setSuccess("Company deleted successfully");
    } catch (error) {
      console.error("Error deleting company:", error);
      setError("Failed to delete company");
    }
  };

  const handleMintTokens = async () => {
    if (currentCompany && mintAmount) {
      try {
        const response = await fetch("/api/mint", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            address: currentCompany.wallet,
            amount: mintAmount,
          }),
        });

        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || "Failed to mint tokens");
        }

        setIsMintDialogOpen(false);
        setMintAmount("");
        setSuccess(
          `Successfully minted ${mintAmount} tokens to ${currentCompany.name}. Transaction hash: ${data.txHash}`
        );
      } catch (error: any) {
        console.error("Error minting tokens:", error);
        setError(error.message || "Failed to mint tokens");
      }
    }
  };

  const handleBurnTokens = async () => {
    if (currentCompany && burnAmount) {
      try {
        const response = await fetch("/api/burn", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            address: currentCompany.wallet,
            amount: burnAmount,
          }),
        });
        if (!response.ok) throw new Error("Failed to burn tokens");
        const data = await response.json();
        setIsBurnDialogOpen(false);
        setBurnAmount("");
        setSuccess(
          `Successfully burned ${burnAmount} tokens from ${currentCompany.name}. Transaction hash: ${data.txHash}`
        );
      } catch (error) {
        console.error("Error burning tokens:", error);
        setError("Failed to burn tokens");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-blue-600 p-4 shadow-md">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <FaShip className="h-8 w-8 text-white" />
            <span className="text-xl font-bold text-white">
              Borderless Maritime Finance - Admin
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <FaUserCircle className="h-8 w-8 text-white" />
            <span className="text-white">Admin</span>
          </div>
        </div>
      </nav>

      <main className="container mx-auto mt-8 px-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            Company Management
          </h1>
          <button
            onClick={() => setIsAddDialogOpen(true)}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded inline-flex items-center transition duration-150 ease-in-out"
          >
            <FaPlus className="mr-2" /> Add Company
          </button>
        </div>

        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-4 p-2 bg-green-100 text-green-700 rounded">
            {success}
          </div>
        )}

        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Wallet
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {companies.map((company) => (
                <tr key={company.id}>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">
                      {company.name}
                    </p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap capitalize">
                      {company.type}
                    </p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">
                      {company.wallet}
                    </p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <button
                      onClick={() => {
                        setCurrentCompany(company);
                        setIsEditDialogOpen(true);
                      }}
                      className="text-blue-600 hover:text-blue-900 mr-3"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDeleteCompany(company.id)}
                      className="text-red-600 hover:text-red-900 mr-3"
                    >
                      <FaTrash />
                    </button>
                    <button
                      onClick={() => {
                        setCurrentCompany(company);
                        setIsMintDialogOpen(true);
                      }}
                      className="text-green-600 hover:text-green-900 mr-3"
                    >
                      <FaCoins />
                    </button>
                    <button
                      onClick={() => {
                        setCurrentCompany(company);
                        setIsBurnDialogOpen(true);
                      }}
                      className="text-orange-600 hover:text-orange-900"
                    >
                      <FaFire />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      {isAddDialogOpen && (
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
          id="my-modal"
        >
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Add New Company
              </h3>
              <div className="mt-2 px-7 py-3">
                <input
                  type="text"
                  className="px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1 mb-3"
                  placeholder="Company Name"
                  value={newCompany.name || ""}
                  onChange={(e) =>
                    setNewCompany({ ...newCompany, name: e.target.value })
                  }
                />
                <select
                  className="px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1 mb-3"
                  value={newCompany.type}
                  onChange={(e) =>
                    setNewCompany({
                      ...newCompany,
                      type: e.target.value as "agent" | "supplier",
                    })
                  }
                >
                  <option value="agent">Agent</option>
                  <option value="supplier">Supplier</option>
                </select>
                <input
                  type="text"
                  className="px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1 mb-3"
                  placeholder="Wallet Address"
                  value={newCompany.wallet || ""}
                  onChange={(e) =>
                    setNewCompany({ ...newCompany, wallet: e.target.value })
                  }
                />
              </div>
              <div className="items-center px-4 py-3">
                <button
                  id="ok-btn"
                  className="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  onClick={handleAddCompany}
                >
                  Add Company
                </button>
              </div>
              <div className="items-center px-4 py-3">
                <button
                  id="cancel-btn"
                  className="px-4 py-2 bg-gray-200 text-gray-800 text-base font-medium rounded-md w-full shadow-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                  onClick={() => setIsAddDialogOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {isEditDialogOpen && currentCompany && (
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
          id="my-modal"
        >
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Edit Company
              </h3>
              <div className="mt-2 px-7 py-3">
                <input
                  type="text"
                  className="px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1 mb-3"
                  placeholder="Company Name"
                  value={currentCompany.name}
                  onChange={(e) =>
                    setCurrentCompany({
                      ...currentCompany,
                      name: e.target.value,
                    })
                  }
                />
                <select
                  className="px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1 mb-3"
                  value={currentCompany.type}
                  onChange={(e) =>
                    setCurrentCompany({
                      ...currentCompany,
                      type: e.target.value as "agent" | "supplier",
                    })
                  }
                >
                  <option value="agent">Agent</option>
                  <option value="supplier">Supplier</option>
                </select>
                <input
                  type="text"
                  className="px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1 mb-3"
                  placeholder="Wallet Address"
                  value={currentCompany.wallet}
                  onChange={(e) =>
                    setCurrentCompany({
                      ...currentCompany,
                      wallet: e.target.value,
                    })
                  }
                />
              </div>
              <div className="items-center px-4 py-3">
                <button
                  id="ok-btn"
                  className="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  onClick={handleEditCompany}
                >
                  Save Changes
                </button>
              </div>
              <div className="items-center px-4 py-3">
                <button
                  id="cancel-btn"
                  className="px-4 py-2 bg-gray-200 text-gray-800 text-base font-medium rounded-md w-full shadow-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                  onClick={() => setIsEditDialogOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {isMintDialogOpen && currentCompany && (
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
          id="my-modal"
        >
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Mint Tokens
              </h3>
              <div className="mt-2 px-7 py-3">
                <p className="text-sm text-gray-500 mb-3">
                  Minting tokens for {currentCompany.name}
                </p>
                <input
                  type="number"
                  className="px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1 mb-3"
                  placeholder="Amount of tokens to mint"
                  value={mintAmount}
                  onChange={(e) => setMintAmount(e.target.value)}
                />
              </div>
              <div className="items-center px-4 py-3">
                <button
                  id="ok-btn"
                  className="px-4 py-2 bg-green-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-300"
                  onClick={handleMintTokens}
                >
                  Mint Tokens
                </button>
              </div>
              <div className="items-center px-4 py-3">
                <button
                  id="cancel-btn"
                  className="px-4 py-2 bg-gray-200 text-gray-800 text-base font-medium rounded-md w-full shadow-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                  onClick={() => setIsMintDialogOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {isBurnDialogOpen && currentCompany && (
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
          id="my-modal"
        >
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Burn Tokens
              </h3>
              <div className="mt-2 px-7 py-3">
                <p className="text-sm text-gray-500 mb-3">
                  Burning tokens from {currentCompany.name}
                </p>
                <input
                  type="number"
                  className="px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1 mb-3"
                  placeholder="Amount of tokens to burn"
                  value={burnAmount}
                  onChange={(e) => setBurnAmount(e.target.value)}
                />
              </div>
              <div className="items-center px-4 py-3">
                <button
                  id="ok-btn"
                  className="px-4 py-2 bg-orange-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-300"
                  onClick={handleBurnTokens}
                >
                  Burn Tokens
                </button>
              </div>
              <div className="items-center px-4 py-3">
                <button
                  id="cancel-btn"
                  className="px-4 py-2 bg-gray-200 text-gray-800 text-base font-medium rounded-md w-full shadow-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                  onClick={() => setIsBurnDialogOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

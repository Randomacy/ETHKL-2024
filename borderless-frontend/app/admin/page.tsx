"use client";

import { useState, useEffect } from "react";
import { FaShip, FaUserCircle, FaPlus, FaEdit, FaTrash } from "react-icons/fa";

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
  const [currentCompany, setCurrentCompany] = useState<Company | null>(null);
  const [newCompany, setNewCompany] = useState<Partial<Company>>({
    type: "agent",
  });

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
      } catch (error) {
        console.error("Error adding company:", error);
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
      } catch (error) {
        console.error("Error updating company:", error);
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
    } catch (error) {
      console.error("Error deleting company:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
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
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded inline-flex items-center"
          >
            <FaPlus className="mr-2" /> Add Company
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Name</th>
                <th className="py-3 px-6 text-left">Type</th>
                <th className="py-3 px-6 text-left">Wallet</th>
                <th className="py-3 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {companies.map((company) => (
                <tr
                  key={company.id}
                  className="border-b border-gray-200 hover:bg-gray-100"
                >
                  <td className="py-3 px-6 text-left whitespace-nowrap">
                    {company.name}
                  </td>
                  <td className="py-3 px-6 text-left">{company.type}</td>
                  <td className="py-3 px-6 text-left">{company.wallet}</td>
                  <td className="py-3 px-6 text-center">
                    <div className="flex item-center justify-center">
                      <button
                        onClick={() => {
                          setCurrentCompany(company);
                          setIsEditDialogOpen(true);
                        }}
                        className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDeleteCompany(company.id)}
                        className="w-4 mr-2 transform hover:text-red-500 hover:scale-110"
                      >
                        <FaTrash />
                      </button>
                    </div>
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
    </div>
  );
}

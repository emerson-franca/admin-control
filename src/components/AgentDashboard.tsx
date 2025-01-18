import React, { useState } from "react";
import { useAgentContext } from "../context/AgentContext";
import AgentList from "./AgentList";
import AgentForm from "./AgentForm";
import SearchBar from "./SearchBar";

const AgentDashboard: React.FC = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingAgent, setEditingAgent] = useState<
    | {
        id: string;
        name: string;
        email: string;
        status: "Active" | "Inactive";
        lastSeen: string;
      }
    | undefined
  >(undefined);
  const [searchQuery, setSearchQuery] = useState("");
  const { state } = useAgentContext();

  const handleAddAgent = () => {
    setEditingAgent(undefined);
    setIsFormOpen(true);
  };

  const handleEditAgent = (agent: {
    id: string;
    name: string;
    email: string;
    status: "Active" | "Inactive";
    lastSeen: string;
  }) => {
    setEditingAgent(agent);
    setIsFormOpen(true);
  };

  const filteredAgents = state.agents.filter(
    (agent) =>
      agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Agent Management
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Manage your network of agents efficiently
          </p>
        </div>
        
        <div className="mt-12 mb-6">
          <SearchBar onSearch={setSearchQuery} />
          <div className="flex justify-end max-w-2xl mx-auto mt-4">
            <button
              onClick={handleAddAgent}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <svg
                className="-ml-1 mr-2 h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
              Add Agent
            </button>
          </div>
        </div>

        <div className="mt-8">
          <AgentList agents={filteredAgents} onEdit={handleEditAgent} />
        </div>

        {isFormOpen && (
          <div className="fixed inset-0 overflow-y-auto z-50">
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div
                className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                aria-hidden="true"
                onClick={() => setIsFormOpen(false)}
              ></div>

              <span
                className="hidden sm:inline-block sm:align-middle sm:h-screen"
                aria-hidden="true"
              >
                &#8203;
              </span>

              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <AgentForm agent={editingAgent} onClose={() => setIsFormOpen(false)} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AgentDashboard;

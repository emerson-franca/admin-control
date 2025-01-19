import React, { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AgentContext } from "../context/AgentContext";
import { formatDistanceToNow } from "date-fns";

const AgentDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const context = useContext(AgentContext);

  const agent = context?.state.agents.find((a) => a.id === id);

  if (!agent) {
    return (
      <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
          <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
            <div className="max-w-md mx-auto">
              <div className="divide-y divide-gray-200">
                <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                  <p>Agent not found.</p>
                  <button
                    onClick={() => navigate(-1)}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    Go Back
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const lastSeenFormatted = formatDistanceToNow(new Date(agent.lastSeen), {
    addSuffix: true,
  });

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <div className="flex justify-between items-center mb-6">
                  <h1 className="text-2xl font-bold text-gray-900">
                    Agent Details
                  </h1>
                  <span
                    className={`px-2 py-1 rounded-full text-sm ${
                      agent.status === "Active"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {agent.status}
                  </span>
                </div>

                <div className="space-y-4">
                  <div>
                    <h2 className="text-gray-500">Basic Information</h2>
                    <div className="mt-2 grid grid-cols-2 gap-4">
                      <div>
                        <p className="font-semibold">Name</p>
                        <p>{agent.name}</p>
                      </div>
                      <div>
                        <p className="font-semibold">Email</p>
                        <p>{agent.email}</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h2 className="text-gray-500">System Information</h2>
                    <div className="mt-2 space-y-2">
                      <div>
                        <p className="font-semibold">Operating System</p>
                        <p>Windows 10 Pro</p>
                      </div>
                      <div>
                        <p className="font-semibold">CPU Usage</p>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div
                            className="bg-blue-600 h-2.5 rounded-full"
                            style={{ width: "45%" }}
                          ></div>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">45%</p>
                      </div>
                      <div>
                        <p className="font-semibold">Memory Usage</p>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div
                            className="bg-green-600 h-2.5 rounded-full"
                            style={{ width: "60%" }}
                          ></div>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">
                          8GB / 16GB (60%)
                        </p>
                      </div>
                      <div>
                        <p className="font-semibold">Disk Usage</p>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div
                            className="bg-yellow-600 h-2.5 rounded-full"
                            style={{ width: "75%" }}
                          ></div>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">
                          750GB / 1TB (75%)
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h2 className="text-gray-500">Network Information</h2>
                    <div className="mt-2 space-y-2">
                      <div>
                        <p className="font-semibold">IP Address</p>
                        <p>192.168.1.100</p>
                      </div>
                      <div>
                        <p className="font-semibold">Last Seen</p>
                        <p>{lastSeenFormatted}</p>
                      </div>
                      <div>
                        <p className="font-semibold">Network Speed</p>
                        <p>Upload: 10 Mbps / Download: 50 Mbps</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h2 className="text-gray-500">Security Status</h2>
                    <div className="mt-2 space-y-2">
                      <div>
                        <p className="font-semibold">Antivirus Status</p>
                        <p className="text-green-600">Protected</p>
                      </div>
                      <div>
                        <p className="font-semibold">Firewall Status</p>
                        <p className="text-green-600">Active</p>
                      </div>
                      <div>
                        <p className="font-semibold">Last Security Scan</p>
                        <p>2 hours ago</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-6">
                  <button
                    onClick={() => navigate(-1)}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    Back to Dashboard
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentDetails;

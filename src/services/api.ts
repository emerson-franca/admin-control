import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001',
});

export interface Agent {
  id: string;
  name: string;
  email: string;
  status: "Active" | "Inactive";
  lastSeen: string;
}

export const agentApi = {
  getAll: async (): Promise<Agent[]> => {
    const response = await api.get<Agent[]>('/agents');
    return response.data;
  },

  create: async (agent: Omit<Agent, 'id'>): Promise<Agent> => {
    const response = await api.post<Agent>('/agents', agent);
    return response.data;
  },

  update: async (agent: Agent): Promise<Agent> => {
    const response = await api.put<Agent>(`/agents/${agent.id}`, agent);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/agents/${id}`);
  },
};

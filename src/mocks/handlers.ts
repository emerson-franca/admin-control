import { http, HttpResponse } from "msw";
import { Agent } from "../services/api";

const mockAgents: Agent[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    status: "Active",
    lastSeen: "2025-01-18T12:25:58-03:00",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    status: "Inactive",
    lastSeen: "2025-01-18T12:25:58-03:00",
  },
];

export const handlers = [
  http.get("http://localhost:3001/agents", () => {
    return HttpResponse.json(mockAgents);
  }),

  http.post("http://localhost:3001/agents", async ({ request }) => {
    const newAgent = await request.json();
    return HttpResponse.json(newAgent, { status: 201 });
  }),

  http.put("http://localhost:3001/agents/:id", async ({ request }) => {
    const updatedAgent = await request.json();
    return HttpResponse.json(updatedAgent);
  }),

  http.delete("http://localhost:3001/agents/:id", () => {
    return new HttpResponse(null, { status: 200 });
  }),
];

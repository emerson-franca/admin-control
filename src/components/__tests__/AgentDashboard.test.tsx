import { render, screen, fireEvent } from "@testing-library/react";
import { AgentContext } from "../../context/AgentContext";
import AgentDashboard from "../AgentDashboard";
import { Agent } from "../../services/api";
import React from "react";

const mockAgents: Agent[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    status: "Active",
    lastSeen: "2025-01-19T00:42:35-03:00",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    status: "Inactive",
    lastSeen: "2025-01-19T00:42:35-03:00",
  },
];

const renderWithProvider = (component: React.ReactElement) => {
  const mockContextValue = {
    state: {
      agents: mockAgents,
      loading: false,
      error: null,
      searchQuery: "",
      selectedAgent: null,
      showForm: false,
    },
    dispatch: jest.fn(),
  };

  return render(
    <AgentContext.Provider value={mockContextValue}>
      {component}
    </AgentContext.Provider>
  );
};

describe("AgentDashboard", () => {
  test("renders correctly with agents", () => {
    renderWithProvider(<AgentDashboard />);
    expect(screen.getByText("Agent Management")).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/search/i)).toBeInTheDocument();
    expect(screen.getByText("Add Agent")).toBeInTheDocument();
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("jane@example.com")).toBeInTheDocument();
  });

  test("opens the agent form when 'Add Agent' is clicked", () => {
    const { rerender } = renderWithProvider(<AgentDashboard />);

    fireEvent.click(screen.getByText("Add Agent"));

    const updatedContextValue = {
      state: {
        agents: mockAgents,
        loading: false,
        error: null,
        searchQuery: "",
        selectedAgent: null,
        showForm: true,
      },
      dispatch: jest.fn(),
    };

    rerender(
      <AgentContext.Provider value={updatedContextValue}>
        <AgentDashboard />
      </AgentContext.Provider>
    );

    expect(screen.getByLabelText("Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
  });

  test("filters agents based on search query", async () => {
    const { rerender } = renderWithProvider(<AgentDashboard />);
    const searchInput = screen.getByPlaceholderText(/search/i);

    fireEvent.change(searchInput, { target: { value: "John" } });

    const updatedContextValue = {
      state: {
        agents: mockAgents.filter((agent) => agent.name.includes("John")),
        loading: false,
        error: null,
        searchQuery: "John",
        selectedAgent: null,
        showForm: false,
      },
      dispatch: jest.fn(),
    };

    rerender(
      <AgentContext.Provider value={updatedContextValue}>
        <AgentDashboard />
      </AgentContext.Provider>
    );

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.queryByText("Jane Smith")).not.toBeInTheDocument();
  });

  test("opens edit form when clicking edit button", () => {
    const { rerender } = renderWithProvider(<AgentDashboard />);
    const editButtons = screen.getAllByText("Edit");
    fireEvent.click(editButtons[0]);

    const updatedContextValue = {
      state: {
        agents: mockAgents,
        loading: false,
        error: null,
        searchQuery: "",
        selectedAgent: mockAgents[0],
        showForm: true,
      },
      dispatch: jest.fn(),
    };

    rerender(
      <AgentContext.Provider value={updatedContextValue}>
        <AgentDashboard />
      </AgentContext.Provider>
    );

    expect(screen.getByDisplayValue("John Doe")).toBeInTheDocument();
    expect(screen.getByDisplayValue("john@example.com")).toBeInTheDocument();
  });

  test("closes form modal when clicking cancel", () => {
    const { rerender } = renderWithProvider(<AgentDashboard />);

    fireEvent.click(screen.getByText("Add Agent"));

    let updatedContextValue = {
      state: {
        agents: mockAgents,
        loading: false,
        error: null,
        searchQuery: "",
        selectedAgent: null,
        showForm: true,
      },
      dispatch: jest.fn(),
    };

    rerender(
      <AgentContext.Provider value={updatedContextValue}>
        <AgentDashboard />
      </AgentContext.Provider>
    );

    expect(screen.getByLabelText("Name")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Cancel"));

    updatedContextValue = {
      state: {
        ...updatedContextValue.state,
        showForm: false,
      },
      dispatch: jest.fn(),
    };

    rerender(
      <AgentContext.Provider value={updatedContextValue}>
        <AgentDashboard />
      </AgentContext.Provider>
    );

    expect(screen.queryByLabelText("Name")).not.toBeInTheDocument();
  });
});

import { render, screen, fireEvent } from "@testing-library/react";
import { AgentProvider } from "../../context/AgentContext";
import AgentList from "../AgentList";
import { Agent } from "../../services/api";

const mockOnEdit = jest.fn();

const mockAgents: Agent[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    status: "Active",
    lastSeen: "2025-01-18T23:55:23-03:00",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    status: "Inactive",
    lastSeen: "2025-01-18T23:55:23-03:00",
  },
];

const renderWithProvider = (component: React.ReactElement) => {
  return render(<AgentProvider>{component}</AgentProvider>);
};

describe("AgentList", () => {
  beforeEach(() => {
    mockOnEdit.mockClear();
  });

  it("renders all agents", () => {
    renderWithProvider(<AgentList agents={mockAgents} onEdit={mockOnEdit} />);
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("jane@example.com")).toBeInTheDocument();
    expect(screen.getAllByText("Active")).toHaveLength(1);
    expect(screen.getAllByText("Inactive")).toHaveLength(1);
  });

  it("calls onEdit when edit button is clicked", () => {
    renderWithProvider(<AgentList agents={mockAgents} onEdit={mockOnEdit} />);
    const editButtons = screen.getAllByText("Edit");
    fireEvent.click(editButtons[0]);
    expect(mockOnEdit).toHaveBeenCalledWith(mockAgents[0]);
  });

  it("renders correct status badges", () => {
    renderWithProvider(<AgentList agents={mockAgents} onEdit={mockOnEdit} />);
    const activeStatus = screen.getByText("Active");
    const inactiveStatus = screen.getByText("Inactive");
    expect(activeStatus).toHaveClass("bg-green-100", "text-green-800");
    expect(inactiveStatus).toHaveClass("bg-red-100", "text-red-800");
  });

  it("renders empty state when no agents", () => {
    renderWithProvider(<AgentList agents={[]} onEdit={mockOnEdit} />);
    expect(screen.getByText(/no agents found/i)).toBeInTheDocument();
  });

  it("deletes an agent when delete button is clicked", async () => {
    const { rerender } = renderWithProvider(
      <AgentList agents={mockAgents} onEdit={mockOnEdit} />
    );

    const deleteButtons = screen.getAllByText("Delete");
    fireEvent.click(deleteButtons[0]);

    const remainingAgents = mockAgents.filter((agent) => agent.id !== "1");
    rerender(
      <AgentProvider>
        <AgentList agents={remainingAgents} onEdit={mockOnEdit} />
      </AgentProvider>
    );

    expect(screen.queryByText("John Doe")).not.toBeInTheDocument();
    expect(screen.getByText("Jane Smith")).toBeInTheDocument();
  });
});

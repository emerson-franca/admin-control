import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { AgentContext } from "../../context/AgentContext";
import AgentDetails from "../AgentDetails";
import { Agent } from "../../services/api";

const mockAgent: Agent = {
  id: "1",
  name: "John Doe",
  email: "john@example.com",
  status: "Active",
  lastSeen: "2025-01-19T00:49:02-03:00",
};

const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

const renderWithContext = (agent: Agent | undefined = mockAgent) => {
  const mockContextValue = {
    state: {
      agents: agent ? [agent] : [],
      loading: false,
      error: null,
      searchQuery: "",
      selectedAgent: null,
      showForm: false,
    },
    dispatch: jest.fn(),
  };

  return render(
    <MemoryRouter initialEntries={[`/agent/${agent?.id}`]}>
      <AgentContext.Provider value={mockContextValue}>
        <Routes>
          <Route path="/agent/:id" element={<AgentDetails />} />
        </Routes>
      </AgentContext.Provider>
    </MemoryRouter>
  );
};

describe("AgentDetails", () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  test("renders agent details correctly", () => {
    renderWithContext();

    expect(screen.getByText("Agent Details")).toBeInTheDocument();
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("john@example.com")).toBeInTheDocument();
    expect(screen.getByText("Active")).toBeInTheDocument();
  });

  test("displays system information", () => {
    renderWithContext();

    expect(screen.getByText("System Information")).toBeInTheDocument();
    expect(screen.getByText("Operating System")).toBeInTheDocument();
    expect(screen.getByText("Windows 10 Pro")).toBeInTheDocument();
    expect(screen.getByText("CPU Usage")).toBeInTheDocument();
    expect(screen.getByText("Memory Usage")).toBeInTheDocument();
    expect(screen.getByText("Disk Usage")).toBeInTheDocument();
  });

  test("displays network information", () => {
    renderWithContext();

    expect(screen.getByText("Network Information")).toBeInTheDocument();
    expect(screen.getByText("IP Address")).toBeInTheDocument();
    expect(screen.getByText("192.168.1.100")).toBeInTheDocument();
    expect(screen.getByText("Network Speed")).toBeInTheDocument();
  });

  test("displays security information", () => {
    renderWithContext();

    expect(screen.getByText("Security Status")).toBeInTheDocument();
    expect(screen.getByText("Antivirus Status")).toBeInTheDocument();
    expect(screen.getByText("Protected")).toBeInTheDocument();
    expect(screen.getByText("Firewall Status")).toBeInTheDocument();
    expect(screen.getByText("Active")).toBeInTheDocument();
  });

  test("navigates back when clicking back button", () => {
    renderWithContext();

    const backButton = screen.getByText("Back to Dashboard");
    fireEvent.click(backButton);

    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });

  test("displays not found message for non-existent agent", () => {
    renderWithContext(undefined);

    expect(screen.getByText("Agent not found.")).toBeInTheDocument();
    
    const backButton = screen.getByText("Go Back");
    fireEvent.click(backButton);

    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });
});

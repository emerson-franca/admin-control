import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { AgentProvider } from "../../context/AgentContext";
import AgentForm from "../AgentForm";

const mockOnClose = jest.fn();

const renderWithProvider = (component: React.ReactElement) => {
  return render(<AgentProvider>{component}</AgentProvider>);
};

describe("AgentForm", () => {
  beforeEach(() => {
    mockOnClose.mockClear();
  });
  it("renders add form correctly", () => {
    renderWithProvider(<AgentForm onClose={mockOnClose} />);
    expect(screen.getByLabelText("Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Status")).toBeInTheDocument();
  });
  it("renders edit form with agent data", () => {
    const mockAgent = {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      status: "Active" as const,
      lastSeen: "2025-01-18T12:34:06-03:00",
    };
    renderWithProvider(<AgentForm agent={mockAgent} onClose={mockOnClose} />);
    expect(screen.getByText("Edit Agent")).toBeInTheDocument();
    expect(screen.getByDisplayValue("John Doe")).toBeInTheDocument();
    expect(screen.getByDisplayValue("john@example.com")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Active")).toBeInTheDocument();
  });
  it("validates required fields", async () => {
    renderWithProvider(<AgentForm onClose={mockOnClose} />);
    const submitButton = screen.getByText("Add Agent", {
      selector: 'button[type="submit"]',
    });
    fireEvent.click(submitButton);
    expect(screen.getByLabelText("Name")).toBeInvalid();
    expect(screen.getByLabelText("Email")).toBeInvalid();
  });
  it("submits form with valid data", async () => {
    renderWithProvider(<AgentForm onClose={mockOnClose} />);
    fireEvent.change(screen.getByLabelText("Name"), {
      target: { value: "Test Agent" },
    });
    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Status"), {
      target: { value: "Active" },
    });
    fireEvent.click(
      screen.getByText("Add Agent", { selector: 'button[type="submit"]' })
    );
    await waitFor(() => {
      expect(mockOnClose).toHaveBeenCalled();
    });
  });
});

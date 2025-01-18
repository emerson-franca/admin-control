import {
  createContext,
  useContext,
  useReducer,
  ReactNode,
  useEffect,
} from "react";

interface Agent {
  id: string;
  name: string;
  email: string;
  status: "Active" | "Inactive";
  lastSeen: string;
}

interface AgentState {
  agents: Agent[];
}

interface AddAgentAction {
  type: "ADD_AGENT";
  payload: Agent;
}

interface UpdateAgentAction {
  type: "UPDATE_AGENT";
  payload: Agent;
}

interface DeleteAgentAction {
  type: "DELETE_AGENT";
  payload: string;
}

type AgentAction = AddAgentAction | UpdateAgentAction | DeleteAgentAction;

const initialState: AgentState = {
  agents: JSON.parse(localStorage.getItem("agents") || "[]"),
};

function agentReducer(state: AgentState, action: AgentAction): AgentState {
  switch (action.type) {
    case "ADD_AGENT":
      return { ...state, agents: [...state.agents, action.payload] };
    case "UPDATE_AGENT":
      return {
        ...state,
        agents: state.agents.map((agent) =>
          agent.id === action.payload.id ? action.payload : agent
        ),
      };
    case "DELETE_AGENT":
      return {
        ...state,
        agents: state.agents.filter((agent) => agent.id !== action.payload),
      };
    default:
      return state;
  }
}

const AgentContext = createContext<
  { state: AgentState; dispatch: React.Dispatch<AgentAction> } | undefined
>(undefined);

export const AgentProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(agentReducer, initialState);

  useEffect(() => {
    localStorage.setItem("agents", JSON.stringify(state.agents));
  }, [state.agents]);

  return (
    <AgentContext.Provider value={{ state, dispatch }}>
      {children}
    </AgentContext.Provider>
  );
};

export const useAgentContext = () => {
  const context = useContext(AgentContext);
  if (!context) {
    throw new Error("useAgentContext must be used within an AgentProvider");
  }
  return context;
};

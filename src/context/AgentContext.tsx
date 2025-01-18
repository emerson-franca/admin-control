import {
  createContext,
  useContext,
  useReducer,
  ReactNode,
  useEffect,
} from "react";
import { Agent, agentApi } from "../services/api";

interface AgentState {
  agents: Agent[];
  loading: boolean;
  error: string | null;
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

interface SetAgentsAction {
  type: "SET_AGENTS";
  payload: Agent[];
}

interface SetLoadingAction {
  type: "SET_LOADING";
  payload: boolean;
}

interface SetErrorAction {
  type: "SET_ERROR";
  payload: string;
}

type AgentAction =
  | AddAgentAction
  | UpdateAgentAction
  | DeleteAgentAction
  | SetAgentsAction
  | SetLoadingAction
  | SetErrorAction;

const initialState: AgentState = {
  agents: [],
  loading: false,
  error: null,
};

function agentReducer(state: AgentState, action: AgentAction): AgentState {
  switch (action.type) {
    case "SET_AGENTS":
      return { ...state, agents: action.payload, loading: false, error: null };
    case "ADD_AGENT":
      return {
        ...state,
        agents: [...state.agents, action.payload],
        loading: false,
        error: null,
      };
    case "UPDATE_AGENT":
      return {
        ...state,
        agents: state.agents.map((agent) =>
          agent.id === action.payload.id ? action.payload : agent
        ),
        loading: false,
        error: null,
      };
    case "DELETE_AGENT":
      return {
        ...state,
        agents: state.agents.filter((agent) => agent.id !== action.payload),
        loading: false,
        error: null,
      };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload, loading: false };
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
    const fetchAgents = async () => {
      dispatch({ type: "SET_LOADING", payload: true });
      try {
        const agents = await agentApi.getAll();
        dispatch({ type: "SET_AGENTS", payload: agents });
      } catch (error) {
        dispatch({
          type: "SET_ERROR",
          payload: "Failed to fetch agents. Please try again later.",
        });
      }
    };

    fetchAgents();
  }, []);

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

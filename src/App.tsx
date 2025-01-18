import { AgentProvider } from "./context/AgentContext";
import AgentDashboard from "./components/AgentDashboard";

const App = () => {
  return (
    <AgentProvider>
      <div className="min-h-screen bg-gray-50">
        <AgentDashboard />
      </div>
    </AgentProvider>
  );
};

export default App;

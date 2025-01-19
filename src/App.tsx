import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AgentDashboard from "./components/AgentDashboard";
import AgentDetails from "./components/AgentDetails";
import { AgentProvider } from "./context/AgentContext";

function App() {
  return (
    <Router>
      <AgentProvider>
        <Routes>
          <Route path="/" element={<AgentDashboard />} />
          <Route path="/agent/:id" element={<AgentDetails />} />
        </Routes>
      </AgentProvider>
    </Router>
  );
}

export default App;

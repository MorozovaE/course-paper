import "./App.scss";
import React from "react";
import { Routes, Route } from "react-router-dom";

import { Tasks } from "./pages/Tasks";
import { Goals } from "./pages/Goals";
import { Rewards } from "./pages/Rewards";
import { Dashboard } from "./pages/Dashboard";
import { Aside } from "./components/Aside/Aside";

function App() {
  return (
    <div className="App">
      <Aside />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/goals" element={<Goals />} />
        <Route path="/rewards" element={<Rewards />} />
      </Routes>
    </div>
  );
}

export default App;

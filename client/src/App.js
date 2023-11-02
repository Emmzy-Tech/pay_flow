import React from "react";
// import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Dasboard from "./Pages/Dashboard";
import { DashboardContextProvider } from "./Context/DashboardContext";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <DashboardContextProvider>
                <Dasboard />
              </DashboardContextProvider>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

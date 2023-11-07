import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Dasboard from "./Pages/Dashboard";
import Loginauth from "./Pages/Loginauth"
import Set2fa from "./Pages/Set2fa"
import Password from "./Pages/Password";
import Userdetails from "./Pages/Userdetails"
import { DashboardContextProvider } from "./Context/DashboardContext";
import "./App.css";



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
          <Route path="/password" element={<Password />} />
          <Route path="/loginauth" element={<Loginauth/>} />
          <Route path="/twofactorauth" element={<Set2fa/> }/>
          <Route path="/info" element={<Userdetails/>} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;
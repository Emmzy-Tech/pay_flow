<<<<<<< Updated upstream
import React from "react";
// import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Dasboard from "./Pages/Dashboard";
import { DashboardContextProvider } from "./Context/DashboardContext";
=======
import React from 'react';
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './Components/SignUp';
import Password from './Components/Password';
import Login from './Components/Login';
import Loginauth from './Components/Loginauth';
import Set2fa from './Components/Set2fa';

>>>>>>> Stashed changes

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
        </Routes>
      </div>
    </Router>
  );
}

export default App;
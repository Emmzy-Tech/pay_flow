import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Dasboard from "./Pages/Dashboard";
import Loginauth from "./Pages/Loginauth"
import Set2fa from "./Pages/Set2fa"
import Password from "./Pages/Password";
import Verifyuser from "./Pages/Verifyuser";
import Userdetails from "./Pages/Userdetails";  
import OtpInput from "./Pages/OtpInput"
import { DashboardContextProvider } from "./Context/DashboardContext";
import "./App.css";
import Home from "./Pages/Home";



function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/register/password" element={<Password />} />
          <Route path="/register/twofactorauth" element={<Set2fa/> }/>
          <Route path="/register/otp" element={<OtpInput isSignup={true}/>} />
          <Route path="/register/verified" element={<Verifyuser />} />
          <Route path="/register/info" element={<Userdetails/>} /> 
          <Route path="/login" element={<Login />} />
          <Route path="/login/auth" element={<Loginauth/>} />
          <Route path="/login/otp" element={<OtpInput isSignup={false}/>} />
          <Route
            path="/dashboard/*"
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
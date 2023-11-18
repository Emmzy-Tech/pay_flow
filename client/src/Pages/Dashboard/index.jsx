import React,{useState} from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "../../theme";
import { Layout } from 'antd';
import DashboardHome from '../../Components/DashboardContent/Home/DashboardHome';
import ASidebar from '../../Components/Aside/Aside';
import Topbar from '../../Components/TopBar/TopBar';
import ErrorBoundary from '../../errorb';
import Employees from '../../Components/DashboardContent/Employee';
import AddEmployee from '../../Components/DashboardContent/Employee/AddEmployee';

const Dasboard = () => {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  return (
    <ErrorBoundary>
    <ColorModeContext.Provider value={colorMode}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
        
      <div className="flex w-full h-[100vh]">
        <ASidebar isSidebar={isSidebar} />
        <main className="content w-full h-[100vh] overflow-y-auto">
          <Topbar setIsSidebar={setIsSidebar} />
          <Routes>
          <Route path="/" element={<DashboardHome />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/add-employee" element={<AddEmployee />} />
          
        </Routes>
        </main>
      </div>
    </ThemeProvider>
  </ColorModeContext.Provider>
  
  </ErrorBoundary>
  )
}

export default Dasboard;

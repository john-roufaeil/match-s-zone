import SignUp from "./SignUp"
import LogIn from "./LogIn"
import AdminDashboard from "./components/Dashboard/AdminDashboard"
import FanDashboard from "./components/Dashboard/FanDashboard"
import ManagerDashboard from "./components/Dashboard/ManagerDashboard"
import StadiumDashbaord from "./components/Dashboard/StadiumDashboard"
import ClubDashboard from "./components/Dashboard/ClubDashboard"
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";

function App() {
  const SQLConfig = {
    user: 'sa',
    password: 'pw',
    server: 'localhostsqlexpress', 
    database: 'match-s-zone-database' 
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LogIn />} exact />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />        
        <Route path="/fan-dashboard" element={<FanDashboard />} />        
        <Route path="/manager-dashboard" element={<ManagerDashboard />} />        
        <Route path="/stadium-manager-dashboard" element={<StadiumDashbaord />} />        
        <Route path="/club-representative-dashboard" element={<ClubDashboard />} />        
      </Routes>
    </BrowserRouter>
  );
};

export default App;

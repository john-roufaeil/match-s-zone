import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { ThemeProvider } from 'react-hook-theme';
import { useState } from "react"
import SignUp from "./SignUp"
import LogIn from "./LogIn"
import AdminDashboard from "./components/Dashboard/AdminDashboard"
import FanDashboard from "./components/Dashboard/FanDashboard"
import ManagerDashboard from "./components/Dashboard/ManagerDashboard"
import StadiumDashbaord from "./components/Dashboard/StadiumDashboard"
import ClubDashboard from "./components/Dashboard/ClubDashboard"
import { UserContext, BlockedUser } from "./Contexts"

function App() {
  const [loggedInUser, setLoggedInUser] = useState("");
  const [showBlocked, setShowBlocked] = useState(false);

  return (
      <ThemeProvider options={{ theme: 'dark', save: true}}> 
        <UserContext.Provider value={{loggedInUser, setLoggedInUser}}>
        <BlockedUser.Provider value={{showBlocked, setShowBlocked}}>
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
        </BlockedUser.Provider>
      </UserContext.Provider>
    </ThemeProvider>
  );
};

export default App;

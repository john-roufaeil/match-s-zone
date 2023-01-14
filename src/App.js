import { useState } from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { ThemeProvider } from 'react-hook-theme';
import { UserContext, BlockedUser } from "./Context"

import Login from "./pages/Login"
import Signup from "./pages/Signup"
import NavBar from "./components/molecules/NavBar";


function App() {
  const [loggedInUser, setLoggedInUser] = useState("");
  const [showBlocked, setShowBlocked] = useState(false);

  return (
      <ThemeProvider options={{ theme: 'dark', save: true}}> 
        <UserContext.Provider value={{loggedInUser, setLoggedInUser}}>
          <BlockedUser.Provider value={{showBlocked, setShowBlocked}}>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Login />} exact />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                {/* <Route path="/admin-dashboard" element={<AdminDashboard />} />        
                <Route path="/fan-dashboard" element={<FanDashboard />} />        
                <Route path="/manager-dashboard" element={<ManagerDashboard />} />        
                <Route path="/stadium-manager-dashboard" element={<StadiumDashbaord />} />        
                <Route path="/club-representative-dashboard" element={<ClubDashboard />} />         */}
              </Routes>
            </BrowserRouter>
          </BlockedUser.Provider>
      </UserContext.Provider>
    </ThemeProvider>
  );
};

export default App;

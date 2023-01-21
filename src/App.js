import { useState } from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { ThemeProvider } from 'react-hook-theme';
import { UserContext, BlockedUser } from "./Context"

import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Admin from "./pages/Admin"
import Fan from "./pages/Fan"
import Manager from "./pages/Manager"
import ClubRepresentative from "./pages/ClubRepresentative"
import StadiumManager from "./pages/StadiumManager"

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
                <Route path="/admin-dashboard" element={<Admin />} />        
                <Route path="/fan-dashboard" element={<Fan />} />        
                <Route path="/manager-dashboard" element={<Manager />} />        
                <Route path="/stadium-manager-dashboard" element={<StadiumManager />} />        
                <Route path="/club-representative-dashboard" element={<ClubRepresentative />} />        
              </Routes>
            </BrowserRouter>
          </BlockedUser.Provider>
      </UserContext.Provider>
    </ThemeProvider>
  );
};

export default App;

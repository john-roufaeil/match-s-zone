import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { ThemeProvider } from 'react-hook-theme';

import Login from "./pages/Login"
import Signup from "./pages/Signup"
import NavBar from "./components/molecules/NavBar";


function App() {
  const barComponents = {left: "info", right: "signup"};
  return (
      <ThemeProvider options={{ theme: 'dark', save: true}}> 
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Login />} exact />    
              <Route path="/login" element={<Login />} exact />    
              <Route path="/signup" element={<Signup />} exact />    
            </Routes>
        </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;

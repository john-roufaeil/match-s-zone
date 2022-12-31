import SignUp from "./SignUp"
import LogIn from "./LogIn"
import AdminDashboard from "./components/Dashboard/AdminDashboard"
import FanDashboard from "./components/Dashboard/FanDashboard"
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LogIn />} exact />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />        
        <Route path="/fan-dashboard" element={<FanDashboard />} />        
      </Routes>
    </BrowserRouter>
  );
};

export default App;

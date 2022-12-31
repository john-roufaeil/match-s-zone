import SignUp from "./SignUp"
import LogIn from "./LogIn"
import Dashboard from "./components/Dashboard/Dashboard"
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LogIn />} exact />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />        
      </Routes>
    </BrowserRouter>
  );
};

export default App;

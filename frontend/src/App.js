import "./App.css";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Register from "./components/Register";
import UserDetails from "./components/UserDetails";
import EditUser from "./components/EditUser";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="App">
      <ToastContainer />
        <Routes>
        <Route path="/" element={ <Home /> } />
        <Route path="/register" element={ <Register /> } />
        <Route path="/users/:id" element={ <UserDetails /> } />
        <Route path="/edit/:id" element={ <EditUser /> } />
        </Routes>
        
      </div>
    </BrowserRouter>
  );
}

export default App;

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MyPlanner from "../components/Planner";
import Register from "../components/Register";
import Login from "../components/LoginPage";
import DashBoard from '../components/DashBoard';
import Header from '../components/global/Header'

function App() {
  const isAuthenticated = localStorage.getItem('token') !== null;

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<DashBoard />} />
        <Route path="/planner" element={isAuthenticated ? <MyPlanner /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;

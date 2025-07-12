// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import Login from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
<<<<<<< HEAD
import UserManagementPage from './pages/UserManagementPage';
import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import Navigation from './components/Navigation';

function App() {
  return (
    <div>
      {/* Tailwind test bar */}
      <div className="bg-red-500 text-white p-4 text-center">If you see this red bar, Tailwind is working!</div>
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/users" element={<UserManagementPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="*" element={<div className="text-center p-10">404 Not Found</div>} />
      </Routes>
    </div>
=======
import DashboardPage from './pages/DashboardPage';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<div className="text-center p-10">404 Not Found</div>} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
    </Routes>
>>>>>>> f886b5692b968ca5d035b54379cfd434d3f9c401
  );
}

export default App;
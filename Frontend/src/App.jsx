// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import Login from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<div className="text-center p-10">404 Not Found</div>} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  );
}

export default App;
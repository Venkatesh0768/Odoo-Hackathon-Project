// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import Login from './pages/LoginPage';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<div className="text-center p-10">404 Not Found</div>} />
    </Routes>
  );
}

export default App;
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import PatientDetail from './components/PatientDetail';
import Usuarios from "./components/Usuarios";

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));


  const PrivateRoute = ({ children }) => {
    return token ? children : <Navigate to="/login" />;
  };

  return (
      <Router>
        <Routes>
          <Route path="/login" element={<Login setToken={setToken} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/usuarios" element={<PrivateRoute><Usuarios /></PrivateRoute>} />
          <Route path="/paciente/:id" element={<PrivateRoute><PatientDetail /></PrivateRoute>} />
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
  );
}

export default App;

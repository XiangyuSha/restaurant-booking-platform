import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import BookingPage from './pages/NewBooking';
import ConfirmationPage from './pages/ConfirmationPage';
import MyBookings from './pages/MyBookings';

const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    return token ? children : <Navigate to="/login" />;
};

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                
                {/* Protected Routes */}
                <Route path="/reserve" element={<PrivateRoute><BookingPage /></PrivateRoute>} />
                <Route path="/confirmation" element={<PrivateRoute><ConfirmationPage /></PrivateRoute>} />
                <Route path="/my-bookings" element={<PrivateRoute><MyBookings /></PrivateRoute>} />
            </Routes>
        </Router>
    );
}

export default App;
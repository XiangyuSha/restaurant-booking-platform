import React, { useState, useEffect } from 'react';
import { Button, Typography, Box, Menu, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();
    const [userEmail, setUserEmail] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null); // For dropdown menu

    useEffect(() => {
        const storedEmail = localStorage.getItem("userEmail");
        if (storedEmail) {
            setUserEmail(storedEmail);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userEmail");
        setUserEmail(null);
        navigate("/"); // Redirect to login after logout
    };

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleReservation = () => {
        if (userEmail) {
            navigate('/reserve'); // Redirect to booking if logged in
        } else {
            navigate('/login'); // Redirect to login if not logged in
        }
    };

    return (
        <Box sx={{ position: "relative", minHeight: "100vh" }}> 
            {/* Main Card */}
            <Box
            sx={{
                position: "relative",
                minHeight: "100vh",
                backgroundImage: "url('https://www.micocina.com/wp-content/uploads/2024/10/IMG_3131-1024x683-1.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "white",
                textAlign: "center",
                padding: "0 20px",
            }}
        >
            <Box sx={{ maxWidth: "600px" }}>
                <Typography variant="h3" sx={{ fontWeight: "bold" }}>
                    Better Dining Experience
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    sx={{ mt: 3, fontSize: "18px", padding: "10px 30px", fontWeight: "bold" }}
                    onClick={handleReservation}
                >
                    Reserve now
                </Button>
            </Box>
        </Box>

            {/* Top-right Account Section */}
            <Box sx={{ position: "absolute", top: 20, right: 20 }}>
                {userEmail ? (
                    <>
                        <Button variant="contained" onClick={handleMenuOpen}>
                            My account
                        </Button>
                        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                            <MenuItem onClick={() => { navigate("/my-bookings"); handleMenuClose(); }}>
                                My Bookings
                            </MenuItem>
                            <MenuItem onClick={handleLogout}>Logout</MenuItem>
                        </Menu>
                    </>
                ) : (
                    <>
                        <Button variant="contained" sx={{ marginRight: 1 }} onClick={() => navigate("/login")}>
                            Sign In
                        </Button>
                        <Button variant="contained" color="primary" onClick={() => navigate("/register")}>
                            Register
                        </Button>
                    </>
                )}
            </Box>
        </Box>
    );
};

export default Home;

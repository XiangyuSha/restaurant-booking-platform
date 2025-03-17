import React from 'react';
import { Button, Typography, Box, Card, CardContent } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    const handleBookNow = () => {
        navigate('/login'); // Redirect to login first
    };

    return (
        <Box sx={{ position: "relative", minHeight: "100vh" }}> 
            {/* Main Card */}
            <Card sx={{ maxWidth: 600, margin: 'auto', mt: 4, p: 3, textAlign: 'center' }}>
                <CardContent>
                    <Typography variant="h4">Welcome to Our Restaurant</Typography>
                    <Typography variant="body1" sx={{ mt: 2 }}>
                        Reserve your table and enjoy the experience!
                    </Typography>
                    <Button variant="contained" color="primary" sx={{ mt: 3 }} onClick={handleBookNow}>
                        Book Now
                    </Button>
                </CardContent>
            </Card>
    
            {/* Sign In and Register Buttons */}
            <Box sx={{ position: "absolute", top: 20, right: 20 }}>
                <Button variant="contained" sx={{ marginRight: 1 }} onClick={() => navigate("/login")}>
                    Sign In
                </Button>
                <Button variant="contained" color="primary" onClick={() => navigate("/register")}>
                    Register
                </Button>
            </Box>
        </Box>
    );
    
};

export default Home;

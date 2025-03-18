import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ active }) => {
  const navigate = useNavigate();

  return (
    <Box sx={{ width: 180, bgcolor: "#F5F5F5", p: 3, height: "100vh", boxShadow: 2 }}>
      <Typography variant="h5" fontWeight="bold" sx={{ mb: 4, color: "#333", textAlign: "center"}}>
        Dashboard
      </Typography>

      <Button 
        fullWidth 
        variant="contained"
        sx={{ 
          bgcolor: active === "new-booking" ? "#E0E7FF" : "#F5F5F5", 
          color: active === "new-booking" ? "#3B82F6" : "#1E3A8A", 
          fontWeight: "bold", 
          mb: 2, 
          textTransform: "none",
          ":hover": { bgcolor: "#BFDBFE" }
        }} 
        onClick={() => navigate("/reserve")}
      >
        New Booking
      </Button>

      <Button 
        fullWidth 
        variant="contained"
        sx={{ 
          bgcolor: active === "bookings" ? "#D9E2FC" : "#F5F5F5", 
          color: active === "bookings" ? "#1E3A8A" : "#3B82F6", 
          fontWeight: "bold", 
          textTransform: "none",
          ":hover": { bgcolor: "#A5B4FC" }
        }} 
        onClick={() => navigate("/my-bookings")}
      >
        My Bookings
      </Button>
    </Box>
  );
};

export default Sidebar;

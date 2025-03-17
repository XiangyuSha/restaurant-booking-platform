import React from "react";
import { Box, Typography, Card, CardContent, Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

const ConfirmationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const bookingData = location.state;

  if (!bookingData) {
    return (
      <Box sx={{ textAlign: "center", mt: 5 }}>
        <Typography variant="h5" color="error">
          No booking details found.
        </Typography>
        <Button variant="contained" sx={{ mt: 2 }} onClick={() => navigate("/reserve")}>
          Back to Booking
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <Card sx={{ maxWidth: 500, p: 4, textAlign: "center" }}>
        <CardContent>
          <Typography variant="h4" color="primary">
            Booking Confirmed! 🎉
          </Typography>
          <Typography variant="h6" sx={{ mt: 2 }}>
            Thank you for your reservation.
          </Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            <strong>Date:</strong> {bookingData.date}
          </Typography>
          <Typography variant="body1">
            <strong>Time:</strong> {bookingData.time}
          </Typography>
          <Typography variant="body1" sx={{ mt: 1 }}>
            <strong>Booking ID:</strong> {bookingData.bookingId}
          </Typography>

          {/* Navigate to dashboard */}
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 3 }}
            onClick={() => navigate("/my-bookings")}
          >
            View My Bookings
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ConfirmationPage;
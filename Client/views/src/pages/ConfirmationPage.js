import React from "react";
import { Box, Typography, Card, CardContent, Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

const ConfirmationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const bookingData = location.state;

  if (!bookingData) {
    return (
      <Box sx={{ margin: "auto", mt: 4, p: 3, textAlign: "center" }}>
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
    <Box sx={{ display: "flex", mt: 2, p: 3, justifyContent: "center", alignItems: "center" }}>
      <Card sx={{ maxWidth: 500, p: 4, textAlign: "center" }}>
        <CardContent>
          <Typography variant="h4" color="primary">
            Booking Confirmed!
          </Typography>
          <Typography variant="h6" sx={{ mt: 2 }}>
            Thank you for your reservation.
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
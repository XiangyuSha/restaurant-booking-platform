import React, { useState, useEffect } from "react";
import { Box, Button, Typography, Card, TextField } from "@mui/material";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useNavigate } from "react-router-dom";
import Sidebar from './Sidebar';
import api from "../api"; // Import the axios instance

const BookingPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // Step 1: Select Date/Time, Step 2: Enter Details
  const [date, setDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(null);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [bookedTimes, setBookedTimes] = useState([]); // Stores booked time slots
  const [email, setEmail] = useState("");
  const [guests, setGuests] = useState(1);
  const [comments, setComments] = useState("");

  // Generate 9 AM - 9 PM time slots
  useEffect(() => {
    const generateTimeSlots = () => {
      const times = [];
      for (let hour = 9; hour <= 21; hour++) {
        for (let minute of [0, 15, 30, 45]) {
          let ampm = hour >= 12 ? "PM" : "AM";
          let formattedHour = hour > 12 ? hour - 12 : hour;
          let formattedMinute = minute === 0 ? "00" : minute;
          times.push(`${formattedHour}:${formattedMinute} ${ampm}`);
        }
      }
      setAvailableTimes(times);
    };

    generateTimeSlots();
  }, []);

  // Fetch booked time slots for the selected date
  useEffect(() => {
    const fetchBookedTimes = async () => {
      try {
        const formattedDate = date.toISOString().split("T")[0]; // Convert to YYYY-MM-DD
        const response = await api.get("/booked-slots", {
          params: { date: formattedDate }
        });

        const formattedBookedTimes = response.data.bookedTimes.map(time => convertTo24HourFormat(time));
        setBookedTimes(formattedBookedTimes); // updates the state whenever new booked times are fetched.

        console.log("Booked Times:", formattedBookedTimes); // Debugging
      } catch (error) {
        console.error("Error fetching booked times:", error);
      }
    };

    fetchBookedTimes();
  }, [date]); // fetches booked time slots whenever date changes and run effect again

  const handleNext = () => {
    if (!selectedTime) {
      alert("Please select a time slot before proceeding.");
      return;
    }
    setStep(2);
  };

  const convertTo24HourFormat = (time12h) => {
    const [time, modifier] = time12h.split(" ");
    let [hours, minutes] = time.split(":");

    if (modifier === "PM" && hours !== "12") {
        hours = String(parseInt(hours, 10) + 12);
    }
    if (modifier === "AM" && hours === "12") {
        hours = "00";
    }

    return `${hours.padStart(2, "0")}:${minutes.padStart(2, "0")}:00`; // Ensure HH:MM:SS format
  };

  // Add a new booking
  const handleSubmit = async () => {
    if (!selectedTime || !email || !guests || !date) {
      alert("Please fill in all fields before submitting.");
      return;
    }

    try {
      const formattedDate = date.toISOString().split("T")[0];
      const formattedTime = convertTo24HourFormat(selectedTime);

      const response = await api.post("/book-table", {
        email, // omit the key if key and value name are same
        date: formattedDate,
        time: formattedTime,
        guests,
        comments,
      });

      // Also passes the API response to the next page
      navigate("/confirmation", { state: response.data });

    } catch (error) {
      console.error("Booking error:", error.response?.data || error.message);
    }
  };

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      
      <Sidebar active="new-booking" />  {/* Use Sidebar */}

      {/* Main Content */}
      <Box sx={{ flex: 1, p: 4 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>Booking Information</Typography>

        {/* Progress Indicator */}
        <Box sx={{ display: "flex", alignItems: "center", width: "100%", mb: 3 }}>
          <Box sx={{ width: "50%", height: 5, bgcolor: step === 1 ? "blue" : "#E0E0E0" }} />
          <Box sx={{ width: "50%", height: 5, bgcolor: step === 2 ? "blue" : "#E0E0E0", ml: 1 }} />
        </Box>

        {step === 1 ? (
          <>

            {/* Calendar and Time Selection */}
            <Box sx={{ mt: 6, display: "flex", gap: 4 }}>
              {/* Calendar */}
              <Box>
                <Typography>Your time zone</Typography>
                <Typography variant="subtitle2">Pacific Standard Time (PST)</Typography>
                <Calendar onChange={setDate} value={date} />
              </Box>

              {/* Time Selection */}
              <Box>
                <Typography>Book on {date.toDateString()}</Typography>
                <Card sx={{ p: 2, mt: 2, maxHeight: 300, overflowY: "auto" }}>
                  {availableTimes.map((time, index) => {
                    const formattedTime = convertTo24HourFormat(time); // Convert to match backend format
                    const isBooked = bookedTimes.includes(formattedTime); // Compare correctly
                    const isSelected = selectedTime === time;

                    return (
                      <Button
                        key={index}
                        variant={isSelected ? "contained" : "outlined"}
                        fullWidth
                        sx={{ 
                          mb: 1,
                          backgroundColor: isBooked ? "#ddd" : undefined, // Grey out booked slots
                          color: isBooked ? "#888" : "black", 
                          cursor: isBooked ? "not-allowed" : "pointer"
                        }}
                        onClick={() => !isBooked && setSelectedTime(time)}
                        disabled={isBooked} // Disable booked slots
                      >
                        {time}
                      </Button>
                    );
                  })}
                </Card>
              </Box>
            </Box>

{/* Summary Card with Added Spacing */}
<Card sx={{ p: 2, mb: 3, mt: 4, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 3 }}>
  <Box>
    <Typography variant="h6" fontWeight="bold">Summary</Typography>
    <Typography variant="body2" color="textSecondary">You are booking a table on:</Typography>
    <Typography variant="body1" fontWeight="bold">{date.toDateString()}</Typography>
  </Box>

  <Box sx={{ ml: 5 }}> {/* Added margin-left for spacing */}
    <Typography variant="body2" color="textSecondary">Selected Time:</Typography>
    <Typography variant="body1" fontWeight="bold">{selectedTime}</Typography>
  </Box>
</Card>


            {/* Next Step Button */}
            <Button variant="contained" sx={{ gap: 1 }} onClick={handleNext}>Next</Button>
          </>
        ) : (
          <>
            {/* User Input Form */}
            <Card sx={{ p: 3, mb: 3 }}>
              <Typography variant="h6">Confirm Your Booking</Typography>
              <TextField fullWidth label="Email" value={email} onChange={(e) => setEmail(e.target.value)} margin="normal" required />
              <TextField fullWidth label="Number of Guests" type="number" value={guests} onChange={(e) => setGuests(e.target.value)} margin="normal" required />
              <TextField fullWidth label="Additional Comments" multiline rows={3} value={comments} onChange={(e) => setComments(e.target.value)} margin="normal" />
            </Card>

            {/* Back and Submit Buttons */}
            <Box sx={{ display: "flex", gap: 2 }}>
              <Button variant="outlined" onClick={() => setStep(1)}>Back</Button>
              <Button variant="contained" onClick={handleSubmit}>Submit Reservation</Button>
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
};

export default BookingPage;
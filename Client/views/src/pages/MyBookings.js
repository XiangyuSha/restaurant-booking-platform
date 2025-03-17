import React, { useState, useEffect } from "react";
import { 
    Box, Button, Typography, Card, Table, TableBody, TableCell, 
    TableContainer, TableHead, TableRow, Dialog, DialogActions, 
    DialogContent, DialogTitle, TextField, Snackbar, Alert 
} from "@mui/material";
import axios from "axios";
import API_BASE_URL from "../config";
import Sidebar from './Sidebar';

const MyBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [openEdit, setOpenEdit] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [updatedGuests, setUpdatedGuests] = useState(1);
    const [updatedComments, setUpdatedComments] = useState("");
    const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        try {
            const email = localStorage.getItem("userEmail");
            const response = await axios.get(`${API_BASE_URL}/my-bookings`, { params: { email } });
            setBookings(response.data.bookings || []);
        } catch (error) {
            console.error("Error fetching bookings:", error);
        }
    };

    const handleEdit = (booking) => {
        setSelectedBooking(booking);
        setUpdatedGuests(booking.guests);
        setUpdatedComments(booking.comments || "");
        setOpenEdit(true);
    };

    const handleUpdate = async () => {
        if (!selectedBooking) return;
        
        try {
            await axios.put(`${API_BASE_URL}/update-booking/${selectedBooking._id}`, {
                guests: updatedGuests,
                comments: updatedComments,
            });

            fetchBookings();
            setOpenEdit(false);
            setSnackbar({ open: true, message: "Booking updated successfully!", severity: "success" });
        } catch (error) {
            console.error("Error updating booking:", error);
            setSnackbar({ open: true, message: "Error updating booking!", severity: "error" });
        }
    };

    const handleCancel = async (id) => {
        try {
            await axios.delete(`${API_BASE_URL}/delete-booking/${id}`);
            fetchBookings();
            setSnackbar({ open: true, message: "Booking canceled successfully!", severity: "success" });
        } catch (error) {
            console.error("Error canceling booking:", error);
            setSnackbar({ open: true, message: "Error canceling booking!", severity: "error" });
        }
    };

    return (
        <Box sx={{ display: "flex", height: "100vh" }}>
            <Sidebar active="bookings" />

            {/* Main Content */}
            <Box sx={{ flex: 1, p: 4 }}>
                <Typography variant="h5" sx={{ mb: 3, fontWeight: "bold" }}>My Bookings</Typography>
                <TableContainer component={Card} sx={{ borderRadius: 2, boxShadow: 3 }}>
                    <Table>
                        <TableHead>
                            <TableRow sx={{ bgcolor: "#1565C0" }}>
                                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Date</TableCell>
                                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Time</TableCell>
                                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Guests</TableCell>
                                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Comments</TableCell>
                                <TableCell sx={{ color: "white", fontWeight: "bold", textAlign: "center" }}>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {bookings.map((booking, index) => (
                                <TableRow key={booking._id || index} hover>
                                    <TableCell>{new Date(booking.date).toDateString()}</TableCell>
                                    <TableCell>{booking.time}</TableCell>
                                    <TableCell>{booking.guests}</TableCell>
                                    <TableCell>{booking.comments || "N/A"}</TableCell>
                                    <TableCell sx={{ textAlign: "center" }}>
                                        <Button sx={{ color: "#1565C0", fontWeight: "bold" }} onClick={() => handleEdit(booking)}>Edit</Button>
                                        <Button sx={{ color: "red", fontWeight: "bold" }} onClick={() => handleCancel(booking._id)}>Cancel</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                {/* Edit Booking Modal */}
                <Dialog open={openEdit} onClose={() => setOpenEdit(false)}>
                    <DialogTitle>Edit Booking</DialogTitle>
                    <DialogContent>
                        <TextField 
                            fullWidth 
                            label="Guests" 
                            type="number" 
                            value={updatedGuests} 
                            onChange={(e) => setUpdatedGuests(e.target.value)} 
                            margin="normal" 
                        />
                        <TextField 
                            fullWidth 
                            label="Comments" 
                            multiline 
                            rows={3} 
                            value={updatedComments} 
                            onChange={(e) => setUpdatedComments(e.target.value)} 
                            margin="normal" 
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setOpenEdit(false)}>Cancel</Button>
                        <Button variant="contained" onClick={handleUpdate}>Update</Button>
                    </DialogActions>
                </Dialog>

                {/* Snackbar for Success/Error Messages */}
                <Snackbar 
                    open={snackbar.open} 
                    autoHideDuration={3000} 
                    onClose={() => setSnackbar({ ...snackbar, open: false })}
                    anchorOrigin={{ vertical: "top", horizontal: "center" }}
                >
                    <Alert severity={snackbar.severity} sx={{ width: "100%" }}>
                        {snackbar.message}
                    </Alert>
                </Snackbar>
            </Box>
        </Box>
    );
};

export default MyBookings;
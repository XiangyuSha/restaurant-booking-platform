/** 
import React, { useState } from 'react';
import { TextField, Button, Card, CardContent, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
const API_BASE_URL = require('../config')

const ReserveTable = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({ name: '', email: '', date: '', time: '', guests: '', comments: '' });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
            const response = await fetch(`${API_BASE_URL}/book-table`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });
    };

    return (
        <Card sx={{ maxWidth: 600, margin: 'auto', mt: 4, p: 3 }}>
            <CardContent>
                <Typography variant="h5">Reserve a Table</Typography>
                <TextField fullWidth label="Name" name="name" value={form.name} onChange={handleChange} margin="normal" required />
                <TextField fullWidth label="Email" name="email" value={form.email} onChange={handleChange} margin="normal" required />
                <TextField fullWidth type="date" name="date" value={form.date} onChange={handleChange} margin="normal" required />
                <TextField fullWidth type="time" name="time" value={form.time} onChange={handleChange} margin="normal" required />
                <TextField fullWidth type="number" label="Guests" name="guests" value={form.guests} onChange={handleChange} margin="normal" required />
                <TextField fullWidth label="Comments" name="comments" value={form.comments} onChange={handleChange} margin="normal" />
                <Button variant="contained" sx={{ mt: 3 }} onClick={handleSubmit}>Submit</Button>
                {message && <Typography color="error">{message}</Typography>}
            </CardContent>
        </Card>
    );
};

export default ReserveTable;
*/
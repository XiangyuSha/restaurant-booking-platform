import React, { useState } from 'react';
import { TextField, Button, Snackbar, Alert, Card, CardContent, Typography, Checkbox, FormControlLabel } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import API_BASE_URL from "../config";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
    const navigate = useNavigate();
  
    const handleLogin = async () => {
      try {
        const response = await axios.post(`${API_BASE_URL}/login`, { email, password });
  
        localStorage.setItem("token", response.data.token); // Store token
        localStorage.setItem("userEmail", email); // Store the email
  
        setSnackbar({ open: true, message: "Login succeeded!", severity: "success" });
  
        setTimeout(() => {
          navigate("/reserve"); // Redirect to booking page after login
        }, 1500);
        
      } catch (error) {
        setSnackbar({ open: true, message: error.response?.data?.message || "Login failed", severity: "error" });
      }
    };

    return (
        <Card sx={{ maxWidth: 400, margin: "auto", mt: 4, p: 3, textAlign: "center" }}>
          <CardContent>
            <Typography variant="h5">LOGIN</Typography>
            <TextField fullWidth label="Email" value={email} onChange={(e) => setEmail(e.target.value)} margin="normal" required />
            <TextField fullWidth label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} margin="normal" required />
            <Button variant="contained" sx={{ mt: 3 }} onClick={handleLogin}>Login</Button>
    
            <Typography sx={{ mt: 2 }}>
              Don't have an account? <span style={{ color: "blue", cursor: "pointer" }} onClick={() => navigate("/register")}>Register</span>
            </Typography>
    
            {/* Snackbar Notification */}
            <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
              <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
            </Snackbar>
          </CardContent>
        </Card>
      );
    };
    
export default Login;
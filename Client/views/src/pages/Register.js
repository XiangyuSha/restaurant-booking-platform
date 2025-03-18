import React, { useState } from "react";
import { TextField, Button, Snackbar, Alert, Card, CardContent, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import API_BASE_URL from "../config";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await axios.post(`${API_BASE_URL}/register`, { email, password });

      setSnackbar({ open: true, message: "Registration successful!", severity: "success" });
      setTimeout(() => {
        navigate("/login"); // Redirect to login after registration
      }, 1500);
      
    } catch (error) {
      setSnackbar({ open: true, message: error.response?.data?.message || "Registration failed", severity: "error" });
    }
  };

  return (
    <Card sx={{ maxWidth: 400, margin: "auto", mt: 4, p: 3, textAlign: "center" }}>
      <CardContent>
        <Typography variant="h5">REGISTER</Typography>
        <TextField fullWidth label="Email" value={email} onChange={(e) => setEmail(e.target.value)} margin="normal" required />
        <TextField fullWidth label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} margin="normal" required />
        <Button variant="contained" sx={{ mt: 3 }} onClick={handleRegister}>Register</Button>

        <Typography sx={{ mt: 2 }}>
          Already have an account? <span style={{ color: "blue", cursor: "pointer" }} onClick={() => navigate("/login")}>Login</span>
        </Typography>

        {/* Snackbar Notification */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={3000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
        </Snackbar>
      </CardContent>
    </Card>
  );
};

export default Register;
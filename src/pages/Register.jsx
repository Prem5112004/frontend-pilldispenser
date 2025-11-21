import React, { useState } from "react";
import {
  Box, Card, CardContent, Typography, TextField, Button, Alert, InputAdornment, IconButton, MenuItem
} from "@mui/material";
import { Visibility, VisibilityOff, PersonAdd, ArrowBack } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(""); setSuccess("");
    try {
      await axios.post("https://pilldispenser.onrender.com/api/doctors/register", {
        name, id, password, phoneno: phone, specialty
      });
      setSuccess("Registration successful! Redirecting to login...");
      setTimeout(() => navigate("/"), 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Could not register.");
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#F9FAFC", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Card sx={{ p: 2, maxWidth: 420, width: "100%", borderRadius: 3, boxShadow: 4 }}>
        <CardContent>
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <PersonAdd color="primary" sx={{ fontSize: 36, mr: 1 }} />
            <Typography variant="h5" color="primary" fontWeight="bold">Register Doctor</Typography>
          </Box>
          <form onSubmit={handleRegister} autoComplete="off">
            <TextField label="Full Name" fullWidth margin="normal" variant="outlined"
              value={name} onChange={e => setName(e.target.value)} required />
            <TextField label="Doctor ID" fullWidth margin="normal" variant="outlined"
              value={id} onChange={e => setId(e.target.value)} required />
            <TextField label="Password" fullWidth margin="normal"
              type={showPwd ? "text" : "password"} variant="outlined"
              value={password} onChange={e => setPassword(e.target.value)} required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPwd((s) => !s)} edge="end">
                      {showPwd ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
            <TextField label="Phone No." fullWidth margin="normal" variant="outlined"
              value={phone} onChange={e => setPhone(e.target.value)} required />
            <TextField label="Specialty" fullWidth margin="normal" select variant="outlined"
              value={specialty} onChange={e => setSpecialty(e.target.value)} required>
              <MenuItem value="General">General</MenuItem>
              <MenuItem value="Pediatrics">Pediatrics</MenuItem>
              <MenuItem value="Cardiology">Cardiology</MenuItem>
              <MenuItem value="Surgery">Surgery</MenuItem>
              <MenuItem value="Psychiatry">Psychiatry</MenuItem>
            </TextField>
            {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
            {success && <Alert severity="success" sx={{ mt: 2 }}>{success}</Alert>}
            <Button fullWidth variant="contained" color="primary" size="large"
              sx={{ mt: 3, py: 1.3, borderRadius: 1.5, fontWeight: "bold", fontSize: 16, letterSpacing: 1 }}
              type="submit"
              disabled={!name || !id || !phone || !password || !specialty}>
              Register
            </Button>
            <Button color="secondary" fullWidth sx={{ mt: 2, textTransform: "none", fontWeight: "medium" }}
              startIcon={<ArrowBack />} onClick={() => navigate("/")}>
              Back to Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}
export default Register;

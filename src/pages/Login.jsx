import React, { useState } from "react";
import {
  Box, Card, CardContent, Typography, TextField, Button, Alert, InputAdornment, IconButton
} from "@mui/material";
import { Visibility, VisibilityOff, LocalHospital } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await axios.post("http://localhost:5000/api/doctors/login", { id, password });
      localStorage.setItem("doctorId", res.data.doctor.id);
      navigate(`/dashboard/${res.data.doctor.id}`);
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#EAF1FB", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Card sx={{ p: 2, maxWidth: 380, width: "100%", borderRadius: 3, boxShadow: 4 }}>
        <CardContent>
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <LocalHospital color="primary" sx={{ fontSize: 40, mr: 1 }} />
            <Typography variant="h5" color="primary" fontWeight="bold">
              MediTrack Login
            </Typography>
          </Box>
          <form onSubmit={handleLogin} autoComplete="off">
            <TextField
              label="Doctor ID"
              fullWidth margin="normal" variant="outlined" value={id}
              onChange={e => setId(e.target.value)} autoFocus required
            />
            <TextField
              label="Password" fullWidth margin="normal"
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
            {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
            <Button fullWidth variant="contained" color="primary" size="large"
              sx={{ mt: 3, py: 1.3, borderRadius: 1.5, fontWeight: "bold", fontSize: 16, letterSpacing: 1 }}
              type="submit" disabled={!id || !password}>
              Login
            </Button>
            <Button color="secondary" fullWidth sx={{ mt: 2, textTransform: "none", fontWeight: "medium" }}
              onClick={() => navigate("/register")}>
              <Typography component="span" variant="body2">New user?</Typography> Register here
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}
export default Login;

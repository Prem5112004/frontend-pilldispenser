import React, { useState } from "react";
import {
  Box, Container, Card, CardContent, Typography, TextField, Button, MenuItem, Alert
} from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function AddPatient() {
  const { doctorId: paramDoctorId } = useParams();
  const doctorId = paramDoctorId || localStorage.getItem("doctorId");
  const [data, setData] = useState({
    name: "",
    age: "",
    gender: "",
    phoneno: "",
    address: "",
    username: "",
    password: ""
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); setSuccess("");
    // Backend: expects: name, age, gender, phoneno, address, doctorId
    if (!data.name || !data.age || !data.gender || !data.phoneno || !data.address || !data.username || !data.password) {
      setError("All fields are required.");
      return;
    }
    try {
      await axios.post("https://pilldispenser.onrender.com/api/patients/add", {
        ...data,
        doctorId // attach doctorId
      });
      setSuccess("Patient added successfully.");
      setTimeout(() => navigate(`/patients/${doctorId}`), 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Error adding patient.");
    }
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#f8fafd" }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1 }}>
        <Navbar />
        <Container maxWidth="sm" sx={{ mt: 6 }}>
          <Card>
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <PersonAddIcon sx={{ color: "primary.main", fontSize: 38, mr: 1 }} />
                <Typography variant="h5" fontWeight="bold" color="primary">
                  Add New Patient
                </Typography>
              </Box>
              <form onSubmit={handleSubmit} autoComplete="off">
                <TextField
                  label="Name" name="name" fullWidth required value={data.name}
                  onChange={handleChange} sx={{ mb: 2 }} autoFocus
                />
                <TextField
                  type="number" label="Age" name="age" fullWidth required value={data.age}
                  onChange={handleChange} sx={{ mb: 2 }}
                />
                <TextField
                  select label="Gender" name="gender" fullWidth required value={data.gender}
                  onChange={handleChange} sx={{ mb: 2 }}
                >
                  <MenuItem value="">Select</MenuItem>
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </TextField>
                <TextField
                  label="Phone Number" name="phoneno" fullWidth required value={data.phoneno}
                  onChange={handleChange} sx={{ mb: 2 }}
                />
                <TextField
                  label="Address" name="address" fullWidth required value={data.address}
                  onChange={handleChange} sx={{ mb: 2 }}
                />
                 <TextField
                  label="Patient Username" name="username" fullWidth required value={data.username} 
                  onChange={handleChange} sx={{ mb: 2 }}
                />
                <TextField
                  label="Patient Password" name="password" fullWidth type="password" required value={data.password}
                  onChange={handleChange} sx={{ mb: 2 }}
                />
                {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
                {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  fullWidth
                  sx={{ fontWeight: "bold", py: 1.2, mt: 1 }}
                  type="submit"
                >
                  Add Patient
                </Button>
                <Button
                  variant="text"
                  fullWidth
                  sx={{ mt: 1 }}
                  onClick={() => navigate(`/patients/${doctorId}`)}
                >
                  Cancel
                </Button>
              </form>
            </CardContent>
          </Card>
        </Container>
      </Box>
    </Box>
  );
}

export default AddPatient;

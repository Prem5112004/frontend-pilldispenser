import React, { useEffect, useState } from 'react';
import {
  Box, Container, Card, CardContent, Typography, Button, TextField, Snackbar, Alert, InputAdornment, MenuItem, IconButton
} from "@mui/material";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import format from 'date-fns/format';

function AddMedicine() {
  const { patientId, doctorId } = useParams();
  const navigate = useNavigate();
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [medicineName, setMedicineName] = useState("");
  const [scheduledTime, setScheduledTime] = useState(null); // Date object
  const [successMsg, setSuccessMsg] = useState("");
  const [failMsg, setFailMsg] = useState("");

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const res = await axios.get(`https://pilldispenser.onrender.com/api/patient/${patientId}`);
        setPatient(res.data);
        setError("");
      } catch{
        setError("Patient not found.");
        setPatient(null);
      } finally {
        setLoading(false);
      }
    };
    fetchPatient();
  }, [patientId]);

  // Handles form submission
  const handleAdd = async (e) => {
    e.preventDefault();
    setSuccessMsg("");
    setFailMsg("");
    try {
      const time24 = scheduledTime ? format(scheduledTime, "HH:mm") : "";
      const res = await axios.post("http://localhost:5000/api/medicines/add", {
        name: medicineName,
        scheduledTime: time24,
        patientId,
      });
      setSuccessMsg(res.data.message || "Medicine added!");
      setMedicineName("");
      setScheduledTime(null);
    } catch (err) {
      setFailMsg(err?.response?.data?.message || "Could not add medicine");
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", minHeight: "100vh" }}>
        <Sidebar />
        <Box sx={{ flexGrow: 1 }}>
          <Navbar />
          <Container maxWidth="sm" sx={{ mt: 10 }}>
            <Typography variant="h5" align="center">Loading patient...</Typography>
          </Container>
        </Box>
      </Box>
    );
  }

  if (error || !patient) {
    return (
      <Box sx={{ display: "flex", minHeight: "100vh" }}>
        <Sidebar />
        <Box sx={{ flexGrow: 1 }}>
          <Navbar />
          <Container maxWidth="sm" sx={{ mt: 10 }}>
            <Typography variant="h6" align="center" color="error">{error}</Typography>
          </Container>
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#f8fafd" }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1 }}>
        <Navbar />
        <Container maxWidth="sm" sx={{ mt: 5 }}>
          <Card>
            <CardContent>
              <Typography variant="h5" color="primary" fontWeight="bold" gutterBottom>
                Add Medicine For {patient.name}
              </Typography>
              <Box component="form" onSubmit={handleAdd} sx={{ mt: 3 }}>
                <TextField
                  fullWidth
                  required
                  label="Medicine Name"
                  value={medicineName}
                  onChange={(e) => setMedicineName(e.target.value)}
                  sx={{ mb: 2 }}
                />
                <LocalizationProvider dateAdapter={AdapterDateFns}>
  <TimePicker
    ampm
    label="Scheduled Time"
    value={scheduledTime}
    onChange={(time) => setScheduledTime(time)}
    minutesStep={1}
    renderInput={(params) => (
      <TextField
        {...params}
        fullWidth
        required
        sx={{ mb: 2 }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton>
                <AccessTimeIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    )}
  />
</LocalizationProvider>

                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={!scheduledTime || !medicineName}
                  >
                    Add Medicine
                  </Button>
                </Box>
              </Box>
              <Button
                sx={{ mt: 2 }}
                color="secondary"
                onClick={() => navigate(`/patient/${patientId}/${doctorId}`)}
              >
                Back to Patient Details
              </Button>
            </CardContent>
          </Card>
        </Container>
        <Snackbar
          open={!!successMsg}
          autoHideDuration={4000}
          onClose={() => setSuccessMsg("")}
        >
          <Alert onClose={() => setSuccessMsg("")} severity="success" variant="filled">
            {successMsg}
          </Alert>
        </Snackbar>
        <Snackbar
          open={!!failMsg}
          autoHideDuration={4000}
          onClose={() => setFailMsg("")}
        >
          <Alert onClose={() => setFailMsg("")} severity="error" variant="filled">
            {failMsg}
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  );
}

export default AddMedicine;

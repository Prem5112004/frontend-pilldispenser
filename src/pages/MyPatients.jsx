import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Avatar,
  Button,
  CircularProgress,
  Alert
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function MyPatients() {
  const { doctorId: paramDoctorId } = useParams();
  const doctorId = paramDoctorId || localStorage.getItem("doctorId");
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPatients() {
      try {
        setLoading(true);
        const res = await axios.get(`http://localhost:5000/api/patients/${doctorId}`);
        setPatients(res.data);
        setError("");
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load patients.");
      } finally {
        setLoading(false);
      }
    }
    if (doctorId) fetchPatients();
  }, [doctorId]);

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#f8fafd" }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1 }}>
        <Navbar />
        <Container maxWidth="lg" sx={{ mt: 5 }}>
          <Typography variant="h5" color="primary" fontWeight="bold" gutterBottom>
            My Patients
          </Typography>
          {loading && (
            <Box sx={{ display: "flex", justifyContent: "center", pt: 8 }}>
              <CircularProgress />
            </Box>
          )}
          {error && <Alert severity="error" sx={{ my: 3 }}>{error}</Alert>}
          <Grid container spacing={3}>
            {!loading && patients.length === 0 && !error && (
              <Grid item xs={12}>
                <Typography color="text.secondary">
                  No patients found. Please add a patient.
                </Typography>
              </Grid>
            )}
            {patients.map((patient) => (
              <Grid item xs={12} sm={6} md={4} key={patient._id}>
                <Card sx={{ transition: "0.2s", ":hover": { boxShadow: 6, transform: "scale(1.025)" } }}>
                  <CardContent>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                      <Avatar sx={{ bgcolor: "primary.main", mr: 2 }}>
                        <PersonIcon />
                      </Avatar>
                      <Box>
                        <Typography variant="h6" fontWeight="medium">{patient.name}</Typography>
                        <Typography variant="body2" color="text.secondary">
                          Age: {patient.age} | {patient.gender}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Phone: {patient.phoneno}
                        </Typography>
                      </Box>
                    </Box>
                    <Button
                      variant="contained"
                      size="small"
                      fullWidth
                      sx={{ mt: 2 }}
                      onClick={() => navigate(`/patient/${patient.id}/${doctorId}`)}
                    >
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}

export default MyPatients;

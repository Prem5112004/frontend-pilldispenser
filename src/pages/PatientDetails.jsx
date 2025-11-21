import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  IconButton,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Avatar,
  CircularProgress,
  Alert,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import PersonIcon from "@mui/icons-material/Person";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function PatientDetails() {
  const { id, doctorId } = useParams();
  const navigate = useNavigate();
  const [patient, setPatient] = useState(null);
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Fetch patient + medicines
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError("");

        // Fetch patient details
        const patientRes = await axios.get(`http://localhost:5000/api/patient/${id}`);
        setPatient(patientRes.data);

        // Fetch medicines for patient
        const medRes = await axios.get(`http://localhost:5000/api/medicines/${id}`);
        setMedicines(medRes.data);
      } catch (err) {
        if (err.response?.status === 404) {
          setMedicines([]); // no medicines yet
        } else {
          setError(err.response?.data?.message || "Failed to fetch patient data");
        }
      } finally {
        setLoading(false);
      }
    }
    if (id) fetchData();
  }, [id]);

  // Delete a medicine
  const handleDeleteMedicine = async (medId) => {
    try {
      await axios.delete(`http://localhost:5000/api/medicines/${medId}`);
      setMedicines((prev) => prev.filter((m) => m.id !== medId));
      setSuccess("Medicine deleted successfully");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete medicine");
    }
  };

  // Delete patient
  const handleDeletePatient = async () => {
    if (!window.confirm("Are you sure you want to delete this patient?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/patient/${id}`);
      navigate(`/patients/${doctorId}`);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete patient");
    }
  };

  if (loading)
    return (
      <Box sx={{ minHeight: "100vh", bgcolor: "#f8fafd", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <CircularProgress />
      </Box>
    );

  if (error)
    return (
      <Box sx={{ minHeight: "100vh", bgcolor: "#f8fafd", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#f8fafd" }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1 }}>
        <Navbar />
        <Container maxWidth="sm" sx={{ mt: 4 }}>
          <Card sx={{ p: 3, boxShadow: 4 }}>
            <CardContent>
              <Grid container alignItems="center" spacing={2}>
                <Grid item>
                  <Avatar sx={{ bgcolor: "primary.main" }}>
                    <PersonIcon />
                  </Avatar>
                </Grid>
                <Grid item>
                  <Typography variant="h5" fontWeight="bold">
                    {patient?.name}
                  </Typography>
                  <Typography color="text.secondary">Patient ID: {patient?.id}</Typography>
                </Grid>
              </Grid>

              <Divider sx={{ my: 2 }} />

              <Typography gutterBottom><strong>Age:</strong> {patient?.age}</Typography>
              <Typography gutterBottom><strong>Gender:</strong> {patient?.gender}</Typography>
              <Typography gutterBottom><strong>Phone No:</strong> {patient?.phoneno}</Typography>
              <Typography gutterBottom><strong>Address:</strong> {patient?.address}</Typography>

              <Divider sx={{ my: 2 }} />
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Medicines
              </Typography>

              {medicines.length === 0 ? (
                <Typography color="text.secondary">No medicines scheduled.</Typography>
              ) : (
                <List>
                  {medicines.map((med) => (
                    <ListItem key={med.id}>
                      <ListItemText
                        primary={med.name}
                        secondary={`Scheduled at: ${med.scheduledTime}`}
                      />
                      <ListItemSecondaryAction>
                        <IconButton edge="end" onClick={() => handleDeleteMedicine(med.id)}>
                          <DeleteIcon color="error" />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))}
                </List>
              )}

              {success && <Alert severity="success" sx={{ mt: 2 }}>{success}</Alert>}

              <Box sx={{ mt: 3, display: "flex", gap: 2 }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => navigate(`/add-medicine/${id}/${doctorId}`)}
                >
                  Add Medicine
                </Button>
                <Button variant="outlined" color="error" onClick={handleDeletePatient}>
                  Delete Patient
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Container>
      </Box>
    </Box>
  );
}

export default PatientDetails;

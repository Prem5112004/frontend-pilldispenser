import React, { useState, useEffect } from "react";
import {
  Box, Card, CardContent, Typography, Button, Grid, Avatar, CircularProgress,
  List, ListItem, ListItemText, Divider, Stack
} from "@mui/material";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import GroupIcon from "@mui/icons-material/Group";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import ListAltIcon from "@mui/icons-material/ListAlt";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function Dashboard() {
  const { doctorId: paramDoctorId } = useParams();
  const doctorId = paramDoctorId || localStorage.getItem("doctorId");
  const [doctor, setDoctor] = useState(null);
  const [patients, setPatients] = useState([]);
  const [log, setLog] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
  async function fetchAll() {
    try {
      const docRes = await axios.get(`http://localhost:5000/api/doctor/${doctorId}`);
      setDoctor(docRes.data);
      const patRes = await axios.get(`http://localhost:5000/api/patients/${doctorId}`);
      setPatients(patRes.data);

      // Fetch activity logs dynamically
      const logRes = await axios.get(`http://localhost:5000/api/activity-log/${doctorId}`);
      // Assume logRes.data is an array of { message, timestamp }
      const logsWithFormattedTime = logRes.data.map(entry => ({
        message: entry.message,
        time: new Date(entry.timestamp).toLocaleString()
      }));
      setLog(logsWithFormattedTime);
    } catch {
      setDoctor(null);
      setPatients([]);
      setLog([]);
    } finally {
      setLoading(false);
    }
  }
  if (doctorId) fetchAll();
}, [doctorId]);


  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#f4f7fb" }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
        <Navbar />
        <Box sx={{ flexGrow: 1, p: { xs: 2, md: 4 } }}>
          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}><CircularProgress /></Box>
          ) : (
            <Stack spacing={3}>
              <Grid container spacing={3}>
                {/* My Patients Widget */}
                <Grid item xs={12} md={5}>
                  <Card sx={{ minHeight: 190 }}>
                    <CardContent sx={{ display: "flex", alignItems: "center", height: "100%" }}>
                      <Avatar sx={{ bgcolor: "primary.main", mr: 3, width: 68, height: 68 }}>
                        <GroupIcon sx={{ fontSize: 38 }} />
                      </Avatar>
                      <Box>
                        <Typography fontWeight="bold" fontSize={24}>My Patients</Typography>
                        <Typography variant="h2" color="primary" fontWeight="bold">{patients.length}</Typography>
                        <Button
                          variant="outlined"
                          size="large"
                          sx={{ mt: 2, fontSize: 18 }}
                          onClick={() => navigate(`/patients/${doctorId}`)}
                        >
                          View All Patients
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
                {/* Add Patient Widget */}
                <Grid item xs={12} md={5}>
                  <Card sx={{ minHeight: 190 }}>
                    <CardContent sx={{ display: "flex", alignItems: "center", height: "100%" }}>
                      <Avatar sx={{ bgcolor: "secondary.main", mr: 3, width: 68, height: 68 }}>
                        <NoteAddIcon sx={{ fontSize: 38 }} />
                      </Avatar>
                      <Box>
                        <Typography fontWeight="bold" fontSize={24}>Add Patient</Typography>
                        <Button
                          variant="contained"
                          color="secondary"
                          size="large"
                          sx={{ mt: 4, fontSize: 18 }}
                          onClick={() => navigate(`/add-patient/${doctorId}`)}
                        >
                          Add New Patient
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
                {/* Doctor Profile Widget */}
                <Grid item xs={12} md={2}>
                  <Card sx={{ minHeight: 190 }}>
                    <CardContent sx={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}>
                      <Avatar sx={{ bgcolor: "primary.main", mr: 1, width: 52, height: 52 }}>
                        <LocalHospitalIcon />
                      </Avatar>
                      <Box>
                        <Typography variant="subtitle1" fontWeight="bold">{doctor?.name}</Typography>
                        <Typography color="text.secondary" variant="body2">
                          {doctor?.specialty}
                        </Typography>
                        <Typography color="text.secondary" variant="body2">
                          {doctor?.phoneno}
                        </Typography>
                        <Typography color="text.secondary" variant="body2">
                          <span style={{ fontFamily: "monospace" }}>{doctorId}</span>
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
              {/* Patient Log */}
              <Box sx={{
                bgcolor: "#fff", borderRadius: 2, boxShadow: 2, px: 3, py: 2.5,
                width: "100%", mt: 1
              }}>
                <Typography variant="h6" fontWeight="bold" sx={{ mb: 2, display: "flex", alignItems: "center" }}>
                  <ListAltIcon color="primary" sx={{ mr: 1 }} /> Recent Patient Log
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <List dense sx={{ width: "100%", maxHeight: 220, overflowY: "auto" }}>
                  {log.length === 0 && <ListItem><ListItemText primary="No recent activity." /></ListItem>}
                  {log.map((entry, i) => (
                    <ListItem key={i} disableGutters>
                      <ListItemText
                        primary={<span style={{ fontWeight: 600 }}>{entry.message}</span>}
                        secondary={entry.time}
                        primaryTypographyProps={{ fontSize: 18 }}
                        secondaryTypographyProps={{ fontSize: 14, color: "text.secondary" }}
                      />
                    </ListItem>
                  ))}
                </List>
              </Box>
            </Stack>
          )}
        </Box>
      </Box>
    </Box>
  );
}
export default Dashboard;

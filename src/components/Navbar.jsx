import React, { useEffect, useState } from "react";
import {
  AppBar, Toolbar, Typography, Box, Avatar, IconButton, Menu, MenuItem
} from "@mui/material";
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

function Navbar() {
  const { doctorId: paramDoctorId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  let doctorId = paramDoctorId || localStorage.getItem("doctorId");
  useEffect(() => {
    if (!doctorId || doctorId === "undefined") {
      setDoctor(null);
      return;
    }
    const fetchDoctor = async () => {
      try {
        const res = await axios.get(`https://pilldispenser.onrender.com/api/doctor/${doctorId}`);
        setDoctor(res.data);
      } catch{
        setDoctor(null);
      }
    };
    fetchDoctor();
  }, [doctorId, location.pathname]);

  const handleMenu = (e) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const logout = () => {
    localStorage.removeItem("doctorId");
    handleClose();
    navigate("/");
  };

  return (
    <AppBar position="static" sx={{ bgcolor: "#1565C0" }} elevation={2}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <LocalHospitalIcon sx={{ mr: 1, fontSize: 32 }} />
          <Typography variant="h6" fontWeight="bold">MediTrack</Typography>
        </Box>
        {doctor ? (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography sx={{ mr: 2 }}>
              Welcome, <b>{doctor.name || doctor.id}</b>
            </Typography>
            <IconButton onClick={handleMenu}>
              <Avatar sx={{ bgcolor: "#f50057" }}>
                {(doctor.name || doctor.id)[0] || "D"}
              </Avatar>
            </IconButton>
            <Menu anchorEl={anchorEl} open={!!anchorEl} onClose={handleClose}>
              <MenuItem onClick={logout}>Logout</MenuItem>
            </Menu>
          </Box>
        ) : (
          <Typography>Doctor Portal</Typography>
        )}
      </Toolbar>
    </AppBar>
  );
}
export default Navbar;

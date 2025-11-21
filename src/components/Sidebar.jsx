import React, { useState } from "react";
import {
  Drawer, List, ListItemButton, ListItemIcon, ListItemText, Toolbar, Box, IconButton, Divider, Tooltip
} from "@mui/material";
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate, useParams } from "react-router-dom";

const drawerWidth = 220;
const collapsedWidth = 64;

function Sidebar() {
  const { doctorId } = useParams();
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);

  const menuItems = [
    { text: "Dashboard", icon: <DashboardIcon />, path: `/dashboard/${doctorId}` },
    { text: "My Patients", icon: <PeopleIcon />, path: `/patients/${doctorId}` },
    { text: "Add Patient", icon: <PersonAddIcon />, path: `/add-patient/${doctorId}` },
    { text: "Logout", icon: <LogoutIcon />, path: "/", action: () => navigate("/") },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: open ? drawerWidth : collapsedWidth,
        transition: "width 0.3s",
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: open ? drawerWidth : collapsedWidth,
          transition: "width 0.3s",
          boxSizing: "border-box",
          bgcolor: "#F5F7FA"
        }
      }}
    >
      <Toolbar sx={{ justifyContent: open ? "flex-end" : "center" }}>
        <IconButton onClick={() => setOpen(!open)}>
          {open ? <MenuOpenIcon /> : <MenuIcon />}
        </IconButton>
      </Toolbar>
      <Divider />
      <Box sx={{ overflow: "auto" }}>
        <List>
          {menuItems.map((item) => (
            <Tooltip title={open ? "" : item.text} placement="right" key={item.text}>
              <ListItemButton
                onClick={item.action ? item.action : () => navigate(item.path)}
                sx={{
                  transition: "background 0.2s, padding 0.2s",
                  "&:hover": { bgcolor: "primary.light", pl: open ? 3 : 2 }
                }}
              >
                <ListItemIcon
                  sx={{ color: "primary.main", minWidth: 0, mr: open ? 2 : "auto", justifyContent: "center" }}
                >
                  {item.icon}
                </ListItemIcon>
                {open && (
                  <ListItemText
                    primary={item.text}
                    primaryTypographyProps={{ fontWeight: item.text === "Logout" ? "bold" : "medium" }}
                  />
                )}
              </ListItemButton>
            </Tooltip>
          ))}
        </List>
      </Box>
    </Drawer>
  );
}

export default Sidebar;

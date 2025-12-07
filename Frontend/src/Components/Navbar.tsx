// Navbar.tsx - Responsive navigation bar with mobile drawer
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Box,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { useAuth } from '../Contexts/useAuth';

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  // Check if screen is mobile size (below 'md' breakpoint)
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logoutUser } = useAuth();

  // Toggle mobile drawer open/closed
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // Navigation items configuration
  const navItems = user
    ? [
        { label: 'Tasks', path: '/tasks' },
        { label: 'Logout', action: logoutUser },
      ]
    : [
        { label: 'Home', path: '/' },
        { label: 'Login', path: '/login' },
        { label: 'Register', path: '/register' },
      ];

  // Mobile drawer content
  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Task Manager
      </Typography>
      <List>
        {navItems.map((item) => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton
              sx={{ textAlign: 'center' }}
              onClick={() => {
                if (item.action) {
                  item.action();
                } else if (item.path) {
                  navigate(item.path);
                }
              }}
            >
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="static" elevation={2}>
        <Toolbar>
          {/* Mobile menu icon - only shows on small screens */}
          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}

          {/* App logo and title */}
          <AssignmentIcon sx={{ mr: 1 }} />
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}
          >
            Task Manager
          </Typography>

          {/* Desktop navigation buttons - hidden on mobile */}
          {!isMobile && (
            <Box sx={{ display: 'flex', gap: 1 }}>
              {navItems.map((item) => (
                <Button
                  key={item.label}
                  color="inherit"
                  onClick={() => {
                    if (item.action) {
                      item.action();
                    } else if (item.path) {
                      navigate(item.path);
                    }
                  }}
                  // Highlight active route
                  sx={{
                    bgcolor:
                      location.pathname === item.path
                        ? 'rgba(255,255,255,0.1)'
                        : 'transparent',
                  }}
                >
                  {item.label}
                </Button>
              ))}
            </Box>
          )}
        </Toolbar>
      </AppBar>

      {/* Mobile drawer - slides in from left */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better performance on mobile
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
}
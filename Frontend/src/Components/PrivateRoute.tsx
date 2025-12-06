// PrivateRoute.tsx - Protected route component with styled loading
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../Contexts/useAuth';
import { Box, CircularProgress, Typography } from '@mui/material';

type PrivateRouteProps = {
  children: React.ReactNode;
};

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { user, loading } = useAuth();

  // Show centered loading spinner while checking authentication
  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          gap: 2,
        }}
      >
        <CircularProgress size={60} />
        <Typography variant="h6" color="text.secondary">
          Loading...
        </Typography>
      </Box>
    );
  }

  // If authenticated, render children; otherwise redirect to login
  if (user) {
    return <>{children}</>;
  } else {
    return <Navigate to="/login" replace />;
  }
};

export default PrivateRoute;
// Home.tsx - Landing page with hero section (Fixed alignment)
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Stack,
} from '@mui/material';
import {
  CheckCircleOutline,
  Schedule,
  Category,
  TrendingUp,
} from '@mui/icons-material';
import { Navbar } from '../Components/Navbar';

export function Home() {
  const navigate = useNavigate();

  // Feature cards data
  const features = [
    {
      icon: <CheckCircleOutline sx={{ fontSize: 40 }} />,
      title: 'Task Management',
      description: 'Create, edit, and organize your tasks efficiently',
    },
    {
      icon: <Schedule sx={{ fontSize: 40 }} />,
      title: 'Due Date Tracking',
      description: 'Never miss a deadline with due date reminders',
    },
    {
      icon: <Category sx={{ fontSize: 40 }} />,
      title: 'Categories',
      description: 'Organize tasks by categories for better management',
    },
    {
      icon: <TrendingUp sx={{ fontSize: 40 }} />,
      title: 'Progress Tracking',
      description: 'Monitor your productivity and task completion',
    },
  ];

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <Navbar />
      
      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
          py: { xs: 8, md: 12 },
          textAlign: 'center',
        }}
      >
        <Container maxWidth="md">
          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            sx={{ fontWeight: 700, fontSize: { xs: '2.5rem', md: '3.5rem' } }}
          >
            Stay Organized, Stay Productive
          </Typography>
          <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
            Manage your tasks efficiently with our intuitive task management system
          </Typography>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            justifyContent="center"
          >
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate('/register')}
              sx={{
                bgcolor: 'white',
                color: 'primary.main',
                '&:hover': { bgcolor: 'grey.100' },
              }}
            >
              Get Started
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate('/login')}
              sx={{
                borderColor: 'white',
                color: 'white',
                '&:hover': { borderColor: 'white', bgcolor: 'rgba(255,255,255,0.1)' },
              }}
            >
              Sign In
            </Button>
          </Stack>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography
          variant="h4"
          component="h2"
          textAlign="center"
          gutterBottom
          sx={{ mb: 6, fontWeight: 600 }}
        >
          Why Choose Task Manager?
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={6} lg={3} key={index}>
              <Card
                sx={{
                  height: '100%',
                  textAlign: 'center',
                  transition: 'transform 0.2s',
                  '&:hover': { transform: 'translateY(-8px)' },
                  display: 'flex',
                  flexDirection: 'column',
                }}
                elevation={2}
              >
                <CardContent sx={{ p: 3, flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                  <Box sx={{ color: 'primary.main', mb: 2 }}>{feature.icon}</Box>
                  <Typography variant="h6" gutterBottom fontWeight={600}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
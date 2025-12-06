// Register.tsx - Material UI styled registration page with validation (Centered)
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Alert,
  Container,
  InputAdornment,
  IconButton,
  LinearProgress,
} from '@mui/material';
import { Visibility, VisibilityOff, PersonAdd } from '@mui/icons-material';
import { registerUser } from '../api/loginapi';
import { Navbar } from '../Components/Navbar';

export function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errors, setErrors] = useState({
    username: '',
    password: '',
    confirm: '',
  });
  const [serverError, setServerError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  // Validation functions
  const validateUsername = (value: string) => {
    if (!value) return 'Username is required';
    if (value !== value.toLowerCase()) return 'Username should be all lowercase';
    if (value.length < 3) return 'Username must be at least 3 characters';
    return '';
  };

  const validatePassword = (value: string) => {
    if (!value) return 'Password is required';
    if (value.length < 6) return 'Password must contain at least 6 characters';
    if (!/\d/.test(value)) return 'Password must contain at least one number';
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(value))
      return 'Password must contain at least one special character';
    return '';
  };

  const validateConfirm = (pwd: string, conf: string) => {
    if (!conf) return 'Please confirm your password';
    if (pwd !== conf) return 'Passwords do not match';
    return '';
  };

  // Handle input changes with real-time validation
  const onUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    setUsername(v);
    setErrors((prev) => ({ ...prev, username: validateUsername(v) }));
    setServerError('');
  };

  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    setPassword(v);
    setErrors((prev) => ({
      ...prev,
      password: validatePassword(v),
      confirm: validateConfirm(v, confirm),
    }));
    setServerError('');
  };

  const onConfirmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    setConfirm(v);
    setErrors((prev) => ({ ...prev, confirm: validateConfirm(password, v) }));
    setServerError('');
  };

  // Check if form is valid
  const isFormValid =
    !errors.username &&
    !errors.password &&
    !errors.confirm &&
    username &&
    password &&
    confirm;

  // Handle registration
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    // Final validation
    const uerror = validateUsername(username);
    const perror = validatePassword(password);
    const cerror = validateConfirm(password, confirm);
    setErrors({ username: uerror, password: perror, confirm: cerror });
    setServerError('');

    if (uerror || perror || cerror) return;

    setIsSubmitting(true);
    try {
      await registerUser({ username, password });
      setSuccess(true);
      // Navigate to login after 2 seconds
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err: any) {
      setServerError(err.response?.data?.error || 'Registration failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <Navbar />
      <Container maxWidth="sm">
        <Box
          sx={{
            minHeight: 'calc(100vh - 64px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            py: 4,
          }}
        >
          <Card sx={{ width: '100%', maxWidth: 450 }} elevation={3}>
            <CardContent sx={{ p: 4 }}>
              {/* Header */}
              <Box sx={{ textAlign: 'center', mb: 3 }}>
                <PersonAdd sx={{ fontSize: 48, color: 'primary.main', mb: 1 }} />
                <Typography variant="h4" component="h1" gutterBottom>
                  Create Account
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Sign up to start managing your tasks
                </Typography>
              </Box>

              {/* Success Message */}
              {success && (
                <Alert severity="success" sx={{ mb: 2 }}>
                  Registration successful! Redirecting to login...
                </Alert>
              )}

              {/* Server Error */}
              {serverError && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {serverError}
                </Alert>
              )}

              {/* Registration Form */}
              <form onSubmit={handleRegister}>
                <TextField
                  label="Username"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={username}
                  onChange={onUsernameChange}
                  error={!!errors.username}
                  helperText={errors.username}
                  required
                  autoComplete="username"
                />

                <TextField
                  label="Password"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={onPasswordChange}
                  error={!!errors.password}
                  helperText={errors.password}
                  required
                  autoComplete="new-password"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                <TextField
                  label="Confirm Password"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  type={showConfirm ? 'text' : 'password'}
                  value={confirm}
                  onChange={onConfirmChange}
                  error={!!errors.confirm}
                  helperText={errors.confirm}
                  required
                  autoComplete="new-password"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowConfirm(!showConfirm)}
                          edge="end"
                        >
                          {showConfirm ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                {isSubmitting && <LinearProgress sx={{ mt: 2 }} />}

                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  size="large"
                  disabled={!isFormValid || isSubmitting}
                  sx={{ mt: 3, mb: 2 }}
                >
                  {isSubmitting ? 'Creating Account...' : 'Create Account'}
                </Button>
              </form>

              {/* Login Link */}
              <Box sx={{ textAlign: 'center', mt: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Already have an account?{' '}
                  <Link
                    to="/login"
                    style={{
                      color: '#1976d2',
                      textDecoration: 'none',
                      fontWeight: 600,
                    }}
                  >
                    Sign in here
                  </Link>
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Container>
    </Box>
  );
}
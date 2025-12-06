// App.tsx - Main app component with Material-UI theme provider
import { Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Home } from './Pages/Home';
import { Login } from './Pages/Login';
import { Register } from './Pages/Register';
import { Tasks } from './Pages/Tasks';
import { AuthProvider } from './Contexts/useAuth';
import PrivateRoute from './Components/PrivateRoute';
import { theme } from './theme';

function App() {
  return (
    // ThemeProvider applies Material-UI theme to entire app
    <ThemeProvider theme={theme}>
      {/* CssBaseline normalizes styles across browsers */}
      <CssBaseline />
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* PrivateRoute protects Tasks page - requires authentication */}
          <Route
            path="/tasks"
            element={
              <PrivateRoute>
                <Tasks />
              </PrivateRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
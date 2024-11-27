import {
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Avatar,
  Box,
} from '@mui/material';
import { AdminPanelSettings, School, Person } from '@mui/icons-material';
import { useDemo, demoUsers } from '../../contexts/DemoContext';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

interface DemoUserSelectorProps {
  open: boolean;
  onClose: () => void;
}

const DemoUserSelector = ({ open, onClose }: DemoUserSelectorProps) => {
  const { setIsDemoMode, setDemoUser } = useDemo();
  const { login } = useAuth();
  const navigate = useNavigate();

  const getIcon = (role: string) => {
    switch (role) {
      case 'admin':
        return <AdminPanelSettings sx={{ fontSize: 40 }} />;
      case 'school':
        return <School sx={{ fontSize: 40 }} />;
      default:
        return <Person sx={{ fontSize: 40 }} />;
    }
  };

  const handleSelectUser = async (user: typeof demoUsers[0]) => {
    try {
      setIsDemoMode(true);
      setDemoUser(user);
      // Simulate login
      await login(user.email, 'demo-password');
      
      // Navigate based on role
      switch (user.role) {
        case 'admin':
          navigate('/admin');
          break;
        case 'educator':
        case 'school':
          navigate('/app');
          break;
      }
      onClose();
    } catch (error) {
      console.error('Demo login failed:', error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Typography variant="h4" align="center" gutterBottom>
          Select a Demo User
        </Typography>
        <Typography variant="body1" align="center" color="text.secondary">
          Experience THE PASS from different perspectives
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={3} sx={{ mt: 1 }}>
          {demoUsers.map((user) => (
            <Grid item xs={12} md={4} key={user.id}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  cursor: 'pointer',
                  '&:hover': {
                    boxShadow: 6,
                  },
                }}
                onClick={() => handleSelectUser(user)}
              >
                <CardContent>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      mb: 2,
                    }}
                  >
                    <Avatar
                      sx={{
                        width: 80,
                        height: 80,
                        mb: 2,
                        bgcolor: 'primary.main',
                      }}
                    >
                      {getIcon(user.role)}
                    </Avatar>
                    <Typography variant="h6" gutterBottom>
                      {user.name}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      color="primary"
                      gutterBottom
                      sx={{ textTransform: 'capitalize' }}
                    >
                      {user.role}
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {user.description}
                  </Typography>
                  <Button
                    variant="contained"
                    fullWidth
                    sx={{ mt: 2 }}
                    onClick={() => handleSelectUser(user)}
                  >
                    Try {user.role} Demo
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default DemoUserSelector;

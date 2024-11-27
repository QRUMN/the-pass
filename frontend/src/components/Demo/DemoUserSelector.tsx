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
        return <AdminPanelSettings sx={{ fontSize: 40, color: 'custom.darkRed' }} />;
      case 'school':
        return <School sx={{ fontSize: 40, color: 'custom.darkRed' }} />;
      default:
        return <Person sx={{ fontSize: 40, color: 'custom.darkRed' }} />;
    }
  };

  const handleSelectUser = async (user: typeof demoUsers[0]) => {
    try {
      setIsDemoMode(true);
      setDemoUser(user);
      await login(user.email, 'demo-password');
      
      switch (user.role) {
        case 'admin':
          navigate('/admin');
          break;
        case 'educator':
          navigate('/dashboard');
          break;
        case 'school':
          navigate('/school');
          break;
      }
    } catch (error) {
      console.error('Demo login failed:', error);
    }
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          bgcolor: 'background.default',
          borderRadius: 2,
        },
      }}
    >
      <DialogTitle sx={{ 
        textAlign: 'center', 
        color: 'custom.darkGray',
        fontSize: '1.75rem',
        fontWeight: 600,
        pt: 4,
      }}>
        Select a Demo User
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={3} sx={{ mt: 1, pb: 4 }}>
          {demoUsers.map((user) => (
            <Grid item xs={12} md={4} key={user.id}>
              <Card
                sx={{
                  height: '100%',
                  cursor: 'pointer',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                  },
                  bgcolor: 'background.paper',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                }}
                onClick={() => handleSelectUser(user)}
              >
                <CardContent sx={{ textAlign: 'center' }}>
                  <Avatar
                    sx={{
                      width: 64,
                      height: 64,
                      margin: '0 auto 16px',
                      bgcolor: 'custom.darkRed',
                    }}
                  >
                    {getIcon(user.role)}
                  </Avatar>
                  <Typography
                    variant="h6"
                    sx={{
                      mb: 1,
                      color: 'custom.darkGray',
                      fontWeight: 600,
                    }}
                  >
                    {user.firstName} {user.lastName}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      mb: 2,
                      color: 'custom.darkRed',
                      fontWeight: 500,
                    }}
                  >
                    {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: 'custom.darkGray',
                      opacity: 0.8,
                    }}
                  >
                    {user.description}
                  </Typography>
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

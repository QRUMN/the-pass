import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
} from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { School, Work, People, Speed } from '@mui/icons-material';
import DemoUserSelector from '../components/Demo/DemoUserSelector';

const LandingPage = () => {
  const navigate = useNavigate();
  const [isDemoOpen, setIsDemoOpen] = useState(false);

  const features = [
    {
      icon: <School sx={{ fontSize: 40, color: 'custom.darkRed' }} />,
      title: 'For Educators',
      description: 'Find your next teaching opportunity with ease. Browse positions that match your qualifications and preferences.',
    },
    {
      icon: <Work sx={{ fontSize: 40, color: 'custom.darkRed' }} />,
      title: 'For Schools',
      description: 'Connect with qualified educators quickly. Post positions and find the perfect candidate for your institution.',
    },
    {
      icon: <Speed sx={{ fontSize: 40, color: 'custom.darkRed' }} />,
      title: 'Fast & Efficient',
      description: 'Our matching algorithm helps you find the right fit faster, saving time and resources.',
    },
    {
      icon: <People sx={{ fontSize: 40, color: 'custom.darkRed' }} />,
      title: 'Community',
      description: 'Join a growing community of education professionals and institutions.',
    },
  ];

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: 'custom.darkRed',
          color: 'custom.offWhite',
          py: 12,
          mb: 8,
          textAlign: 'center',
        }}
      >
        <Container maxWidth="md">
          <Typography
            variant="h1"
            sx={{
              mb: 4,
              color: 'custom.offWhite',
              fontWeight: 700,
              fontSize: { xs: '2.5rem', md: '3.5rem' },
            }}
          >
            Welcome to THE PASS
          </Typography>
          <Typography
            variant="h5"
            sx={{
              mb: 6,
              color: 'custom.offWhite',
              opacity: 0.9,
              fontSize: { xs: '1.1rem', md: '1.3rem' },
            }}
          >
            Connecting Educators with Schools - Building Future Together
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
            <Button
              variant="contained"
              size="large"
              sx={{
                bgcolor: 'custom.offWhite',
                color: 'custom.darkRed',
                '&:hover': {
                  bgcolor: 'custom.lightGray',
                },
              }}
              onClick={() => navigate('/register')}
            >
              Get Started
            </Button>
            <Button
              variant="outlined"
              size="large"
              sx={{
                borderColor: 'custom.offWhite',
                color: 'custom.offWhite',
                '&:hover': {
                  borderColor: 'custom.lightGray',
                  color: 'custom.lightGray',
                },
              }}
              onClick={() => setIsDemoOpen(true)}
            >
              Try Demo
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Typography
          variant="h2"
          sx={{
            mb: 6,
            textAlign: 'center',
            color: 'custom.darkGray',
          }}
        >
          Why Choose THE PASS?
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  bgcolor: 'background.paper',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                  },
                }}
              >
                <CardContent sx={{ textAlign: 'center', flexGrow: 1 }}>
                  <Box sx={{ mb: 2 }}>{feature.icon}</Box>
                  <Typography
                    variant="h6"
                    sx={{ mb: 2, color: 'custom.darkGray' }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ color: 'custom.darkGray' }}
                  >
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      <DemoUserSelector open={isDemoOpen} onClose={() => setIsDemoOpen(false)} />
    </Box>
  );
};

export default LandingPage;

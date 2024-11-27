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
      icon: <School sx={{ fontSize: 40 }} />,
      title: 'For Educators',
      description: 'Find your next teaching opportunity with ease. Browse positions that match your qualifications and preferences.',
    },
    {
      icon: <Work sx={{ fontSize: 40 }} />,
      title: 'For Schools',
      description: 'Connect with qualified educators quickly. Post positions and find the perfect candidate for your institution.',
    },
    {
      icon: <Speed sx={{ fontSize: 40 }} />,
      title: 'Fast & Efficient',
      description: 'Our matching algorithm helps you find the right fit faster, saving time and resources.',
    },
    {
      icon: <People sx={{ fontSize: 40 }} />,
      title: 'Community',
      description: 'Join a growing community of education professionals and institutions.',
    },
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
          py: 8,
          mb: 6,
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography
                variant="h2"
                component="h1"
                gutterBottom
                sx={{ fontWeight: 'bold' }}
              >
                Welcome to THE PASS
              </Typography>
              <Typography variant="h5" paragraph>
                Connecting Educational Professionals with Schools
              </Typography>
              <Box sx={{ mt: 4 }}>
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  onClick={() => navigate('/register')}
                  sx={{ mr: 2 }}
                >
                  Get Started
                </Button>
                <Button
                  variant="outlined"
                  color="inherit"
                  size="large"
                  onClick={() => navigate('/login')}
                  sx={{ mr: 2 }}
                >
                  Sign In
                </Button>
                <Button
                  variant="outlined"
                  color="inherit"
                  size="large"
                  onClick={() => setIsDemoOpen(true)}
                >
                  Try Demo
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              {/* Add hero image here */}
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Typography
          variant="h3"
          component="h2"
          align="center"
          gutterBottom
          sx={{ mb: 6 }}
        >
          Why Choose THE PASS?
        </Typography>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  p: 2,
                }}
              >
                <Box
                  sx={{
                    color: 'primary.main',
                    mb: 2,
                    mt: 2,
                  }}
                >
                  {feature.icon}
                </Box>
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="h3"
                    sx={{ mb: 2 }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Call to Action */}
      <Box sx={{ bgcolor: 'secondary.main', color: 'white', py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h4" align="center" gutterBottom>
            Ready to Transform Your Educational Journey?
          </Typography>
          <Typography variant="h6" align="center" paragraph>
            Join THE PASS today and connect with opportunities that matter.
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, gap: 2 }}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={() => navigate('/register')}
              sx={{
                bgcolor: 'white',
                color: 'secondary.main',
                '&:hover': {
                  bgcolor: 'grey.100',
                },
              }}
            >
              Get Started Now
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={() => setIsDemoOpen(true)}
              sx={{
                color: 'white',
                borderColor: 'white',
                '&:hover': {
                  borderColor: 'grey.100',
                  bgcolor: 'rgba(255, 255, 255, 0.1)',
                },
              }}
            >
              Try Demo
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Demo User Selector Dialog */}
      <DemoUserSelector open={isDemoOpen} onClose={() => setIsDemoOpen(false)} />
    </Box>
  );
};

export default LandingPage;

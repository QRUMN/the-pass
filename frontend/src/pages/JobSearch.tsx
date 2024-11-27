import {
  Container,
  Typography,
  Grid,
  Paper,
  TextField,
  Button,
  Card,
  CardContent,
  CardActions,
  Box,
} from '@mui/material';
import { Work } from '@mui/icons-material';
import { useState } from 'react';

const mockJobs = [
  {
    id: 1,
    title: 'Math Teacher',
    school: 'Springfield Elementary',
    location: 'Springfield, IL',
    type: 'Full-time',
    description: 'Looking for an experienced math teacher for grades 6-8.',
  },
  {
    id: 2,
    title: 'Science Teacher',
    school: 'Central High School',
    location: 'Central City, IL',
    type: 'Full-time',
    description: 'Seeking a passionate science teacher for high school students.',
  },
  {
    id: 3,
    title: 'Art Teacher',
    school: 'Creative Arts Academy',
    location: 'Artville, IL',
    type: 'Part-time',
    description: 'Part-time art teacher needed for after-school programs.',
  },
];

const JobSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search functionality
    console.log('Searching for:', searchTerm);
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" component="h1" gutterBottom>
        Find Your Next Teaching Opportunity
      </Typography>

      <Paper
        component="form"
        onSubmit={handleSearch}
        sx={{ p: 2, mb: 4 }}
      >
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={8}>
            <TextField
              fullWidth
              label="Search jobs"
              variant="outlined"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by title, subject, or location"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Button
              fullWidth
              variant="contained"
              type="submit"
              size="large"
            >
              Search Jobs
            </Button>
          </Grid>
        </Grid>
      </Paper>

      <Grid container spacing={3}>
        {mockJobs.map((job) => (
          <Grid item xs={12} key={job.id}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Work sx={{ mr: 1 }} />
                  <Typography variant="h6" component="h2">
                    {job.title}
                  </Typography>
                </Box>
                <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                  {job.school} • {job.location}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {job.type}
                </Typography>
                <Typography variant="body1">
                  {job.description}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" color="primary">
                  Learn More
                </Button>
                <Button size="small" color="primary">
                  Apply Now
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default JobSearch;

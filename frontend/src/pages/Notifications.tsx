import { Container, Typography, Paper } from '@mui/material';

const Notifications = () => {
  return (
    <Container maxWidth="lg">
      <Typography variant="h4" component="h1" gutterBottom>
        Notifications
      </Typography>
      <Paper sx={{ p: 3 }}>
        <Typography variant="body1">
          Notification functionality coming soon...
        </Typography>
      </Paper>
    </Container>
  );
};

export default Notifications;

import { Container, Typography, Paper } from '@mui/material';

const Messages = () => {
  return (
    <Container maxWidth="lg">
      <Typography variant="h4" component="h1" gutterBottom>
        Messages
      </Typography>
      <Paper sx={{ p: 3 }}>
        <Typography variant="body1">
          Message functionality coming soon...
        </Typography>
      </Paper>
    </Container>
  );
};

export default Messages;

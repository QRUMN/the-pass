import {
  Container,
  Typography,
  Paper,
  Grid,
  Switch,
  FormControlLabel,
  TextField,
  Button,
  Box,
} from '@mui/material';
import { useState } from 'react';

const SystemSettings = () => {
  const [settings, setSettings] = useState({
    enableRegistration: true,
    enableNotifications: true,
    maintenanceMode: false,
    systemEmail: 'system@thepass.com',
    maxJobPostings: '100',
    retentionDays: '30',
  });

  const handleToggle = (setting: string) => {
    setSettings((prev) => ({
      ...prev,
      [setting]: !prev[setting as keyof typeof prev],
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSettings((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    // Implement save functionality
    console.log('Saving settings:', settings);
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" sx={{ mb: 4 }}>
        System Settings
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              General Settings
            </Typography>
            <FormControlLabel
              control={
                <Switch
                  checked={settings.enableRegistration}
                  onChange={() => handleToggle('enableRegistration')}
                />
              }
              label="Enable User Registration"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={settings.enableNotifications}
                  onChange={() => handleToggle('enableNotifications')}
                />
              }
              label="Enable System Notifications"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={settings.maintenanceMode}
                  onChange={() => handleToggle('maintenanceMode')}
                />
              }
              label="Maintenance Mode"
            />
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Email Settings
            </Typography>
            <TextField
              fullWidth
              label="System Email"
              name="systemEmail"
              value={settings.systemEmail}
              onChange={handleChange}
              margin="normal"
            />
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              System Limits
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Maximum Job Postings per School"
                  name="maxJobPostings"
                  type="number"
                  value={settings.maxJobPostings}
                  onChange={handleChange}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Data Retention (days)"
                  name="retentionDays"
                  type="number"
                  value={settings.retentionDays}
                  onChange={handleChange}
                  margin="normal"
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>

      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSave}
          size="large"
        >
          Save Changes
        </Button>
      </Box>
    </Container>
  );
};

export default SystemSettings;

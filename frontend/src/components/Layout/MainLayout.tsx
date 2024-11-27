import React, { useState } from 'react';
import {
  AppBar,
  Box,
  CssBaseline,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
  Avatar,
  Menu,
  MenuItem,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard,
  Work,
  Person,
  Message,
  Notifications,
  Settings,
  AdminPanelSettings,
  School,
  People,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const drawerWidth = 240;

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const getMenuItems = () => {
    const commonItems = [
      { text: 'Profile', icon: <Person />, path: '/profile' },
      { text: 'Messages', icon: <Message />, path: '/messages' },
      { text: 'Notifications', icon: <Notifications />, path: '/notifications' },
    ];

    switch (user?.role) {
      case 'admin':
        return [
          { text: 'Dashboard', icon: <Dashboard />, path: '/admin' },
          { text: 'User Management', icon: <People />, path: '/admin/users' },
          { text: 'System Settings', icon: <Settings />, path: '/admin/settings' },
          ...commonItems,
        ];
      case 'educator':
        return [
          { text: 'Dashboard', icon: <Dashboard />, path: '/dashboard' },
          { text: 'Job Search', icon: <Work />, path: '/jobs' },
          ...commonItems,
        ];
      case 'school':
        return [
          { text: 'Dashboard', icon: <Dashboard />, path: '/school' },
          { text: 'Post Jobs', icon: <Work />, path: '/school/jobs' },
          { text: 'Candidates', icon: <People />, path: '/school/candidates' },
          ...commonItems,
        ];
      default:
        return commonItems;
    }
  };

  const drawer = (
    <Box sx={{ bgcolor: 'background.default', height: '100%' }}>
      <Toolbar 
        sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          py: 2,
          borderBottom: 1,
          borderColor: 'custom.lightGray'
        }}
      >
        <Typography 
          variant="h6" 
          sx={{ 
            color: 'custom.darkRed',
            fontWeight: 'bold',
            letterSpacing: 1
          }}
        >
          THE PASS
        </Typography>
      </Toolbar>
      <List sx={{ mt: 2 }}>
        {getMenuItems().map((item) => (
          <ListItemButton
            key={item.text}
            onClick={() => {
              navigate(item.path);
              if (isMobile) {
                setMobileOpen(false);
              }
            }}
            sx={{
              mx: 1,
              borderRadius: 1,
              mb: 0.5,
              '&:hover': {
                bgcolor: 'custom.lightGray',
              },
              '&.Mui-selected': {
                bgcolor: 'custom.darkRed',
                color: 'custom.offWhite',
                '&:hover': {
                  bgcolor: 'custom.darkRed',
                },
                '& .MuiListItemIcon-root': {
                  color: 'custom.offWhite',
                },
              },
            }}
            selected={window.location.pathname === item.path}
          >
            <ListItemIcon sx={{ 
              color: window.location.pathname === item.path ? 'custom.offWhite' : 'custom.darkRed',
              minWidth: 40 
            }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText 
              primary={item.text} 
              sx={{
                '& .MuiTypography-root': {
                  fontWeight: window.location.pathname === item.path ? 600 : 400,
                },
              }}
            />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );

  const getRoleIcon = () => {
    switch (user?.role) {
      case 'admin':
        return <AdminPanelSettings />;
      case 'school':
        return <School />;
      default:
        return <Person />;
    }
  };

  return (
    <Box sx={{ display: 'flex', bgcolor: 'background.default', minHeight: '100vh' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
          boxShadow: 'none',
          borderBottom: 1,
          borderColor: 'custom.lightGray',
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ color: 'custom.darkGray' }}>
            {user?.firstName} {user?.lastName}
          </Typography>
          <IconButton onClick={handleMenuOpen} sx={{ p: 0 }}>
            <Avatar sx={{ bgcolor: 'custom.darkRed' }}>
              {getRoleIcon()}
            </Avatar>
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            sx={{
              '& .MuiPaper-root': {
                bgcolor: 'background.paper',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
              },
            }}
          >
            <MenuItem 
              onClick={() => {
                handleMenuClose();
                navigate('/profile');
              }}
              sx={{ 
                color: 'custom.darkGray',
                '&:hover': { bgcolor: 'custom.lightGray' }
              }}
            >
              Profile
            </MenuItem>
            <MenuItem 
              onClick={() => {
                handleMenuClose();
                handleLogout();
              }}
              sx={{ 
                color: 'custom.darkRed',
                '&:hover': { bgcolor: 'custom.lightGray' }
              }}
            >
              Logout
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
      >
        <Drawer
          variant={isMobile ? 'temporary' : 'permanent'}
          open={isMobile ? mobileOpen : true}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              borderRight: 1,
              borderColor: 'custom.lightGray',
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { md: `calc(100% - ${drawerWidth}px)` },
          bgcolor: 'background.default',
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};

export default MainLayout;

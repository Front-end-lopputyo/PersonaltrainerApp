import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import Customerlist from './Customerlist';
import Traininglist from './Traininglist';
import Data from './Data';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import PieChartIcon from '@mui/icons-material/PieChart';
import Charts from './Charts';

import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Calendar from './Calendar';



const drawerWidth = 180;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function PersistentDrawerLeft() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Personal Trainer App

          </Typography>
        </Toolbar>
      </AppBar>
      <BrowserRouter>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
            },
          }}
          anchor="left"
          open={open}
        >
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </DrawerHeader>
          <List>
            {['Training', 'Customers', 'Calendar', 'Charts', 'Data'].map((text, index) => (
              <ListItem key={text} disablePadding component={Link} to={"/" + text}>
                <ListItemButton style={{ color: "#1976D2" }}>
                  <ListItemIcon>
                    {index === 0 ? <FitnessCenterIcon /> : index === 1 ? <EmojiPeopleIcon /> : index === 2 ? <CalendarMonthIcon /> : index === 3 ? <PieChartIcon /> :<FileDownloadIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text}/>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Drawer>
        <Routes>
          <Route exact path="/" element={<Traininglist />} />
          <Route path="/training" element={<Traininglist />} />
          <Route path="/customers" element={<Customerlist />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/charts" element={<Charts />} />
          <Route path="/data" element={<Data />} />
        </Routes>
      </BrowserRouter>
      <Main open={open}>
      </Main>
    </Box>
  );
}
import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import DashboardCustomizeTwoToneIcon from '@mui/icons-material/DashboardCustomizeTwoTone';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import Badge from '@mui/material/Badge';
import SearchIcon from '@mui/icons-material/Search';
import "./Sidbar.css"
import { useNavigate } from 'react-router-dom';

const drawerWidth = 240;

function Siderbar() {
    const navigate = useNavigate(); // useNavigate hook for navigation

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    width: `calc(100% - ${drawerWidth}px)`,
                    ml: `${drawerWidth}px`,
                    backgroundColor: '#f1ebf7', // Set the background color here
                    color: 'black'
                }}
            >
                <Toolbar>
                    <Typography noWrap component="div" className='w-100'>

                        <div className="d-flex justify-content-between">
                            <div className="emailsection position-relative d-grid my-2">
                                <input
                                    types='text'
                                    id='ordernumber'
                                    className='rounded inputsection py-1'
                                    placeholder='Enter '
                                    required
                                ></input>
                                <p
                                    className='position-absolute text-end serachicon'
                                >
                                    <SearchIcon className=' serachicon' />
                                </p>
                            </div>
                            <div className="d-flex my-auto">
                                <Badge color="secondary" >
                                    <CircleNotificationsIcon className='my-auto ' />
                                </Badge>
                                <Avatar alt="Cindy Baker" className='mx-4' src="/static/images/avatar/3.jpg" />
                            </div>

                        </div>
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                        background: '#f1ebf7'
                    },
                }}
                variant="permanent"
            >
                {/* LOG */}
                <span className="">
                    <center onClick={() => { /* handle click */ }} className='logss'>
                        <p>Log</p>
                    </center>
                </span>
                <div className='d-flex justify-content-center mx-3 background1 rounded mt-3'>
                    <Stack direction="row">
                        <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                        <p className='my-auto ms-3'>Zakirya</p>
                    </Stack>
                </div>
                <Toolbar />
                {/* Dashbord */}
                <List>
                    {['Dashboard'].map((text, index) => (
                        <ListItem
                            key={text}
                            disablePadding
                            onClick={() => navigate('/')} // Navigate to '/dashboard' when clicked
                        >
                            <ListItemButton>
                                <ListItemIcon>
                                    {index % 2 === 0 ? <DashboardCustomizeTwoToneIcon className="sidebaricon  mx-auto" /> : <DashboardIcon className="sidebaricon" />}
                                </ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                {/* User */}
                <List>
                    {['User'].map((text, index) => (
                        <ListItem key={text} disablePadding onClick={() => navigate('/user')}>
                            <ListItemButton>
                                <ListItemIcon>
                                    {index % 2 === 0 ? <AccountBoxIcon className="sidebaricon my-auto mx-auto" /> : <AccountBoxIcon className="sidebaricon my-auto" />}
                                </ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                {/* Product */}
                <List>
                    {['Product'].map((text, index) => (
                        <ListItem key={text} disablePadding
                            onClick={() => navigate('/product')} // Navigate to '/product' when clicked
                        >
                            <ListItemButton>
                                <ListItemIcon>
                                    {index % 2 === 0 ? <ProductionQuantityLimitsIcon className="sidebaricon my-auto mx-auto" /> : <ProductionQuantityLimitsIcon className="sidebaricon my-auto" />}
                                </ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                {/* Blog */}
                <List>
                    {['Blog'].map((text, index) => (
                        <ListItem key={text} disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    {index % 2 === 0 ? <DashboardCustomizeTwoToneIcon className="sidebaricon my-auto mx-auto" /> : <DashboardIcon className="sidebaricon my-auto" />}
                                </ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
        </Box>
    );
}

export default Siderbar;

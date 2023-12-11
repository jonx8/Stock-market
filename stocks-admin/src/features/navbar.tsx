import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import {useNavigate} from 'react-router-dom';

function Navbar() {
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

    const navigate = useNavigate();

    const openNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const closeNavMenu = () => {
        setAnchorElNav(null);
    };


    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        sx={{
                            mr: 2,
                            display: {xs: 'none', md: 'flex'},
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        Биржа акций
                    </Typography>

                    <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={openNavMenu}
                            color="inherit"
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={closeNavMenu}
                            sx={{
                                display: {xs: 'block', md: 'none'},
                            }}
                        >
                            <MenuItem key={'brokersLink'} onClick={() => {
                                navigate('/brokers');
                                closeNavMenu();
                            }}>
                                <Typography textAlign="center">Брокеры</Typography>
                            </MenuItem>
                            <MenuItem key={'stocksLink'} onClick={() => {
                                navigate('/stocks');
                                closeNavMenu();
                            }}>
                                <Typography textAlign="center">Акции</Typography>
                            </MenuItem>
                            <MenuItem key={'marketLink'} onClick={() => {
                                navigate('/bidding');
                                closeNavMenu();
                            }}>
                                <Typography textAlign="center">Торги</Typography>
                            </MenuItem>

                        </Menu>
                    </Box>
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="#app-bar-with-responsive-menu"
                        sx={{
                            mr: 2,
                            display: {xs: 'flex', md: 'none'},
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        Биржа акций
                    </Typography>
                    <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
                        <Button
                            onClick={() => {
                                navigate('/brokers');
                                closeNavMenu();
                            }}
                            sx={{my: 2, color: 'white', display: 'block'}}
                        >
                            Брокеры
                        </Button>
                        <Button
                            onClick={() => {
                                navigate('/stocks');
                                closeNavMenu();
                            }}
                            sx={{my: 2, color: 'white', display: 'block'}}
                        >
                            Акции
                        </Button>

                        <Button
                            onClick={() => {
                                navigate('/bidding');
                                closeNavMenu();
                            }}
                            sx={{my: 2, color: 'white', display: 'block'}}
                        >
                            Торги
                        </Button>

                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default Navbar;
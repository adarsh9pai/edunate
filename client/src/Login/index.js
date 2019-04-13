import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, IconButton, Typography, Button, Paper, Grid, Fab } from '@material-ui/core';
//import MenuIcon from '@material-ui/icons/Menu';
import { AccountCircle, Menu } from '@material-ui/icons';

const styles = theme => ({
    root: {
        width: '100%',
    },
    logo: {
        marginLeft: '48%',
        height: 100,
        width: 100,
        margin: 'auto 0',
    },
    fab:    {
        backgroundColor: '#FFFC00',
        color: '#fff',
        fontWeight: 'bold',
        margin: 'auto 0',
        marginLeft: '45%',
        
    },
    grow:   {
        flexGrow: 1,
    },
});

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }

    renderAppBar = () => {
        const { classes } = this.props;

        return (
            <AppBar position="static">
          <Toolbar>
            <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
              <Menu />
            </IconButton>
            <Typography variant="h6" color="inherit" className={classes.grow}>
              edunate
            </Typography>
              <div>
              <IconButton color='inherit'>
                  <AccountCircle />
                </IconButton>
              </div>
          </Toolbar>
        </AppBar>
        )
    }

    renderLogin = () => {
        const { classes } = this.props;

        return (
            <Paper>
                <img src='logo.png' alt='Edunote Logo' className={classes.logo} />
                <Grid>
                <Fab variant="extended" aria-label="Delete" className={classes.fab}>
                Login with Snapchat
                </Fab>
                </Grid>
            </Paper>
        )
    }

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
               {this.renderAppBar()}
                {this.renderLogin()}
            </div>
        );
    }
}

Login.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Login);
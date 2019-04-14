import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, IconButton, Typography, Button, Paper, Grid, Fab } from '@material-ui/core';
import { AccountCircle, Menu } from '@material-ui/icons';
import MenuAppBar from '../Components/appBar';
import Post from './searchCards';
import defaultStyles from '../Theme/styles';



const styles = theme => ({
    ...defaultStyles(theme),
});

class Homepage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

        }
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
            <div >
                <MenuAppBar title='Homepage' />
                <div className={classes.root}>
                    <Post />
                </div>   
            </div>
        );
    }
}

Homepage.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Homepage);
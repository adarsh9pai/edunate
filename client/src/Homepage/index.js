import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, IconButton, Typography, Button, Paper, Grid, Fab } from '@material-ui/core';
import { AccountCircle, Menu } from '@material-ui/icons';
import MenuAppBar from '../Components/appBar';
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
            <div className={classes.root}>
                <MenuAppBar title='Homepage' />
                
            </div>
        );
    }
}

Homepage.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Homepage);
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, IconButton, Typography, Button, Paper, Grid, Fab } from '@material-ui/core';
import { AccountCircle, Menu } from '@material-ui/icons';
import MenuAppBar from '../Components/appBar';

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

class Profile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
               <MenuAppBar title='Profile' />
            </div>
        );
    }
}

Profile.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Profile);
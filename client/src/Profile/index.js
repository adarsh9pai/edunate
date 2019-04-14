import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, IconButton, Typography, Button, Paper, Grid, Fab } from '@material-ui/core';
import { AccountCircle, Menu } from '@material-ui/icons';
import MenuAppBar from '../Components/appBar';
import defaultStyles from '../Theme/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';


const styles = theme => ({
    ...defaultStyles(theme),
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
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
            <div>
               <MenuAppBar title='Profile' history={this.props.history}/>
                <div className={classes.root}>
                <TextField
                    disabled
                    id="outlined-disabled"
                    label="Full Name"
                    defaultValue="Nahian Alam"
                    className={classes.textField}
                    margin="normal"
                    variant="outlined"
                    />
                <TextField
                    disabled
                    id="outlined-disabled"
                    label="Age"
                    defaultValue="18+"
                    className={classes.textField}
                    margin="normal"
                    variant="outlined"
                    />                
                <TextField
                    disabled
                    id="outlined-disabled"
                    label="University"
                    defaultValue="University of Texas at Arlington"
                    className={classes.textField}
                    margin="normal"
                    variant="outlined"
                    />                
                <TextField
                    disabled
                    id="outlined-disabled"
                    label="Classification"
                    defaultValue="Senior"
                    className={classes.textField}
                    margin="normal"
                    variant="outlined"
                    />   
                </div>
            </div>
        );
    }
}

Profile.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Profile);
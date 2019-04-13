import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Paper, Grid, Fab } from '@material-ui/core';
import MenuAppBar from '../Components/appBar';
import defaultStyles from '../Theme/styles';

const styles = theme => ({
    ...defaultStyles(theme),
    logo: {
        marginLeft: '48%',
        height: 100,
        width: 100,
        margin: 'auto 0',
    },
    fab: {
        backgroundColor: '#FFFC00',
        fontWeight: 'bold',
        margin: 'auto 0',
        marginLeft: '45%',
    },
    grow: {
        flexGrow: 1,
    },
});

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }

    handleSnapChatLogin = () => {
        // Call Snapchat API stuff

        // Navigate on success to account creation or homepage based if they have logged in before
        this.props.history.push('/homepage');
    }

    renderLogin = () => {
        const { classes } = this.props;

        return (
            <Paper>
                <img src='logo.png' alt='Edunote Logo' className={classes.logo} />
                <Grid>
                    <Fab variant="extended" aria-label="Delete" className={classes.fab} onClick={this.handleSnapChatLogin}>
                        Login with Snapchat
                </Fab>
                </Grid>
            </Paper>
        )
    }

    render() {
        const { classes } = this.props;

        return (
            <div>
                <MenuAppBar title='edunate' />
                <div className={classes.root}>
                    {this.renderLogin()}
                </div>
            </div>
        );
    }
}

Login.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Login);
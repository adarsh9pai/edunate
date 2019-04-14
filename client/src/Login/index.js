import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Paper, Grid, Fab, Typography } from '@material-ui/core';
import MenuAppBar from '../Components/appBar';
import defaultStyles from '../Theme/styles';
import classnames from 'classnames';

const styles = theme => ({
    ...defaultStyles(theme),
    logo: {
        height: 100,
        width: 100,
        marginLeft: 20,
    },
    fab: {
        backgroundColor: '#FFFC00',
        fontWeight: 'bold',
    },
    grow: {
        flexGrow: 1,
    },
    paper: {
        maxWidth: 300,
        margin: '0 auto',
        marginTop: 100,
    },
    centerDiv: {
        margin: '0 auto',
        width: '50%',
    },
});

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }

    componentDidMount = () => {
        const { location } = this.props;

        const params = new URLSearchParams(location.search);
        const isLoggedIn = params.get('loggedIn') === 'true';
        const isNewUser = params.get('newUser') === 'true';

        if (isLoggedIn && isNewUser)
            this.props.history.push('/newProfile');
        else if (isLoggedIn && !isNewUser)
            this.props.history.push('/homepage');
    }

    handleSnapChatLogin = () => {
        // Call Snapchat API stuff

        // Navigate on success to account creation or homepage based if they have logged in before
        this.props.history.push('http://localhost:3001');
    }

    renderLogin = () => {
        const { classes } = this.props;

        return (
            <Paper className={classes.paper}>
                <div className={classes.centerDiv}>
                    <img src='logo.png' alt='Edunote Logo' className={classes.logo} />
                </div>
                <Typography variant='h4' align='center'>Edunate</Typography>

                {/* <div id="my-login-button-target" /> */}
                <a href="http://localhost:3001/login">Login with Snapchat</a>
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
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Paper, Grid, ButtonBase, Typography } from '@material-ui/core';
import MenuAppBar from '../Components/appBar';
import defaultStyles from '../Theme/styles';
import { connect } from 'react-redux';
import { login, setUserName } from '../Actions/loginActions';
import { getUser } from '../API/User';

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
    aButton: {
        padding: theme.spacing.unit * 3,
        background: theme.palette.primary.main,
        margin: theme.spacing.unit * 2,
        borderRadius: theme.spacing.unit * 1.5,
        margin: '0 auto',
        width: '50%',
    },
    aLink: {
        textDecoration: 'none',
        color: 'inherit',
    },
});

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }

    componentDidMount = async () => {
        const { location, login, setUserName } = this.props;

        const params = new URLSearchParams(location.search);
        const isLoggedIn = params.get('loggedIn') === 'true';
        const isNewUser = params.get('newUser') === 'true';
        const bitmoji = params.get('bitmoji');
        const userID = params.get('id');

        console.log('isLoggedIn', isLoggedIn, 'isNewUser', isNewUser, 'bitmoji', bitmoji, 'userID', userID);

        if (isLoggedIn && isNewUser) {
            setUserName(userID, bitmoji);
            this.props.history.push('/newProfile');
        }
        else if (isLoggedIn && !isNewUser) {
            const user = await getUser(userID);
            login(user);
            this.props.history.push('/homepage');
        }
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

                <div className={classes.centerDiv}>
                    <ButtonBase className={classes.aButton}>
                        <a href="http://localhost:3001/login" className={classes.aLink}>LOGIN WITH SNAPCHAT</a>
                    </ButtonBase>
                </div>
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
    login: PropTypes.func.isRequired,
    setUserName: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({

})

export default connect(mapStateToProps, { login, setUserName })(withStyles(styles)(Login));
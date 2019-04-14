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
        height: 400,
        width: 400,
        margin: 100,
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
    loginButton: {
        margin: '0 auto',
        width: '50%',
        alling: 'centre',
        marginBottom: 250,
    },
    loginDescription: {
        margin: '0 auto',
        width: '50%',
        alling: 'centre',
        marginTop: 200,
        fontSize: '2rem',
    },
    aButton: {
        padding: theme.spacing.unit * 3,
        background: theme.palette.primary.main,
        margin: theme.spacing.unit * 2,
        borderRadius: 50,
        margin: '0 auto',
        width: '100%',
        fontWeight: 'bold',
        color: '#000000',
        backgroundColor: '#FFFC00',
        font: 'inherit' ,
    },
    aLink: {
        textDecoration: 'none',
        color: 'inherit',
    },
    background: {
        backgroundColor: theme.palette.primary.light,
        height: '100%',
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
            <Grid container className={classes.background}>
             <Grid xm={12} xs={1}></Grid>
             <Grid xm={12} xs={5}>

              <div>
               <img src='logo.png' alt='Edunote Logo' className={classes.logo} />
              </div>
            </Grid>

             <Grid xm={12} xs={5}>
            <Typography paragraph className={classes.loginDescription}>
            📚💵👩‍🏫Succeed in College through micro-donations, peer tutoring and textbook exchange. 
            </Typography>
             <div className={classes.loginButton}>
              <ButtonBase className={classes.aButton}>
                 <a href="http://localhost:3001/login" className={classes.aLink}>LOGIN WITH SNAPCHAT</a>
             </ButtonBase>
             </div>
             </Grid>
             <Grid xm={12} xs={1}></Grid>
                
            </Grid>
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
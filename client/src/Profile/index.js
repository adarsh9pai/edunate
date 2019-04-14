import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, IconButton, Typography, Button, Paper, Grid, Fab } from '@material-ui/core';
import { AccountCircle, Menu } from '@material-ui/icons';
import MenuAppBar from '../Components/appBar';
import defaultStyles from '../Theme/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';
import DoneIcon from '@material-ui/icons/Done';
import PowerSettingsNew from '@material-ui/icons/PowerSettingsNew';
import { getUser } from '../API/User';
import { connect } from 'react-redux';
import { getAllBarters } from '../API/Barter';



const styles = theme => ({
  ...defaultStyles(theme),
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  chip: {
    margin: theme.spacing.unit,
  },
  chipLabel: {
    fontSize: '1.5rem',
  },
  logoutButton: {
    margin: 10,
    height: '100%',
    width: '80%',
  },
  centerDiv: {
    margin: '0 auto',
    width: '10%',
    marginTop: 64 + theme.spacing.unit * 3,
  },
});

class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      donators: [],
    }
  }

  componentDidMount = async () => {
    const { userID } = this.props;

    const user = await getUser(userID);
    const barters = await getAllBarters();


    const donators = [...(new Set(barters
      // Get all of the barters that are not the user's
      .filter(barter => barter.user.displayName !== userID)
      // Get any barter where the received contains this user
      .filter(barter => barter.received.some(receive => receive.displayName === userID))
      // Get that user's profile
      .map(barter => barter.user)
    ))];

    // const supporters = new Set(...barters
    //   // Get all of the barters that belong to this user
    //   .filter(barter => barter.user.displayName === userID)
    //   .map(barter => barter)
      
      
    //   )

    this.setState({ ...user, donators });
  }

  //Logout functionality
  onLogoutClick = () => {
    console.log('logged out');

  }

  render() {
    const { classes, bitmoji } = this.props;
    const { fullName, age = '', location = '', university = '', classification = '', donators } = this.state;

    return (
      <div>
        <MenuAppBar title='Profile' />
        <div className={classes.root}>
          <Grid container >

            {/* bitmoji */}

            <Grid item xs={12} sm={2} className={classes.formGridItem}></Grid>
            <Grid item xs={12} sm={8} className={classes.centerDiv}>
              <img src={bitmoji}></img>
            </Grid>
            <Grid item xs={12} sm={2} className={classes.formGridItem}></Grid>

            {/* Name and Age for the Profile page */}

            <Grid item xs={12} sm={1} className={classes.formGridItem}></Grid>
            <Grid item xs={12} sm={5} className={classes.formGridItem}>
              <TextField
                disabled
                label="Full Name"
                value={fullName}
                InputLabelProps={{ shrink: !!fullName }}
                className={classes.textField}
                margin="normal"
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={5} className={classes.formGridItem}>
              <TextField
                disabled
                label="Age"
                value={age}
                InputLabelProps={{ shrink: !!age }}
                className={classes.textField}
                margin="normal"
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={1} className={classes.formGridItem}></Grid>

            {/* University and Classification Profile page */}


            <Grid item xs={12} sm={1} className={classes.formGridItem}></Grid>
            <Grid item xs={12} sm={4} className={classes.formGridItem}>
              <TextField
                disabled
                id="outlined-disabled"
                label="University"
                value={university}
                InputLabelProps={{ shrink: !!university }}
                className={classes.textField}
                margin="normal"
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={3} className={classes.formGridItem}>
              <TextField
                disabled
                id="outlined-disabled"
                label="Classification"
                value={classification}
                InputLabelProps={{ shrink: !!classification }}
                className={classes.textField}
                margin="normal"
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={3} className={classes.formGridItem}>
              <TextField
                disabled
                id="outlined-disabled"
                label="City"
                value={location}
                InputLabelProps={{ shrink: !!location }}
                className={classes.textField}
                margin="normal"
                variant="outlined"
                fullWidth
              />
            </Grid>

            <Grid item xs={12} sm={1} className={classes.formGridItem}></Grid>

            {/* Donations header line */}
            <Grid item xs={12} sm={1} className={classes.formGridItem}></Grid>
            <Grid item xs={12} sm={4} className={classes.formGridItem}>
              <Typography variant='h6' >Donations</Typography>
            </Grid>
            <Grid item xs={12} sm={7} className={classes.formGridItem}></Grid>

            {/* Donations tag file, edit here to add more donations */}

            <Grid item xs={12} sm={1} className={classes.formGridItem}></Grid>
            <Grid item xs={12} sm={1} className={classes.formGridItem}>
            {donators.map(donator => (
              <Chip
              avatar={<Avatar>{donator.fullName.subString(0, 2)}</Avatar>}
              label={donator.fullName}
              className={classes.chip}
              variant="outlined"
            />
              ))}
              
            </Grid>
            <Grid item xs={12} sm={9} className={classes.formGridItem}></Grid>
            <Grid item xs={12} sm={1} className={classes.formGridItem}></Grid>

            {/* Supporters header line */}

            <Grid item xs={12} sm={1} className={classes.formGridItem}></Grid>
            <Grid item xs={12} sm={4} className={classes.formGridItem}>
              <Typography variant='h6' >Supporters</Typography>
            </Grid>
            <Grid item xs={12} sm={7} className={classes.formGridItem}></Grid>

            {/* Suppoerters tags file, edit here to add more supporters */}

            <Grid item xs={12} sm={1} className={classes.formGridItem}></Grid>
            <Grid item xs={12} sm={1} className={classes.formGridItem}>
              <Chip
                avatar={<Avatar>NA</Avatar>}
                label="Nahian Alam"
                className={classes.chip}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={9} className={classes.formGridItem}></Grid>
            <Grid item xs={12} sm={1} className={classes.formGridItem}></Grid>

            {/* Logout button, at the end of the page */}

            <Grid item xs={12} sm={10} className={classes.formGridItem}></Grid>
            <Grid item xs={12} sm={2} className={classes.formGridItem}>
              <Button onClick={this.onLogoutClick} variant="contained" color="secondary" className={classes.logoutButton}>
                <PowerSettingsNew className={classes.rightIcon} />
                Logout
                      </Button>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

Profile.propTypes = {
  classes: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  bitmoji: state.login.bitmoji,
  userID: state.login.userID,
});

export default connect(mapStateToProps, {})(withStyles(styles)(Profile));

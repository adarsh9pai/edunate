import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Button, Grid } from '@material-ui/core';
import MenuAppBar from '../Components/appBar';
import defaultStyles from '../Theme/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';
import { newUser, login } from '../Actions/loginActions';
import { User } from '../API/User';

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
      classification: '',
    }
  }

  //continues to profile page when continue is pressed
  handleTextChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  handleSelectChange = id => e => {
    this.setState({ [id]: e.target.value });
  }

  handleContinueClick = () => {
    const { newUser, login, userID: displayName } = this.props;

    newUser(new User({...this.state, displayName}));
    login(new User({...this.state, displayName}));
    this.props.history.push('./homepage');
  }

  render() {
    const { classes, bitmoji } = this.props;
    const { classification } = this.state;

    return (
      <div>
        <MenuAppBar title='Profile' />
        <div className={classes.root}>

          <div className={classes.centerDiv}>
            <img src={bitmoji} />
          </div>

          <Grid container >

            {/* entry boxes for new profile page */}

            <Grid item xs={12} sm={4} className={classes.formGridItem}>
              <TextField
                id="fullName"
                label="Full Name"
                onBlur={this.handleTextChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={4} className={classes.formGridItem}>
              <TextField
                id="age"
                label="Age"
                onBlur={this.handleTextChange}
                type="number"
                fullWidth
              />
            </Grid>

            <Grid item xs={12} sm={4} className={classes.formGridItem}>
              <TextField
                id="university"
                label="University"
                onBlur={this.handleTextChange}
                fullWidth
              />
            </Grid>

            <Grid item xs={12} sm={4} className={classes.formGridItem}>
              <TextField
                id="location"
                label="City"
                onBlur={this.handleTextChange}
                fullWidth
              />
            </Grid>

            <Grid item xs={12} sm={4} className={classes.formGridItem}>
              <TextField id='classification' label="Classification" value={classification} onChange={this.handleSelectChange('classification')} fullWidth select
                SelectProps={{
                  MenuProps: {
                    className: classes.menu,
                  },
                }}
              >
                <MenuItem value='Freshman'>Freshman</MenuItem>
                <MenuItem value='Sophomore'>Sophomore</MenuItem>
                <MenuItem value='Junior'>Junior</MenuItem>
                <MenuItem value='Senior'>Senior</MenuItem>
                <MenuItem value='Master Student'>Master Student</MenuItem>
                <MenuItem value='PhD Candidate'>PhD Candidate</MenuItem>
              </TextField>
            </Grid>

            <Grid item xs={12} sm={4} className={classes.formGridItem}>
              <TextField
                id="major"
                label="Major"
                onBlur={this.handleTextChange}
                fullWidth
              />
            </Grid>

            {/* Logout button, at the end of the page */}

            <Grid item xs={12} sm={10} className={classes.formGridItem}></Grid>
            <Grid item xs={12} sm={2} className={classes.formGridItem}>
              <Button color='primary' variant='contained' onClick={this.handleContinueClick}>Continue</Button>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

Profile.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  bitmoji: state.login.bitmoji,
  userID: state.login.userID,
})

export default connect(mapStateToProps, { newUser, login })(withStyles(styles)(Profile));
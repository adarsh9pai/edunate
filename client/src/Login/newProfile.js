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
});

class Profile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }

    //continues to profile page when continue is pressed
    handleChange = name => event => {
    
    
    };

    //changes the text entry when text is entered
    handleChange = name => event => {
      this.setState({ [name]: event.target.value });
    };

    render() {
        const { classes } = this.props;

        return (
            <div>
              <MenuAppBar title='Profile' />
               <div className={classes.root}> 

                {/* Insert bitmoji in place of the typograph */}


                <Typography>bitmoji goes here</Typography>
                 
                 <Grid container >
                   
                    {/* entry boxes for new profile page */}

                    <Grid item xs={12} sm={1} className={classes.formGridItem}></Grid>                   
                    <Grid item xs={12} sm={3} className={classes.formGridItem}>   
                    <TextField
                        id="standard-number"
                        label="Age"
                        value={this.state.age}
                        onChange={this.handleChange('Age')}
                        type="number"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        fullWidth
                        />
                     </Grid>
                   
                    <Grid item xs={12} sm={4} className={classes.formGridItem}>   
                    <TextField
                        id="standard-full-width"
                        label="University"
                        placeholder=""
                        InputLabelProps={{
                          shrink: true,
                        }}
                        fullWidth
                        />
                     </Grid>
                    
                    <Grid item xs={12} sm={3} className={classes.formGridItem}>   
                    <TextField
                        id="standard-full-width"
                        label="City"
                        placeholder=""
                        InputLabelProps={{
                          shrink: true,
                        }}
                        fullWidth
                        />
                     </Grid>
                     <Grid item xs={12} sm={1} className={classes.formGridItem}></Grid>       
                   
                    {/* Logout button, at the end of the page */}

                    <Grid item xs={12} sm={10} className={classes.formGridItem}></Grid>                         
                    <Grid item xs={12} sm={2} className={classes.formGridItem}>
                      <Button onClick={this.onContinueClick} >Coninue</Button>
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

export default withStyles(styles)(Profile);
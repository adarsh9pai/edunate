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

    render() {
        const { classes } = this.props;

        return (
            <div>
              <MenuAppBar title='Profile' />
               <div className={classes.root}> 
                <Typography>bitmoji goes here</Typography>
                 <Grid container >
                   
                    {/* Name and Age for the Profile page */}

                    <Grid item xs={12} sm={1} className={classes.formGridItem}></Grid>                   
                    <Grid item xs={12} sm={5} className={classes.formGridItem}>   
                    <TextField
                        disabled
                        id="outlined-disabled"
                        label="Full Name"
                        defaultValue="Nahian Alam"
                        className={classes.textField}
                        margin="normal"
                        variant="outlined"
                        fullWidth
                        />
                    </Grid>
                     <Grid item xs={12} sm={5} className={classes.formGridItem}>
                    <TextField
                        disabled
                        id="outlined-disabled"
                        label="Age"
                        defaultValue="18+"
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
                        defaultValue="University of Texas at Arlington"
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
                        defaultValue="Freshman"
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
                        defaultValue="Greek"
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
                      <Chip
                        avatar={<Avatar>NA</Avatar>}
                        label="Nahian Alam"
                        className={classes.chip}
                        variant="outlined"
                      />
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
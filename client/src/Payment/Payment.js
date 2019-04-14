import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import classnames from "classnames";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import red from "@material-ui/core/colors/red";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { Badge, Fab, Button, View, Paper } from "@material-ui/core";
import { Done, AttachMoney } from "@material-ui/icons";
import NavigationIcon from '@material-ui/icons/Navigation';
import Chip from '@material-ui/core/Chip';
import { connect } from 'react-redux';
import CheckoutForm from './CheckoutForm';
import {Elements, StripeProvider} from 'react-stripe-elements';



const styles = theme => ({
  // Payment: {
  //   marginLeft: '43%',
  // },
  // PaymentCard: {
  //   width: 700,
  //   square: 'false',
  //   marginLeft: '25%', 
  //   backgroundColor: theme.palette.primary.light,
  // },
  // PaymentBox: {
  //   margin: 10,
  //   },
  container: {
    marginTop: theme.spacing.unit * 2,
    width: '100%',
  }
});

class Payment extends React.Component {

  render() {
    const { classes } = this.props;
    
    return (
      <div className={classes.container}>
       <StripeProvider apiKey="pk_test_TYooMQauvdEDq54NiTphI7jx" >
         <div className={classes.PaymentBox}>
           {/* <h2 className={classes.Payment}>Payment</h2> */}
           <Elements>
             <CheckoutForm onFinish={this.props.onFinish} onClose={this.props.onClose}/>
           </Elements>
         </div>
       </StripeProvider>
      </div>
    );
  }
}

export default withStyles(styles)(Payment);

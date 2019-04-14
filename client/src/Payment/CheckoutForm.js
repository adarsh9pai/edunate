import React, { Component } from 'react';
import { CardElement, injectStripe } from 'react-stripe-elements';
import { Button, Grid, TextField } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import defaultStyles from '../Theme/styles';

const styles = theme => ({
  ...defaultStyles(theme),
})
class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);

    this.state = { 
      comment: '',
    }
  }

  async submit(ev) {
    console.log("Purchase Complete!")
    let { token } = await this.props.stripe.createToken({ name: "Name" });
    if (!token)
      return

    let response = await fetch("http://localhost:3001/charge", {
      mode: 'no-cors',
      method: "POST",
      headers: { "Content-Type": "text/plain" },
      body: token.id
    });

    if (response.ok) this.setState({ complete: true });
    this.props.onFinish(this.state.comment);
  }

  onClose = () => {
    this.props.onClose();
  }

  handleTextChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  }


  render() {
    const { classes } = this.props;

    return (
      <div className="checkout">
        <CardElement />
        <Grid container>
          <Grid item xs={12}>
            <TextField id='comment' label='Comment' onBlur={this.handleTextChange} fullWidth inputProps={{ maxLength: 25 }} />
          </Grid>
        </Grid>
        <div className={classes.buttonGroupRight}>
          <Button onClick={this.onClose} className={classes.button}>Close</Button>
          <Button color='primary' onClick={this.submit} className={classes.button}>Send</Button>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(injectStripe(CheckoutForm));

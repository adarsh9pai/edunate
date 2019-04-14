import React, {Component} from 'react';
import { CardElement, injectStripe } from 'react-stripe-elements';
import { Button } from '@material-ui/core';

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
  }

  async submit(ev) {
    let {token} = await this.props.stripe.createToken({name: "Name"});
    let response = await fetch("http://localhost:3001/charge", {
      mode : 'no-cors',
      method: "POST",
      headers: {"Content-Type": "text/plain"},
      body: token.id
    });
  
    if (response.ok) 

    if (response.ok) this.setState({complete: true});
}
  

  render() {

   //if (this.state.complete) return <h1>Purchase Complete</h1>;

    return (
      <div className="checkout">
        <p>Would you like to complete the purchase?</p>
        <CardElement />
        <Button onClick={this.submit}>Send</Button>
      </div>
    );
  }
}

export default injectStripe(CheckoutForm);

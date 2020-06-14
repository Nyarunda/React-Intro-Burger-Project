import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

class Checkout extends Component {
  state = {
    ingredients: {
      salad: 1,
      Cheese: 1,
      bacon: 1,
      meat: 1,
    },
  };
  componentDidMount() {
    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    for (let param of query.entries()) {
      ingredients[param[0]] = +param[1];
    }
    this.setState({ ingredients: ingredients });
  }
  checkoutCancledHandler = () => {
    this.props.history.goBack();
  };
  checkoutProceedHandler = () => {
    this.props.history.replace('/checkout/contact');
  };
  render() {
    return (
      <div>
        <CheckoutSummary
          ingredients={this.state.ingredients}
          checkoutCancled={this.checkoutCancledHandler}
          checkoutProceed={this.checkoutProceedHandler}
        />
      </div>
    );
  }
}

export default Checkout;

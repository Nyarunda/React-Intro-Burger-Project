import React, { Component } from 'react';
import Aux from '../../../hoc/hoc/Aux';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
  // FOr debug ing
  componentDidUpdate() {
    console.log('[OrderSummary] Will update');
  }
  render() {
    const ingredientSummary = Object.keys(this.props.ingredients).map(
      (igKey) => {
        return (
          <li key={igKey}>
            <span style={{ textTransform: 'capitalize' }}>{igKey}</span>:{' '}
            {this.props.ingredients.igKey}
          </li>
        );
      }
    );

    return (
      <Aux>
        <h3>Your Order</h3>
        <p>Yummy Burger</p>
        <ul>{ingredientSummary}</ul>
        <p>
          <strong>Total: ${this.props.price}</strong>
        </p>
        <p>Proceed To Checkout</p>
        <Button btnType="Danger" clicked={this.props.purchaseCancelled}>
          CANCLE
        </Button>
        <Button btnType="Success" clicked={this.props.purchaseContinued}>
          CONTINUE
        </Button>
      </Aux>
    );
  }
}

export default OrderSummary;

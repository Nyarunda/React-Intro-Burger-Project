import React, { Component } from 'react';
import Aux from '../../hoc/hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/Buildcontrols/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENTD_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0,
    },
    totalPrice: 4,
    purchaseAble: false,
    purchasing: false,
  };

  updatePurchase(ingredients) {
    const sum = Object.keys(ingredients)
      .map((igkey) => {
        return ingredients[igkey];
      })
      .reduce((sum, el) => {
        return (sum += el);
      }, 0);
    this.setState({ purchaseAble: sum > 0 });
  }

  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updateIngredients = {
      ...this.state.ingredients,
    };
    updateIngredients[type] = updatedCount;
    const nowBasePrice = INGREDIENTD_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + nowBasePrice;
    this.setState({ totalPrice: newPrice, ingredients: updateIngredients });
    this.updatePurchase(updateIngredients);
  };

  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    if (oldCount <= 0) {
      return;
    }
    const updatedCount = oldCount - 1;
    const updateIngredients = {
      ...this.state.ingredients,
    };
    updateIngredients[type] = updatedCount;
    const nowBasePrice = INGREDIENTD_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - nowBasePrice;
    this.setState({ totalPrice: newPrice, ingredients: updateIngredients });
    this.updatePurchase(updateIngredients);
  };

  purchasingHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    alert('Proceed');
  };

  render() {
    const disabledButton = {
      ...this.state.ingredients,
    };
    for (let key in disabledButton) {
      disabledButton[key] = disabledButton[key] <= 0;
    }
    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          <OrderSummary
            ingredients={this.state.ingredients}
            price={this.state.totalPrice.toFixed(2)}
            purchaseCancelled={this.purchaseCancelHandler}
            purchaseContinued={this.purchaseContinueHandler}
          />
        </Modal>

        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          ingredientsAdded={this.addIngredientHandler}
          ingredientsRemove={this.removeIngredientHandler}
          disabled={disabledButton}
          purchaseable={this.state.purchaseAble}
          price={this.state.totalPrice}
          ordered={this.purchasingHandler}
        />
      </Aux>
    );
  }
}

export default BurgerBuilder;

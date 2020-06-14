import React, { Component } from 'react';
import Aux from '../../hoc/hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/Buildcontrols/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENTD_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: false,
      bacon: false,
      cheese: false,
      meat: false,
    },

    totalPrice: 4,
    purchaseAble: false,
    purchasing: false,
    loading: false,
    error: false,
  };
  componentDidMount() {
    console.log(this.props);
    axios
      .get('https://react-burger-cca4b.firebaseio.com/ingredients.json')
      .then((response) => {
        this.setState({ ingredients: response.data });
      })
      .catch((error) => this.setState({ error: true }));
  }

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
    // this.setState({ loading: true });
    // // alert('Proceed');
    // const order = {
    //   ingredients: this.state.ingredients,
    //   price: this.state.totalPrice,
    //   customer: {
    //     name: 'Ezra',
    //     address: {
    //       street: 'Kasarani-materity',
    //       zipCode: '00100',
    //       country: 'Kinya',
    //     },
    //     eamil: 'teat@test.com',
    //   },
    //   delivermethod: 'Bike',
    // };
    // axios
    //   .post('/orders.json', order)
    //   .then((res) => {
    //     console.log(res);
    //     this.setState({ loading: false, purchasing: false });
    //   })
    //   .catch((er) => {
    //     this.setState({ loading: false, purchasing: false });
    //   });
    const queryParams = [];
    for (let i in this.state.ingredients) {
      queryParams.push(
        encodeURIComponent(i) +
          '=' +
          encodeURIComponent(this.props.ingredients[i])
      );
    }
    const queryString = queryParams.join('&');

    this.props.history.push({
      pathname: '/checkout',
      search: '?' + queryString,
    });
  };

  render() {
    const disabledButton = {
      ...this.state.ingredients,
    };
    for (let key in disabledButton) {
      disabledButton[key] = disabledButton[key] <= 0;
    }
    let orderSummary = null;
    orderSummary = (
      <OrderSummary
        ingredients={this.state.ingredients}
        price={this.state.totalPrice.toFixed(2)}
        purchaseCancelled={this.purchaseCancelHandler}
        purchaseContinued={this.purchaseContinueHandler}
      />
    );

    if (this.state.loading) {
      orderSummary = <Spinner />;
    }

    let burger = this.state.error ? (
      <p>Ingredients can't load </p>
    ) : (
      <Spinner />
    );

    if (this.state.ingredients) {
      burger = (
        <Aux>
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
      orderSummary = (
        <OrderSummary
          ingredients={this.state.ingredients}
          price={this.state.totalPrice.toFixed(2)}
          purchaseCancelled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler}
        />
      );
      if (this.state.loading) {
        orderSummary = <Spinner />;
      }
    }

    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);

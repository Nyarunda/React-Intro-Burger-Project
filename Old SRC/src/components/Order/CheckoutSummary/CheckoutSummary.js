import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';

import classes from './ChekoutSummary.css';

const checkoutSummary = (props) => {
  return (
    <div className={classes.Container_Checkout}>
      <h1>Yummy Test</h1>
      <div className={classes.CheckouSummary}>
        <Burger ingredients={props.ingredients} />
      </div>
      <Button btnType="Danger" clicked={props.checkoutCancled}>
        Cancle
      </Button>
      <Button btnType="Success" clicked={props.checkoutProceed}>
        Proceed
      </Button>
    </div>
  );
};

export default checkoutSummary;

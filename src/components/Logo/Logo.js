import React from 'react';
import classes from './Logo.css';
import burgerlogo from '../../assets/Images/28.1 burger-logo.png.png';

const logo = (props) => (
  <div className={classes.Logo} style={{ height: props.height }}>
    <img src={burgerlogo} alt="Logo" />
  </div>
);

export default logo;

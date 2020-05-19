import React, { Component } from 'react';
import Aux from '../hoc/Aux';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';

import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

import classes from './Layout.css';

class Layout extends Component {
  state = {
    showSideDrawer: true,
  };

  sideDrawCloseHandler = () => {
    this.setState({ showSideDrawer: false });
  };
  drawerToggleClicke = () => {
    this.setState((prevState) => {
      return { showSideDrawer: !prevState.showSideDrawer };
    });
  };
  render() {
    return (
      <Aux>
        <Toolbar drawerToggleClicke={this.sideDrawCloseHandler} />
        <SideDrawer
          closed={this.sideDrawCloseHandler}
          open={this.state.showSideDrawer}
        />
        <div>Toolbar, SideDrawer, Dackdrop</div>

        <main className={classes.Wrapper}>{this.props.children}</main>
      </Aux>
    );
  }
}

export default Layout;

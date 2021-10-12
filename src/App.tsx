import React from "react";
import './App.css';
import CssBaseline from '@material-ui/core/CssBaseline';
import Header from "./containers/Header";
import { BrowserRouter } from 'react-router-dom';
import Routes from "./components/Routes";
import CartModal from "./containers/CartModal/CartModal";

interface AppState {
  cartOpen: boolean;
}

/**
 * Header Container
 * @extends {Component<Props>}
 */
class App extends React.Component<{}, AppState> {
  state = {
    cartOpen: false
  }

  /**
   * Renders the container.
   * @return {string} - HTML markup for the container
   */
  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <BrowserRouter>
          <Header openCart={this.handleOpenCart} />
          <Routes />
          <CartModal isCartVisible={this.state.cartOpen} closeCart={this.handleCloseCart} />
        </BrowserRouter>
      </React.Fragment>
    )
  }

  handleCloseCart = (event: any) => {
    this.setState({ cartOpen: false });
  }

  handleOpenCart = (event: any) => {
    this.setState({ cartOpen: true });
  }
}

export default App;

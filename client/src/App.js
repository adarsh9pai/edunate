import React, { Component } from 'react';
import theme from './Theme/theme';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import { MuiThemeProvider } from '@material-ui/core';
import Login from './Login';


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <MuiThemeProvider theme={theme}>
          <Login />
        </MuiThemeProvider>
      </BrowserRouter>
    );
  }
}

export default App;

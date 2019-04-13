import React, { Component } from 'react';
import theme from './Theme/theme';
import Login from './Login/login';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import { MuiThemeProvider } from '@material-ui/core';

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

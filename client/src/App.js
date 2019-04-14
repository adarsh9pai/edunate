import React, { Component } from 'react';
import theme from './Theme/theme';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import { MuiThemeProvider } from '@material-ui/core';
import Navigation from './routes';
import { Provider } from 'react-redux';
import store from './store';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Provider store={store}>
          <MuiThemeProvider theme={theme}>
            {Navigation}
          </MuiThemeProvider>
        </Provider>
      </BrowserRouter>
    );
  }
}

export default App;

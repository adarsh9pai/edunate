import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './Login';


class App extends Component {
  render() {
    return (
      <Login />
    );
  }
}

class Temp extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (<div>This is Imtiaz</div>)
  }
}

export default App;

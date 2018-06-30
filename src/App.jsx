import React, { Component } from 'react';
import './App.css';
import Download from './components/Download';

class App extends Component {
  render() {
    return (
      <div className="App">
        <p className="App-intro">Here's your excel spreadsheet.</p>
        <Download />
      </div>
    );
  }
}

export default App;

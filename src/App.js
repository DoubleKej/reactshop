import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import MenuAppbar from './components/MenuAppbar'
import CategoryPage from './containers/CategoryPage'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
        <MenuAppbar/>
        <CategoryPage/>
        </header>
        
      </div>
    );
  }
}

export default App;

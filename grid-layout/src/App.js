import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  //颜色对象
  color() {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    return 'rgba(' + r + ',' + g + ',' + b + ',0.8)';
  }

  render() {
    return (
      <div className="App">
        <div class="container">
          <div class="item item-1" style={{background: this.color()}}>1</div>
          <div class="item item-2" style={{background: this.color()}}>2</div>
          <div class="item item-3" style={{background: this.color()}}>3</div>
          <div class="item item-4" style={{background: this.color()}}>4</div>
          <div class="item item-5" style={{background: this.color()}}>5</div>
          <div class="item item-6" style={{background: this.color()}}>6</div>
          <div class="item item-7" style={{background: this.color()}}>7</div>
          <div class="item item-8" style={{background: this.color()}}>8</div>
        </div>
      </div>
    );
  }
}

export default App;

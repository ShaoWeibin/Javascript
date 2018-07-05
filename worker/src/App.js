import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import WrokerWrapper from './WorkerWrapper';

import { registerServiceWorker, unregisterServiceWorker} from './serviceWorker';
import { createWorker, terminateWorker }  from './worker';
import WorkerWrapper from './WorkerWrapper';
import ServiceWorkerWrapper from './ServiceWorkerWrapper';

class App extends Component {
  componentDidMount() {
    registerServiceWorker();
    createWorker();
  }

  componentWillUnmount() {
    unregisterServiceWorker();
    terminateWorker();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          <h1 className="App-title">Web Workers & Service Workers</h1>
        </header>
        <div className="container">
          <WorkerWrapper/>
          <ServiceWorkerWrapper/>
        </div>
      </div>
    );
  }
}

export default App;

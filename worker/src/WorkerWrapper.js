import React, { Component } from 'react';

import { postMessage, addEventListener } from './worker';

class WorkerWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      list: [{
        input: 'input',
        output: 'output',
        cost: 'cost(ms)'
      }]
    };
  }

  componentDidMount() {
    addEventListener('message', event => {
      if (Object.keys(event.data).length) {
        const { list } = this.state;
        this.setState({
          list: list.concat(event.data)
        })
      }
    });
  }

  componentWillUnmount() {
    
  }

  render() {
    const { list } = this.state;
    return (
      <div className="worker-wrapper">
        <h2>Web Workers</h2>
        <div className="form">
          <input 
            type="input"
            className="input"
            placeholder="请输入一个整数"
            onChange={(e) => {
              this.setState({
                value: parseInt(e.target.value)
              });
            }}
          />
          <input 
            type="button"
            className="button"
            onClick={() => {
              const { value } = this.state; 
              postMessage(value);
            }}
            value={'fibonacci'}
          />
        </div>
        <div className="list">
          <table>
            {list.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item.input}</td>
                  <td>{item.output}</td>
                  <td>{item.cost}</td>
                </tr>
              );
            })}
          </table>
        </div>
      </div>
    );
  }
}

export default WorkerWrapper;
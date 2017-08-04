import React, {Component} from 'react';
import Matrix from './matrix';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      matrixs: [{
        rows: [
          [{}, {}, {}, {}],
          [{}, {}, {}, {}],
          [{}, {}, {}, {}],
          [{}, {}, {}, {}]
        ]
      }],
      minuses: {
        left: 0,
        top: 0,
        visibility: 'hidden'
      }
    };
  }

  onAddRows = () => {
    const countColumns = this.state.matrixs[0].rows[0];
    const currentState = this.state.matrixs[0].rows;
    const arrNewRow = [];

    countColumns.map(() => {
      arrNewRow.push({})
    });

    this.setState({
      rows: currentState.push(arrNewRow)
    });
  };

  onAddColumns = () => {
    const currentState = this.state.matrixs[0].rows;

    currentState.map((elementTr) => {
      elementTr.push({})
    });

    this.setState({
      rows: currentState
    });
  };

  onOver = (event) => {
    const target = event.target;

    if (target.tagName === 'TD') {
      clearTimeout(this.timerId);
      this.setState({
        minuses: {
          left: target.offsetLeft,
          top: target.offsetTop,
          visibility: 'visible'
        }
      });
    } else if (target.classList.value === 'fa fa-minus') {
      clearTimeout(this.timerId)
    }
  };

  onOut = (event) => {
    const target = event.target;

    if (target.tagName === 'TD') {
      this.timerId = setTimeout(() => {
        this.setState({
          minuses: {
            visibility: 'hidden'
          }
        })
      }, 300);
    } else if (target.classList.value === 'fa fa-minus') {
      this.timerId = setTimeout(() => {
        this.setState({
          minuses: {
            visibility: 'hidden'
          }
        })
      }, 300);
    }
  };

  render() {
    const {matrixs, minuses} = this.state;

    return (
      <div>
        {matrixs.map((matrix, idx) =>
          <Matrix onAddRows={this.onAddRows}
                  onAddColumns={this.onAddColumns}
                  onOver={this.onOver}
                  onOut={this.onOut}
                  minuses={minuses}
                  matrix={matrix}
                  key={idx}/>
        )}
      </div>
    );
  };
}

export default App;

import React, {Component, PropTypes} from 'react';
import './App.css';

class TopMinus extends Component {
  static propTypes = {
    left: PropTypes.number,
    visibility: PropTypes.string,
    remove: PropTypes.func
  };

  render() {
    return (
      <div className="content__minus-top square"
           onClick={this.props.remove}
           style={{left: this.props.left, visibility: this.props.visibility}}>
        <i className="fa fa-minus"/>
      </div>
    )
  }
}

class LeftMinus extends Component {
  static propTypes = {
    top: PropTypes.number,
    visibility: PropTypes.string,
    remove: PropTypes.func
  };

  render() {
    return (
      <div className="content__minus-left square"
           onClick={this.props.remove}
           style={{top: this.props.top, visibility: this.props.visibility}}>
        <i className="fa fa-minus"/>
      </div>
    )
  }
}

export default class Matrix extends Component {
  static propTypes = {
    matrix: PropTypes.object,
    minuses: PropTypes.object,
    onAddColumns: PropTypes.func,
    onAddRows: PropTypes.func,
    onRemoveColumns: PropTypes.func,
    onRemoveRows: PropTypes.func,
    onOver: PropTypes.func,
    onOut: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = {
      minuses: {
        left: 0,
        top: 0,
        visibility: 'hidden'
      }
    };
  }

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
    return (
      <div className="content"
           onMouseOver={this.onOver}
           onMouseOut={this.onOut}>
        <div className="content__plus-right square" onClick={this.props.onAddColumns}>
          <i className="fa fa-plus"/>
        </div>
        <div className="content__plus-bottom square" onClick={this.props.onAddRows}>
          <i className="fa fa-plus"/>
        </div>

        <TopMinus remove={this.props.onRemoveColumns}
                  left={this.state.minuses.left}
                  visibility={this.state.minuses.visibility}/>
        <LeftMinus remove={this.props.onRemoveRows}
                   top={this.state.minuses.top}
                   visibility={this.state.minuses.visibility}/>

        <table className="content__table">
          <tbody>
          {this.props.matrix.rows.map((row, idx) =>
            <tr key={idx}>
              {row.map((td, id) => <td className="content__table-td square" key={id}/>)}
            </tr>
          )}
          </tbody>
        </table>
      </div>
    );
  }
}
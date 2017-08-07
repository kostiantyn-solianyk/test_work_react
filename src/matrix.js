import React, {Component, PropTypes} from 'react';
import TopMinus from './topminus';
import LeftMinus from './leftminus';
import './App.css';

function isNumber(item) {
  return typeof item === 'number';
}

export default class Matrix extends Component {
  static propTypes = {
    matrix: PropTypes.object,
    onAddColumns: PropTypes.func,
    onAddRows: PropTypes.func,
    onRemoveColumns: PropTypes.func,
    onRemoveRows: PropTypes.func,
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

  componentWillReceiveProps(nextProps) {
    if (nextProps.matrix.rows.length <= this.state.removableRow) {
      this.setState({
        removableRow: false,
        removableColumn: false
      });
    }
    if (nextProps.matrix.rows[0].length <= this.state.removableColumn) {
      this.setState({
        removableRow: false,
        removableColumn: false
      });
    }
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

  getIds = (row, column) => {
    this.setState({
      removableRow: row,
      removableColumn: column
    });
  };

  render() {
    const {removableRow, removableColumn} = this.state;
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

        {this.props.matrix.rows[0].length > 1 && isNumber(removableColumn) &&
        <TopMinus remove={() => this.props.onRemoveColumns(removableColumn)}
                  left={this.state.minuses.left}
                  visibility={this.state.minuses.visibility}/>
        }
        {this.props.matrix.rows.length > 1 && isNumber(removableRow) &&
        <LeftMinus remove={() => this.props.onRemoveRows(removableRow)}
                   top={this.state.minuses.top}
                   visibility={this.state.minuses.visibility}/>
        }
        <table className="content__table">
          <tbody>
          {this.props.matrix.rows.map((row, idx) =>
            <tr key={idx}>
              {row.map((td, id) => <td className="content__table-td square" onMouseOver={() => this.getIds(idx, id)}
                                       key={id}>{td.id}</td>)}
            </tr>
          )}
          </tbody>
        </table>
      </div>
    );
  }
}
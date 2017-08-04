import React, {Component, PropTypes} from 'react';
import './App.css';

class TopMinus extends Component {
  static propTypes = {
    left: PropTypes.number,
    visibility: PropTypes.string
  };

  render() {
    return (
      <div className="content__minus-top square" style={{left: this.props.left, visibility: this.props.visibility}}>
        <i className="fa fa-minus"/>
      </div>
    )
  }
}

class LeftMinus extends Component {
  static propTypes = {
    top: PropTypes.number,
    visibility: PropTypes.string
  };

  render() {
    return (
      <div className="content__minus-left square" style={{top: this.props.top, visibility: this.props.visibility}}>
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
    onOver: PropTypes.func,
    onOut: PropTypes.func
  };

  render() {
    return (
      <div className="content"
           onMouseOver={this.props.onOver}
           onMouseOut={this.props.onOut}>
        <div className="content__plus-right square" onClick={this.props.onAddColumns}>
          <i className="fa fa-plus"/>
        </div>
        <div className="content__plus-bottom square" onClick={this.props.onAddRows}>
          <i className="fa fa-plus"/>
        </div>

        <TopMinus left={this.props.minuses.left} visibility={this.props.minuses.visibility}/>
        <LeftMinus top={this.props.minuses.top} visibility={this.props.minuses.visibility}/>

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
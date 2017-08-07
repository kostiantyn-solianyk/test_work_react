import React, {Component, PropTypes} from 'react';

export default class LeftMinus extends Component {
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
import React, {Component, PropTypes} from 'react';

export default class TopMinus extends Component {
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
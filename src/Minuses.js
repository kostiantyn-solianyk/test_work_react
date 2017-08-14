import React, {Component, PropTypes} from 'react';

function isNumber(item) {
  return typeof item === 'number';
}

const classes = {
  top: 'content__minus-top square',
  left: 'content__minus-left square'
};

export default class Minus extends Component {
  static propTypes = {
    top: PropTypes.number,
    left: PropTypes.number,
    visibility: PropTypes.string,
    remove: PropTypes.func,
    setRef: PropTypes.func
  };

  componentDidMount() {
    this.props.setRef(this.refs.button);
  }

  render() {
    const {left, top, visibility, remove} = this.props;
    const position = isNumber(left) ? 'top' : 'left';

    return (
      <div className={classes[position]}
           onClick={remove}
           ref="button"
           style={{top: top, left: left, visibility: visibility}}>
        <i className="fa fa-minus"/>
      </div>
    )
  }
}

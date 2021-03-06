/**
 * Created by jamesbillinger on 4/18/17.
 */
import React, { Component } from 'react';
import Button from '@material-ui/core/Button';

export default class MyButton extends Component {
  render() {
    const { onClick, primary, secondary, label, children,  ...props } = this.props;
    return (
      <Button onClick={onClick} {...props}>
        {label || children || <div />}
      </Button>
    );
  }
}

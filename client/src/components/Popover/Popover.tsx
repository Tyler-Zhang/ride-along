import * as React from 'react';
import LibPopover from 'react-popover';

interface IProps {
  enable: boolean;
  content: React.ReactNode;
}

export default class Popover extends React.Component<IProps> {
  public render() {
    return (
      <LibPopover isOpen={this.props.enable} body={this.props.content}>
        {this.props.children}
      </LibPopover>
    )
  }
}

import { Button, Input } from 'antd';
import * as React from 'react';

import './PickNameComponent.css';

interface IProps {
  name: string;
  onSetName: (name: string) => any;
  signinType: string;
  loading: boolean;
  disabled: boolean;
  onSignin: () => any;
}

export default class PickNameComponent extends React.PureComponent<IProps> {
  public render() {
    return (
      <div className="pick-name-component">
        <h2> Welcome Officer! </h2>
        <h4> Please input your name below </h4>

        <Input 
          size="large" 
          placeholder="Jenkins"
          value={this.props.name}
          onChange={this.onUpdateName}
        />
        
        <Button
          disabled={this.props.disabled}
          onClick={this.props.onSignin}
          loading={this.props.loading}
          type="primary"
        >
          {this.props.signinType}
        </Button>
      </div>
    )
  }

  private onUpdateName = (event: any) => this.props.onSetName(event.target.value)
}

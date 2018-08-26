import { Button } from 'antd';
import * as React from 'react';
import { IOfficer, WithId } from '../../../types/models';
import './ControlPanelComponent.css'

interface IProps {
  officer: WithId<IOfficer>;
  stopNavigating: () => any;
}

export default class ControlPanelComponent extends React.Component<IProps> {
  public render() {
    return(
      <div className="control-panel-component">
        <Button onClick={this.props.stopNavigating}
        > Stop Navigating
        </Button>
      </div>
    )
  }
}

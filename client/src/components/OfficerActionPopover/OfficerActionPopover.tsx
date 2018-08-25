import { Button, Popover } from 'antd';
import * as React from 'react';

interface IProps {
  onClickNavigateTo: () => any;
}

const OfficerActionPopover: React.SFC<IProps> = ({ onClickNavigateTo, children }) => (
  <Popover
    content={
      <div>
        <Button type="primary" onClick={onClickNavigateTo} icon="up-circle"/>
      </div>
    }>
    {children}
  </Popover>
);

export default OfficerActionPopover;

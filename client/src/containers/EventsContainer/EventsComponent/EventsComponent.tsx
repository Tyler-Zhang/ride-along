import { Avatar, List } from 'antd';
import * as React from 'react';
import { IOfficer, WithId } from '../../../types/models';
import { Event } from '../../../types/models/Event';

interface IProps {
  events: Array<WithId<Event>>;
  officers: Record<string, IOfficer>;
}

export default class EventsComponent extends React.Component<IProps> {
  public render() {
    return (
      <List
        dataSource={this.props.events}
        itemLayout="vertical"
        renderItem={this.renderItem}
      />
    )
  }

  private renderItem = (item: WithId<Event>) => {
    if (item.type === "navigate_to") {
      const formOfficer = this.getOfficerById(item.officerId);
      const toOfficer = this.getOfficerById(item.toOfficerId);

      return (
        <List.Item
          key={item.id}>
          <List.Item.Meta
            avatar={<Avatar />}
            title={`${formOfficer.name} navigating to ${toOfficer.name}`}
            description={`ETA Approximately ${Math.round(Math.random() * 30)} minutes`}
          />
        </List.Item>
      )
    } else if (item.type === "guns_fired") {
      const officer = this.getOfficerById(item.officerId);

      return (
        <List.Item
          key={item.id}>
          <List.Item.Meta
          avatar={<Avatar />}
          title={`${officer.name} heard gunshots in his area`}
          description="Be careful!"
          />
        </List.Item>
      )
    } else if (item.type === "officer_in_danger") {
      const officer = this.getOfficerById(item.officerId);

      return (
        <List.Item
          key={item.id}>
          <List.Item.Meta
          avatar={<Avatar />}
          title={`${officer.name} is in trouble`}
          description="Close by units please help out"
          />
        </List.Item>
      )
    } else {
      return <div/>
    }
  }

  private getOfficerById = (id: string) => {
    return this.props.officers[id];
  }
}

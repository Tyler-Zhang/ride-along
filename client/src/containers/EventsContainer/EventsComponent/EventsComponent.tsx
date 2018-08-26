import { List } from 'antd';
import moment from 'moment';
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
            title={`${formOfficer.name} navigating to ${toOfficer.name}`}
            description={`${this.minutesElapsedSince(item.time)} minutes ago`}
          />
        </List.Item>
      )
    } else if (item.type === "guns_fired") {
      const officer = this.getOfficerById(item.officerId);

      return (
        <List.Item
          key={item.id}>
          <List.Item.Meta
            title={`${officer.name} heard gunshots in his area`}
            description={`${this.minutesElapsedSince(item.time)} minutes ago`}
          />
        </List.Item>
      )
    } else if (item.type === 'need_assistance') {
      const officer = this.getOfficerById(item.officerId);

      return (
        <List.Item
          key={item.id}>
          <List.Item.Meta
            title={`${officer.name} is in trouble`}
            description={`${this.minutesElapsedSince(item.time)} minutes ago`}
          />
        </List.Item>
      )
    } else if (item.type === 'going_into_pursuit') {
      const officer = this.getOfficerById(item.officerId);
      return (
        <List.Item
          key={item.id}>
          <List.Item.Meta
            title={`${officer.name} is going into persuit`}
            description={`${this.minutesElapsedSince(item.time)} minutes ago`}
          />
        </List.Item>
      )
    } else {
      const officer = this.getOfficerById(item.officerId);
      return (
        <List.Item
          key={item.id}>
          <List.Item.Meta
            title={`${officer.name} just spotted a suspect`}
            description={`${this.minutesElapsedSince(item.time)} minutes ago`}
          />
          <b> Features </b>
          {item.attributes.map((attribute, i) => <p key={i}>{attribute}</p>)}
        </List.Item>
      )
    }
  }

  private minutesElapsedSince(time: firebase.firestore.Timestamp) {
    return moment().diff(time.toDate(), 'minutes');
  }

  private getOfficerById = (id: string) => {
    return this.props.officers[id];
  }
}

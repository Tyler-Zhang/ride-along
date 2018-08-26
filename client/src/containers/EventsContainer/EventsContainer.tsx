import * as _ from 'lodash';
import * as React from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'recompose';
import { EVENTS_COLLECTION, OFFICERS_COLLECTION } from '../../config/firebaseConfig';
import { IState } from '../../store/store';
import { IOfficer, WithId } from '../../types/models';
import { Event } from '../../types/models/Event';
import EventsComponent from './EventsComponent/EventsComponent';

interface IProps {
  events: Array<WithId<Event>>;
  officers: Record<string, IOfficer>;
}

class EventsContainer extends React.Component<IProps> {
  public render() {
    console.log(this.props.events)
    const sortedEvents = _.orderBy(this.props.events, 'time', 'desc');

    console.log(sortedEvents)
    
    return (
      <EventsComponent 
        events={sortedEvents}
        officers={this.props.officers}
      />
    )
  }
}

export default compose(
  firestoreConnect([{
      collection: EVENTS_COLLECTION,
      queryParams: ['orderBy=time desc']
    }, 
    OFFICERS_COLLECTION
  ]),

  connect((state: IState) => ({
    events: state.firestore.ordered[EVENTS_COLLECTION],
    officers: state.firestore.data[OFFICERS_COLLECTION]
  }))
)(EventsContainer);

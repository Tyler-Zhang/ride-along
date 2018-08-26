import * as _ from 'lodash';
import * as React from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'recompose';
import { OFFICERS_COLLECTION } from '../../config/firebaseConfig';
import { IState } from '../../store/store';
import { IOfficer, WithId } from '../../types/models';

import { OfficerDestinationService } from '../../services';
import ControlPanelComponent from './ControlPanelComponent/ControlPanelComponent';

interface IProps {
  selfOfficer: WithId<IOfficer>;
}

class ControlPanelContainer extends React.Component<IProps> {
  public render() {
    return (
      <ControlPanelComponent
        officer={this.props.selfOfficer}
        stopNavigating={this.stopNavigating}
      />
    )
  }

  private stopNavigating = () => {
    OfficerDestinationService.stopNavigating(this.props.selfOfficer.id);
  }

}

const USER_WITH_NAME_ALIAS = 'control_panel_container/USER_WITH_NAME';

export default compose(
  /**
   * Get self name
   */
  connect((state: IState) => ({
    name: state.user.name
  })),

  firestoreConnect((props: { name: string }) => [{
    collection: OFFICERS_COLLECTION,
    where: [['name', '==', props.name], []],
    storeAs: USER_WITH_NAME_ALIAS
  }]),

  connect((state: IState) => ({
    selfOfficer: _.get(state.firestore.ordered, [USER_WITH_NAME_ALIAS, '0'])
  }))
)(ControlPanelContainer);

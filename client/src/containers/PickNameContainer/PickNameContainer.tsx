import { notification } from 'antd';
import * as React from 'react';
import { connect } from 'react-redux';
import { firestoreConnect, isEmpty, isLoaded } from 'react-redux-firebase';
import { branch, compose, renderComponent, withState } from 'recompose';
import { OFFICERS_COLLECTION } from '../../config/firebaseConfig';
import { IState } from '../../store/store';
import { IOfficer } from '../../types/models';

import { firestore } from 'firebase';
import { Dispatch } from 'redux';
import { USER_SET_NAME } from '../../store/userReducer';
import PickNameComponent from './PickNameComponent/PickNameComponent';

interface IProps {
  firestore: firebase.firestore.Firestore;
  name: string;
  officerWithName?: IOfficer;
  loginWithName: (name: string) => any;
  setName: (name: string) => any;
}

class PickNameContainer extends React.Component<IProps> {

  public render() {
    const { officerWithName, name } = this.props;

    return (
      <PickNameComponent
        signinType={isEmpty(officerWithName) ? "Create new" : "Sign in as existing"}
        loading={!isLoaded(officerWithName)}
        disabled={!name}
        name={this.props.name}
        onSetName={this.props.setName}
        onSignin={this.onSigninOrCreateOfficer}
      />
    )
  }

  private onSigninOrCreateOfficer = async () => {
    try {

    const { officerWithName, name } = this.props;

    /**
     * The officer exists so we can just sign in by setting
     * our name in the redux store
     */
    if (!isEmpty(officerWithName)) {
      this.props.loginWithName(name);
      notification.success({
        message: `You have signed in as officer ${name}`,
        description: ''
      });
      return;
    }

    /**
     * The user doesn't exist, so let's create it
     */
    this.createOfficer(name);

    notification.success({
      message: 'You have created a new account',
      description: `Welcome officer ${name}`
    });
    } catch (e) {
      notification.error({
        message: 'An error has occurred',
        description: e.message
      });
    }

  }

  private createOfficer = async (name: string) => {
    const officerObject: IOfficer = {
      isInDanger: false,
      isRequestingAssistance: false,
      isTalking: false,
      location: new firestore.GeoPoint(43, -79),
      name,
      squad: '',
      transportation: 'car'      
    };

    await this.props.firestore
      .collection(OFFICERS_COLLECTION)
      .add(officerObject);

    this.props.loginWithName(name);
  }
}

const USER_WITH_NAME_ALIAS = 'pick_name_container/USER_WITH_NAME';

export default compose(
  connect((state: IState) => ({
    name: state.user.name
  }),
    (dispatch: Dispatch) => ({
      loginWithName: (name: string) => dispatch({ 
        type: USER_SET_NAME, payload: { name }
      })
    })
  ),

  /**
   * If the name is already defined, we'll just render the children
   */
  branch(
    (props: any) => !!props.name,
    renderComponent((props: any) => props.children),
  ),

  /**
   * Otherwise we need to get the user to pick a name
   */
  withState('name', 'setName', ''),
  
  firestoreConnect(({ name }: { name: string }) => [{
    collection: OFFICERS_COLLECTION,
    storeAs: USER_WITH_NAME_ALIAS,
    where: [['name', '==', name]]
  }]),

  connect((state: IState) => ({
    officerWithName: state.firestore.ordered[USER_WITH_NAME_ALIAS]
  }))
)(PickNameContainer);

import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { withProps } from "recompose";
import { compose } from "redux";
import { OFFICERS_COLLECTION } from "../config/firebaseConfig";
import { IState } from "../store/store";
import { IOfficer } from '../types/models';

interface IWithProps {
  officers: IOfficer[];
  selfName: string;
}

export default compose(
  firestoreConnect([OFFICERS_COLLECTION]),
  connect((state: IState) => ({
    officers: state.firestore.ordered.officers,
    selfName: state.user.name
  })),
  withProps(({ officers, selfName }: IWithProps) => ({
    selfOfficer: (officers || []).find(officer => officer.name === selfName)
  }))
);

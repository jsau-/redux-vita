import isNil from 'lodash/isNil';
import React from 'react';
import { connect } from 'react-redux';
import VitaForm from '../../vita/VitaForm';
import * as Actions from '../../vita/VitaForm/actions';
import * as Fields from '../../vita/VitaForm/fields';

class Form extends React.Component {
  render() {
    const {
      clearTime,
      decrementCounter,
      incrementCounter,
      restoreDefaults,
      setTimeToNow,
      stateVitaForm,
      toggleEnabled,
    } = this.props;

    return (
      <div>
        <h5>Form Example  (See components/Form.jsx):</h5>
        <pre>VitaForm: {JSON.stringify(stateVitaForm)}</pre>
        <button onClick={restoreDefaults}>Restore defaults</button>
        <p>Time: {isNil(stateVitaForm[Fields.FIELD_TIME]) ? 'None set' : stateVitaForm[Fields.FIELD_TIME].toString()}</p>
        <button onClick={clearTime}>Clear time</button>
        <button onClick={setTimeToNow}>Set time to now</button>
        <p>Counter: {stateVitaForm[Fields.FIELD_COUNTER]}</p>
        <button onClick={decrementCounter}>Decrement counter</button>
        <button onClick={incrementCounter}>Increment counter</button>
        <p>Enabled: {stateVitaForm[Fields.FIELD_ENABLED] ? 'True' : 'False'}</p>
        <button onClick={toggleEnabled}>Toggle enabled</button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  clearTime: () => dispatch(VitaForm.getDispatchable(Actions.CLEAR_TIME)),
  decrementCounter: () => dispatch(VitaForm.getDispatchable(Actions.DECREMENT_COUNTER)),
  incrementCounter: () => dispatch(VitaForm.getDispatchable(Actions.INCREMENT_COUNTER)),
  restoreDefaults: () => dispatch(VitaForm.getDispatchable(Actions.RESTORE_DEFAULTS)),
  setTimeToNow: () => dispatch(VitaForm.getDispatchable(Actions.SET_TIME_TO_NOW)),
  toggleEnabled: () => dispatch(VitaForm.getDispatchable(Actions.TOGGLE_ENABLED)),
});

const mapStateToProps = (state) => ({
  stateVitaForm: state.VitaForm,
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);

import {
  Vita,
  makeActionCreator,
  reducerDecrementField,
  reducerIncrementField,
  reducerRemoveField,
  reducerSetField,
  reducerToggleBooleanField
} from 'redux-vita';
import {
  INCREMENT_COUNTER,
  DECREMENT_COUNTER,
  SET_TIME_TO_NOW,
  CLEAR_TIME,
  TOGGLE_ENABLED,
} from './actions';
import { FIELD_COUNTER, FIELD_TIME, FIELD_ENABLED } from './fields';

const VitaForm = new Vita({ [FIELD_COUNTER]: 0, [FIELD_TIME]: new Date(), [FIELD_ENABLED]: true });

VitaForm
  .registerActionCreator(INCREMENT_COUNTER, makeActionCreator(INCREMENT_COUNTER))
  .registerActionCreator(DECREMENT_COUNTER, makeActionCreator(DECREMENT_COUNTER))
  .registerActionCreator(SET_TIME_TO_NOW, makeActionCreator(SET_TIME_TO_NOW))
  .registerActionCreator(CLEAR_TIME, makeActionCreator(CLEAR_TIME))
  .registerActionCreator(TOGGLE_ENABLED, makeActionCreator(TOGGLE_ENABLED))
  .registerReducer(INCREMENT_COUNTER, (state) => reducerIncrementField(state, FIELD_COUNTER))
  .registerReducer(DECREMENT_COUNTER, (state) => reducerDecrementField(state, FIELD_COUNTER))
  .registerReducer(SET_TIME_TO_NOW, (state) => reducerSetField(state, FIELD_TIME, new Date()))
  .registerReducer(CLEAR_TIME, (state) => reducerRemoveField(state, FIELD_TIME))
  .registerReducer(TOGGLE_ENABLED, (state) => reducerToggleBooleanField(state, FIELD_ENABLED));

export default VitaForm;

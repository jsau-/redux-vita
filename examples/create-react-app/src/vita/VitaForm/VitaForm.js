import {
  Vita,
  makeActionCreator,
  reducerDecrementField,
  reducerIncrementField,
  reducerRemoveField,
  reducerSetField,
  reducerSetManyFields,
  reducerToggleBooleanField
} from 'redux-vita';
import {
  CLEAR_TIME,
  DECREMENT_COUNTER,
  INCREMENT_COUNTER,
  RESTORE_DEFAULTS,
  SET_TIME_TO_NOW,
  TOGGLE_ENABLED,
} from './actions';
import { FIELD_COUNTER, FIELD_TIME, FIELD_ENABLED } from './fields';

const VitaForm = new Vita({ [FIELD_COUNTER]: 0, [FIELD_TIME]: undefined, [FIELD_ENABLED]: true });

VitaForm
  .registerActionCreator(CLEAR_TIME, makeActionCreator(CLEAR_TIME))
  .registerActionCreator(DECREMENT_COUNTER, makeActionCreator(DECREMENT_COUNTER))
  .registerActionCreator(INCREMENT_COUNTER, makeActionCreator(INCREMENT_COUNTER))
  .registerActionCreator(RESTORE_DEFAULTS, makeActionCreator(RESTORE_DEFAULTS))
  .registerActionCreator(SET_TIME_TO_NOW, makeActionCreator(SET_TIME_TO_NOW))
  .registerActionCreator(TOGGLE_ENABLED, makeActionCreator(TOGGLE_ENABLED))
  .registerReducer(CLEAR_TIME, (state) => reducerRemoveField(state, FIELD_TIME))
  .registerReducer(DECREMENT_COUNTER, (state) => reducerDecrementField(state, FIELD_COUNTER))
  .registerReducer(INCREMENT_COUNTER, (state) => reducerIncrementField(state, FIELD_COUNTER))
  .registerReducer(RESTORE_DEFAULTS, (state) => reducerSetManyFields(state, {
    [FIELD_COUNTER]: 0,
    [FIELD_TIME]: undefined,
    [FIELD_ENABLED]: true,
  }))
  .registerReducer(SET_TIME_TO_NOW, (state) => reducerSetField(state, FIELD_TIME, new Date()))
  .registerReducer(TOGGLE_ENABLED, (state) => reducerToggleBooleanField(state, FIELD_ENABLED));

export default VitaForm;

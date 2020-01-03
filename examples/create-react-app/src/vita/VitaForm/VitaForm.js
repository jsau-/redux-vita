import {
  Vita,
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
  .registerSlice(
    CLEAR_TIME,
    (state) => reducerRemoveField(state, FIELD_TIME),
  )
  .registerSlice(
    DECREMENT_COUNTER,
    (state) => reducerDecrementField(state, FIELD_COUNTER),
  )
  .registerSlice(
    INCREMENT_COUNTER,
    (state) => reducerIncrementField(state, FIELD_COUNTER),
  )
  .registerSlice(
    RESTORE_DEFAULTS,
    (state) => reducerSetManyFields(state, {
      [FIELD_COUNTER]: 0,
      [FIELD_TIME]: undefined,
      [FIELD_ENABLED]: true,
    }),
  )
  .registerSlice(
    SET_TIME_TO_NOW,
    (state) => reducerSetField(state, FIELD_TIME, new Date()),
  )
  .registerSlice(
    TOGGLE_ENABLED,
    (state) => reducerToggleBooleanField(state, FIELD_ENABLED),
  );

export default VitaForm;

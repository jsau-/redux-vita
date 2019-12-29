import { combineReducers } from 'redux';
import VitaFoo from './vita/VitaFoo';

export default combineReducers({
  VitaFoo: VitaFoo.reduce,
});
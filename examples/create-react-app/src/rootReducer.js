import { combineReducers } from 'redux';
import VitaAPI from './vita/VitaAPI';
import VitaFoo from './vita/VitaFoo';

export default combineReducers({
  VitaAPI: VitaAPI.reduce,
  VitaFoo: VitaFoo.reduce,
});
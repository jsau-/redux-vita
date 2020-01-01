import { combineReducers } from 'redux';
import VitaAPI from './vita/VitaAPI';

export default combineReducers({
  VitaAPI: VitaAPI.reduce,
});
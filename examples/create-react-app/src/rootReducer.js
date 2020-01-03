import { combineReducers } from 'redux';
import VitaAPI from './vita/VitaAPI';
import VitaForm from './vita/VitaForm';

export default combineReducers({
  VitaAPI: VitaAPI.reduce,
  VitaForm: VitaForm.reduce,
});

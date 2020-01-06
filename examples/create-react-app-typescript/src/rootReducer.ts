import { combineReducers } from 'redux';
import VitaAPI from './vita/VitaAPI';
import { APIState } from './vita/VitaAPI/types';

export interface RootState {
  VitaAPI: APIState,
};

export const rootReducer = combineReducers({
  VitaAPI: VitaAPI.reduce,
});

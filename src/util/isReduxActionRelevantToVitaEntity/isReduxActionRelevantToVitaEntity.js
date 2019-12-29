import has from 'lodash/has';
import { KEY_ENTITY_NAME, KEY_IDENTIFER, KEY_PAYLOAD } from '../deltaCreator/constants';

/**
 * @param {string} strVitaEntityName - Entity name for VitaEntity.
 * @param {object} objReduxAction - Occurring Redux action.
 * @returns {boolean} Is the Redux action relevant for a given VitaEntity
 */
export default (strVitaEntityName, objReduxAction) => {
  /*
   * If occurring Redux action doesn't match the signature we'd expect for
   * a DeltaObject generated within this library, it's not relevant...
   */
  if (
    !has(objReduxAction, KEY_ENTITY_NAME) ||
    !has(objReduxAction, KEY_IDENTIFER) ||
    !has(objReduxAction, KEY_PAYLOAD)
  ) {
    return false;
  }

  const { [KEY_ENTITY_NAME]: strEntityNameForOccurringReduxAction } = objReduxAction;

  if (strVitaEntityName !== strEntityNameForOccurringReduxAction) {
    return false;
  }

  return true;
};

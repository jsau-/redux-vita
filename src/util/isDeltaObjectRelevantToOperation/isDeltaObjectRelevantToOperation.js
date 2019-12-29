import { KEY_ENTITY_NAME, KEY_IDENTIFER } from '../deltaCreator/constants';

export default (strEntityName, strIdentifier, objDelta) => {
  const {
    [KEY_ENTITY_NAME]: strEntityNameForOccurringDelta,
    [KEY_IDENTIFER]: strIdentifierForOccurringDelta,
  } = objDelta;

  if (strEntityName !== strEntityNameForOccurringDelta) {
    return false;
  }

  if (strIdentifier !== strIdentifierForOccurringDelta) {
    return false;
  }

  return true;
};

import IDENTIFIER_CLEAR_ALL from './identifier';
import Operation from '../../Operation';
import deltaCreator from '../../util/deltaCreator';

export default (strEntityName) => new Operation(
  strEntityName,
  IDENTIFIER_CLEAR_ALL,
  // Delta creator
  () => deltaCreator(strEntityName, IDENTIFIER_CLEAR_ALL),
  // Delta handler
  () => ({}),
);

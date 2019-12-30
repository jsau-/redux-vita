import fetch from 'fetch';
import { Operation, VitaEntity } from 'redux-vita';

const VitaAPI = new VitaEntity(
  'todos',
  { is_loading: false, loaded_todos: [] },
);

VitaAPI.registerOperation(new Operation(
  'todos',
  'fetch_todos',
  () => (dispatch) => {
    dispatch(VitaAPI.getDispatchableSetField('is_loading', true));

    fetch.fetchUrl("https://jsonplaceholder.typicode.com/todos/", function(error, meta, body) {
      dispatch(VitaAPI.getDispatchableSetField('is_loading', false));
      dispatch(VitaAPI.getDispatchableSetField('loaded_todos', JSON.parse(body)));
    });
  },
  () => {},
));

export default VitaAPI;
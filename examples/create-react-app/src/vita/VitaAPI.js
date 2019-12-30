import fetch from 'fetch';
import { VitaEntity } from 'redux-vita';

const VitaAPI = new VitaEntity(
  'todos',
  { is_loading: false, loaded_todos: [] },
);

VitaAPI
  .createAndRegisterOperation(
    'fetch_todos_begin',
    () => VitaAPI.getDispatchableSetManyFields({
      'is_loading': true,
      'loaded_todos': [],
    }),
  )
  .createAndRegisterOperation(
    'fetch_todos_finish',
    arrTodos => VitaAPI.getDispatchableSetManyFields({
      'is_loading': false,
      'loaded_todos': arrTodos,
    }),
  )
  .createAndRegisterOperation(
    'fetch_todos',
    () => (dispatch) => {
      dispatch(VitaAPI.getDispatchableActionObjectForOperation('fetch_todos_begin'));

      fetch.fetchUrl(
        "https://jsonplaceholder.typicode.com/todos/",
        (error, meta, body) => dispatch(
          VitaAPI.getDispatchableActionObjectForOperation('fetch_todos_finish', JSON.parse(body)),
        ),
      );
    },
  );

export default VitaAPI;
import axios from 'axios';
import { Vita, makeActionCreator, reducerSetManyFields } from 'redux-vita';
import { FETCH_TODOS, FETCH_TODOS_BEGIN, FETCH_TODOS_FINISH } from './actions';
import { APIState, APIFetchFinish, Todo } from './types';

const initialState: APIState = { is_loading: false, loaded_todos: [] };

const VitaAPI = new Vita(initialState);

VitaAPI
  .registerSlice(
    FETCH_TODOS_BEGIN,
    (state: APIState) => reducerSetManyFields(state, { is_loading: true, loaded_todos: [] }),
  )
  .registerSlice(
    FETCH_TODOS_FINISH,
    (state: APIState, action: APIFetchFinish) => reducerSetManyFields(
      state,
      { is_loading: false, loaded_todos: action.loaded_todos },
    ),
    makeActionCreator(FETCH_TODOS_FINISH, (arrTodos: Todo[]): APIFetchFinish => ({ loaded_todos: arrTodos })),
  )
  .registerAction(
    FETCH_TODOS,
    () => (dispatch: Function) => {
      dispatch(VitaAPI.action(FETCH_TODOS_BEGIN));

      axios
        .get("https://jsonplaceholder.typicode.com/todos/")
        .then(result => dispatch(VitaAPI.action(FETCH_TODOS_FINISH, result.data)))
        .catch(() => dispatch(VitaAPI.action(FETCH_TODOS_FINISH, [])));
    },
  );

export default VitaAPI;

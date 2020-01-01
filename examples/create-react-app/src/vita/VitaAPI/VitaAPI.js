import fetch from 'fetch';
import { VitaEntity, makeActionCreator, reducerHelpers } from 'redux-vita';
import { FETCH_TODOS, FETCH_TODOS_BEGIN, FETCH_TODOS_FINISH } from './actions';
import { FIELD_IS_LOADING, FIELD_LOADED_TODOS } from './fields';

const VitaAPI = new VitaEntity({ is_loading: false, loaded_todos: [] });

VitaAPI
  .registerActionCreator(FETCH_TODOS_BEGIN, makeActionCreator(FETCH_TODOS_BEGIN))
  .registerActionCreator(FETCH_TODOS_FINISH, makeActionCreator(FETCH_TODOS_FINISH, arrTodos => ({ arrTodos })))
  .registerActionCreator(
    FETCH_TODOS,
    () => (dispatch) => {
      dispatch(VitaAPI.getDispatchable(FETCH_TODOS_BEGIN));

      fetch.fetchUrl(
        "https://jsonplaceholder.typicode.com/todos/",
        (error, meta, body) => dispatch(VitaAPI.getDispatchable(FETCH_TODOS_FINISH, JSON.parse(body))),
      );
    },
  )
  .registerReducer(
    FETCH_TODOS_BEGIN,
    (state) => reducerHelpers.setManyFields(
      state,
      {
        [FIELD_IS_LOADING]: true,
        [FIELD_LOADED_TODOS]: [],
     },
    ),
  )
  .registerReducer(
    FETCH_TODOS_FINISH,
    (state, action) => reducerHelpers.setManyFields(
      state,
      {
        [FIELD_IS_LOADING]: false,
        [FIELD_LOADED_TODOS]: action.arrTodos,
      },
    ),
  );

export default VitaAPI;
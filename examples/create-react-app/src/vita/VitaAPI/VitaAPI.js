import fetch from 'fetch';
import { Vita, makeActionCreator, reducerSetManyFields } from 'redux-vita';
import { FETCH_TODOS, FETCH_TODOS_BEGIN, FETCH_TODOS_FINISH } from './actions';
import { FIELD_IS_LOADING, FIELD_LOADED_TODOS } from './fields';

const VitaAPI = new Vita({ [FIELD_IS_LOADING]: false, [FIELD_LOADED_TODOS]: [] });

VitaAPI
  .registerSlice(
    FETCH_TODOS_BEGIN,
    (state) => reducerSetManyFields(state, { [FIELD_IS_LOADING]: true, [FIELD_LOADED_TODOS]: [] }),
  )
  .registerSlice(
    FETCH_TODOS_FINISH,
    (state, action) => reducerSetManyFields(state, { [FIELD_IS_LOADING]: false, [FIELD_LOADED_TODOS]: action[FIELD_LOADED_TODOS] }),
    makeActionCreator(FETCH_TODOS_FINISH, arrTodos => ({ [FIELD_LOADED_TODOS]: arrTodos })),
  )
  .registerAction(
    FETCH_TODOS,
    () => (dispatch) => {
      dispatch(VitaAPI.action(FETCH_TODOS_BEGIN));

      fetch.fetchUrl(
        "https://jsonplaceholder.typicode.com/todos/",
        (error, meta, body) => dispatch(VitaAPI.action(FETCH_TODOS_FINISH, JSON.parse(body))),
      );
    },
  );

export default VitaAPI;

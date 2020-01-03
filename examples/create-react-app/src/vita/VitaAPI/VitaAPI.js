import fetch from 'fetch';
import { Vita, makeActionCreator } from 'redux-vita';
import { FETCH_TODOS, FETCH_TODOS_BEGIN, FETCH_TODOS_FINISH } from './actions';
import { FIELD_IS_LOADING, FIELD_LOADED_TODOS } from './fields';

const VitaAPI = new Vita({ [FIELD_IS_LOADING]: false, [FIELD_LOADED_TODOS]: [] });

VitaAPI
  .registerActionCreator(
    FETCH_TODOS_BEGIN,
    makeActionCreator(FETCH_TODOS_BEGIN),
  )
  .registerActionCreator(
    FETCH_TODOS_FINISH,
    makeActionCreator(FETCH_TODOS_FINISH, arrTodos => ({ [FIELD_LOADED_TODOS]: arrTodos })),
  )
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
    (state) => ({
      ...state,
      [FIELD_IS_LOADING]: true,
      [FIELD_LOADED_TODOS]: [],
    })
  )
  .registerReducer(
    FETCH_TODOS_FINISH,
    (state, action) => ({
      ...state,
      [FIELD_IS_LOADING]: false,
      [FIELD_LOADED_TODOS]: action[FIELD_LOADED_TODOS],
    })
  );

export default VitaAPI;

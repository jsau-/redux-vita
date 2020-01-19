import React from 'react';
import { connect } from 'react-redux';
import VitaAPI from './vita/VitaAPI';
import * as Actions from './vita/VitaAPI/actions';
import * as Types from './vita/VitaAPI/types';
import { RootState } from './rootReducer';

type AppProps = {
  fetchTodos: Function,
  stateVitaAPI: Types.APIState,
};

const App: React.FC<AppProps> = (props: AppProps) => {
  const { stateVitaAPI, fetchTodos } = props;

    return (
      <div>
        <h5>API Example (See components/API.jsx):</h5>
        <pre>VitaAPI: {JSON.stringify(stateVitaAPI)}</pre>
        <button onClick={() => fetchTodos()}>Fetch data from API</button>
        {stateVitaAPI.is_loading && <p>Loading!</p>}
        {!stateVitaAPI.is_loading && (
          <table>
            <tbody>
              <tr>
                <th>User Id</th>
                <th>Id</th>
                <th>Title</th>
                <th>Completed</th>
              </tr>
              {stateVitaAPI.loaded_todos.map(todo => (
                <tr>
                  <td>{todo.userId}</td>
                  <td>{todo.id}</td>
                  <td>{todo.title}</td>
                  <td>{todo.completed}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    );
}

const mapStateToProps = (state: RootState) => ({
  stateVitaAPI: state.VitaAPI,
});

const mapDispatchToProps = (dispatch: Function) => ({
  fetchTodos: () => dispatch(VitaAPI.action(Actions.FETCH_TODOS)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

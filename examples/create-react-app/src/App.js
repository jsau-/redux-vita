import React from 'react';
import { connect } from 'react-redux';
import Form from './components/Form';
import VitaAPI from './vita/VitaAPI';
import { FETCH_TODOS } from './vita/VitaAPI/actions';
import { FIELD_IS_LOADING, FIELD_LOADED_TODOS } from './vita/VitaAPI/fields';

class App extends React.Component {
  render() {
    const { stateVitaAPI, fetchTodos } = this.props;

    return (
      <div>
        <Form />
        <h5>API Example:</h5>
        <pre>VitaAPI: {JSON.stringify(stateVitaAPI)}</pre>
        <button onClick={fetchTodos}>Fetch data from API</button>
        {stateVitaAPI[FIELD_IS_LOADING] && <p>Loading!</p>}
        {!stateVitaAPI[FIELD_IS_LOADING] && (
          <table>
            <tbody>
              <tr>
                <th>User Id</th>
                <th>Id</th>
                <th>Title</th>
                <th>Completed</th>
              </tr>
              {stateVitaAPI[FIELD_LOADED_TODOS].map(todo => (
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
}

const mapDispatchToProps = (dispatch) => ({
  fetchTodos: () => dispatch(VitaAPI.getDispatchable(FETCH_TODOS)),
});

const mapStateToProps = state => ({
  stateVitaAPI: state.VitaAPI,
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

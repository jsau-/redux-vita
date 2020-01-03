import React from 'react';
import { connect } from 'react-redux';
import VitaAPI from '../../vita/VitaAPI';
import * as Actions from '../../vita/VitaAPI/actions';
import * as Fields from '../../vita/VitaAPI/fields';

class API extends React.Component {
  render() {
    const { stateVitaAPI, fetchTodos } = this.props;

    return (
      <div>
        <h5>API Example (See components/API.jsx):</h5>
        <pre>VitaAPI: {JSON.stringify(stateVitaAPI)}</pre>
        <button onClick={fetchTodos}>Fetch data from API</button>
        {stateVitaAPI[Fields.FIELD_IS_LOADING] && <p>Loading!</p>}
        {!stateVitaAPI[Fields.FIELD_IS_LOADING] && (
          <table>
            <tbody>
              <tr>
                <th>User Id</th>
                <th>Id</th>
                <th>Title</th>
                <th>Completed</th>
              </tr>
              {stateVitaAPI[Fields.FIELD_LOADED_TODOS].map(todo => (
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
  fetchTodos: () => dispatch(VitaAPI.getDispatchable(Actions.FETCH_TODOS)),
});

const mapStateToProps = state => ({
  stateVitaAPI: state.VitaAPI,
});

export default connect(mapStateToProps, mapDispatchToProps)(API);

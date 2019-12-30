import React from 'react';
import { connect } from 'react-redux';
import VitaAPI from './vita/VitaAPI';
import VitaFoo from './vita/VitaFoo';

class App extends React.Component {
  clearName = () => {
    const { vitafooSetName } = this.props;
    vitafooSetName('');
  }

  handleChangeName = (event) => {
    const {vitafooSetName } = this.props;
    vitafooSetName(event.target.value);
  }

  render() {
    const { stateVitaAPI, stateVitaFoo, vitaapiFetchTodos } = this.props;

    return (
      <div className="App">
        <div>
          <h5>Form Example:</h5>
          <pre>VitaFoo: {JSON.stringify(stateVitaFoo)}</pre>
          <button onClick={this.clearName}>Clear Name</button>
          <label htmlFor="name">Name</label>
          <input id="name" type="text" value={stateVitaFoo.name} onChange={this.handleChangeName} />
        </div>
        <hr />
        <div>
          <h5>API Example:</h5>
          <pre>VitaAPI: {JSON.stringify(stateVitaAPI)}</pre>
          <button onClick={vitaapiFetchTodos}>Fetch data from API</button>
          {stateVitaAPI.is_loading && <p>Loading!</p>}
          {!stateVitaAPI.is_loading && (
            <table>
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
            </table>
          )}
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  vitaapiFetchTodos: () => dispatch(VitaAPI.getDispatchableActionObjectForOperation('fetch_todos')),
  vitafooSetName: (name) => dispatch(VitaFoo.getDispatchableSetField('name', name)),
});

const mapStateToProps = state => ({
  stateVitaAPI: state.VitaAPI,
  stateVitaFoo: state.VitaFoo,
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

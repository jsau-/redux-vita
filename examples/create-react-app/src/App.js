import React from 'react';
import { connect } from 'react-redux';
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
    const { name } = this.props;

    return (
      <div className="App">
        <pre>Props:
          {
            JSON.stringify(this.props)
          }
        </pre>
        <label htmlFor="name">Name</label>
        <input id="name" type="text" value={name} onChange={this.handleChangeName} />
        <button onClick={this.clearName}>Clear Name</button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  vitafooSetName: (name) => dispatch(VitaFoo.getDispatchableActionObjectForOperation('SET_FIELD', 'name', name)),
});

const mapStateToProps = state => ({
  ...state.VitaFoo,
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

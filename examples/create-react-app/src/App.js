import React from 'react';
import API from './components/API';
import Form from './components/Form';

class App extends React.Component {
  render() {
    return (
      <div>
        <Form />
        <hr />
        <API />
      </div>
    );
  }
}

export default App;

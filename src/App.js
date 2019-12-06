import React, {Component} from 'react';
import Message from './container/Message/Message';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends Component {

  render() {
    return (
      <div className='App'>
        <Message />
      </div>
      )
    }
  }
  
export default App;

import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

import BearList from './components/BearList';

class App extends Component {
  constructor() {
    super();
    this.state = {
      bears: []
    }
  }

  componentWillMount() {
    axios
      .get('http://localhost:5000/api/bears')
      .then(res => {
        // console.log('data:', res.data.bears);
        this.setState({ bears: res.data.bears})
      })
      .catch(error => {
        console.log(error);
      })
  }



  render() {
    return (
      <div className="App">
        <div>
          <BearList bears={this.state.bears}/>
        </div>
      </div>
    );
  }
}

export default App;

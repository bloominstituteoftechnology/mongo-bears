import React, { Component } from 'react';
import './App.css';
import axios from 'axios';


class App extends Component
{
  constructor()
  {
    super();
    
    this.state = {
      bears: [{}]
    }
  }
  componentWillMount()
  {
    axios

      .get( 'http://localhost:5000/api/bears' )
      .then( respond =>
      {
        this.setState( { bears: respond.data } )
      } )
      
    }
  render()
  {
  
    return (
      <div className="App">
        {this.state.bears.map( bear =>
        {
          return (
            <div>{bear.species}</div>
          )
        })}
      </div>
    )
  };
}

  


export default App;

import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import bearController from  './bearModel/bearController.js' ;
import bearModel from './bearModel/bearModel.js';
import { WSAVERNOTSUPPORTED } from 'constants';

class App extends Component
{
  constructor()
  {
    super();
    this.state = {
      bearController: [],
      bearModel: null
    };
  }
  addToBearController = bear =>
  {
    const bearController = this.state.savedList;
    const findbear = bearController.find( el => bear.id === el.id );
    if ( findbear )
    {
      this.setState( { bearModel: `you've already saved that bear!` } );
      setTimeout( () => this.setState( { bearModel: null } ), 2000 );
    } else
    {
      bearController.push( bear );
    }
    this.setState( { bearController } );
  };
  render()
  {
    const { bearModel } = this.state;
    return (
      <div>
        {bearModel !== null ? (
          <h3 className="bear-warning">{bearModel}</h3>
        ) : null}
        <bearController list={this.state.bearController} />
        <Route exact path="/" react-bears={bearModel}/>
        <Route 
          path="/bearModel/:id"
          render={props => (
          <bear{...props} addTobearController={this.addToSavedList}/>
          )}
        />  
      </div>
    );
  }
}

export default App;

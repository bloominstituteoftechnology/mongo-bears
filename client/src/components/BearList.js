import React, { Component } from 'react';

class BearList extends Component {
    render() {
        return (
            <div>
               <h1>Lists of Bears</h1>
                {this.props.bears.map(bear => {
                    return (
                        <div key={bear._id}>
                            <h4>{bear.species}</h4>
                            <p>{bear.latinName}</p>
                        </div>
                    )
                })}
            </div>
        );
    }
}

export default BearList;
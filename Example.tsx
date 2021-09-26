import React, { Component } from 'react';
// import { Dropdown } from 'react-native-material-dropdown';

export default class Example extends Component {
  render() {
    let data = [{
      value: 'Banana',
    }, {
      value: 'Mango',
    }, {
      value: 'Pear',
    }];
    const myArray = ['Jack', 'Mary', 'John', 'Krish', 'Navin'];  
    return (
      // <Dropdown
      //   label='Favorite Fruit'
      //   data={data}
      // />
  
      <div className="container">
         {myArray.map(name => (  
          <li>  
            {name}  
          </li>  
        ))}  
        <p>Vijay</p>
      </div>
    );
  }
}
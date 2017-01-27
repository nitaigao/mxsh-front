import React, { Component } from 'react';
import { Link } from 'react-router';

export default class Home extends Component {
  render() {
    return (
      <div id="home">
        <h1>Home</h1>
        <form onSubmit={this.onLogin}>
          <input type='text' id='email' />
          <input type='submit' value='sign in' />
        </form>    
      </div>
    );
  }

  onLogin = (e) => {
    e.preventDefault()
    console.log("Logging in!")
  }
}
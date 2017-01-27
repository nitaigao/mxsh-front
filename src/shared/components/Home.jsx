import React, { Component } from 'react';
import { Link } from 'react-router';

export default class Home extends Component {
  render() {
    return (
      <div id="home">
        <h1>I am a server side rendered React beast</h1>
        <h2>I am coming for your babies</h2>
      </div>
    );
  }

  onLogin = (e) => {
    e.preventDefault()
    console.log("Logging in!")
  }
}
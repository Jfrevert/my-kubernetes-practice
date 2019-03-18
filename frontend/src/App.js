import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor () {
    super()
    this.state = {
      users: this.getUsers()
    }

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick = () => {
    let data = {name: "Justin", email: "jj@gmail.com"}
    this.postData('http://localhost/new-user', data)
      .then(function(response) {
        return response.json();
      })
      .catch(err => {
        console.log(err)
      })
  }

  postData = (url, data) => {
    return fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    })
  }


  render () {
    const { users } = this.state
    return (
      <div className='button__container'>
        <button className='submitUserButton' onClick={this.handleClick}>Register User</button>
      </div>
    )
  }
}
export default App
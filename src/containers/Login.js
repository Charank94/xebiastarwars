import React, { Component } from 'react';
import axios from 'axios';
import './Login.css'


class Login extends Component {

  state = {
    userslist: [],
    username: '',
    password: '',
    invalidLogin: false

  }

  componentDidMount() {
    axios.get('https://swapi.co/api/people')
      .then(response => {
        this.setState({ userslist: response.data.results })
      })

  }

  nameInputHandler = (e) => {
    this.setState({ username: e.target.value })
  };

  passwordInputHandler = (e) => {
    this.setState({ password: e.target.value })
  };

  handleOnSubmit = (e) => {
    e.preventDefault();
    let names = {};
    if (this.state.userslist.length > 0) {
      this.state.userslist.forEach((user) => {
        names[user.name] = user.birth_year
      })
    }
    Object.keys(names).forEach((item) => {
      if (item === this.state.username && names[item] === this.state.password) {
        this.props.history.push('/Planets');
      }
      else {
        this.setState({ invalidLogin: true })
      }
    })
  };
  render() {

    let errorMessage = ''
    if (this.state.invalidLogin) {
      errorMessage = <p style={{ color: "red" }}>INVALID USER!!</p>
    }

    return (

      <div className='div'>

        <form onSubmit={this.handleOnSubmit}>
          <div >
            <input className='input' type='text' placeholder='Username' onChange={this.nameInputHandler} />
          </div>
          <div >
            <input className='input' type='password' placeholder='Password' onChange={this.passwordInputHandler} />
          </div>
          <div >
            <button className='btn' type='submit'>Log In</button>
          </div>
        </form>
        {errorMessage}
      </div>

    )

  }
}

export default Login;
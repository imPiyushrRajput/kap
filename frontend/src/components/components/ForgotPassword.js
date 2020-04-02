import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import validator from 'email-validator'

class ForgotPassword extends Component {
  constructor() {
    super()
    this.state = {
      email: '',
      showError: false,
      emailError: false
    }
  }

  handleChange(event) {
    const { name, value } = event.target
    const data = { ...this.state, [name]: value }
    const check = { ...data, emailError: this.validateEmail(data.email) }
    this.setState({
      ...check
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    if (this.state.email === '') {
      this.setState({
        showError: false,
        messageFromServer: ''
      })
    } else {
      axios
        .post('/api/forgotPassword', { email: this.state.email })
        .then(res => {
          console.log(res)
          if (res.data === 'email not in db') {
            this.setState({
              returnError: true,
              messageFromServer: ''
            })
          } else if (res.data === 'recovery eail sent') {
            this.setState({
              returnError: false,
              messageFromServer: res.data
            })
          }
        })
        .catch(error => console.log(error))
    }
  }

  validateEmail(email) {
    if (email.length === 0) return false
    return !validator.validate(email)
  }

  render() {
    const { email, emailError, returnError } = this.state
    return (

      <div className='modal is-active'>
        <div className='modal-background'></div>

        <div className="modal-content">

          <h1>Reset Your Password Here</h1>

          <form onSubmit={(event) => this.handleSubmit(event)}>
            <input
              onChange={(event) => this.handleChange(event)}
              type="email"
              placeholder='Email Address'
              name='email'
              value={email}>
            </input>
            {emailError && <p>Email Address is not valid.</p>}
            {returnError && <p>This email is not recognized. Please try again or register for new account</p>}
            <div className='submit'>
              <button> Reset Password </button>
            </div>
          </form>
          <Link to='/register' > <p> Register for an account </p></Link>
          <Link to='/'> <p> Home </p></Link>
        </div>
      </div>
    )
  }


}

export default ForgotPassword
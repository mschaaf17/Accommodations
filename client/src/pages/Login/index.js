import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import {useMutation} from '@apollo/client'
import { LOGIN_USER } from '../../utils/mutations'
import Auth from '../../utils/auth'
import './index.css'


const Login = props => {
    const [formState, setFormState] = useState({ username: '', password: ''})
    const [login, {error}] = useMutation(LOGIN_USER)
    // update state based on form input changes
    const handleChange = event => {
        const {name, value} = event.target

        setFormState({
            ...formState,
            [name]: value
        })
    }

    // submit form
    const handleFormSubmit = async event => {
        event.preventDefault()
        try {
          const {data} = await login({
            variables: {...formState},
          })
          Auth.login(data.login.token)
          window.location.href = "/accommodations"

        } catch (e) {
          console.log(e)
        }
        // clear form values
        setFormState({
            username: '',
            password: ''
        })
    }

    return (
        <main className="">
      <div className="">
        <div className="">
          <h4 className="login-title">Login</h4>
          <div className="login-form">
            <form className="user-input"onSubmit={handleFormSubmit}>
              <input
                className="form-input"
                placeholder="username"
                name="username"
                type="username"
                id="username"
                value={formState.username}
                onChange={handleChange}
              />
              <input
                className="form-input"
                placeholder="******"
                name="password"
                type="password"
                id="password"
                value={formState.password}
                onChange={handleChange}
              />
              <button className="" type="submit">
                Submit
              </button>
            </form>
            {error && <div>Login failed</div>}
          </div>
        </div>
      </div>
      <div>
          <Link className ="new-member"to="/signup"> New member? Sign up here</Link>

          </div>
    </main>
    )
}

export default Login;
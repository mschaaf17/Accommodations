import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import {useMutation, useQuery} from '@apollo/client'
import {QUERY_ME} from '../../utils/queries'
import { LOGIN_USER } from '../../utils/mutations'
import Auth from '../../utils/auth'
import './index.css'


const Login = props => {
    const [formState, setFormState] = useState({ username: '', password: ''})
    const [login, {error}] = useMutation(LOGIN_USER)
    const {loading, data} = useQuery(QUERY_ME)
    const admin = data?.me.isAdmin || {}

    // update state based on form input changes
    const handleChange = event => {
        const {name, value} = event.target
        setFormState({
            ...formState,
            [name]: value
        })
    }

    //if user is an admin direct the user to /TeacherDataTracking
    const handleFormSubmit = async event => {
        event.preventDefault()
        try {
          const {data} = await login({
            variables: {...formState},
          })
          Auth.login(data.login.token)
          //not working correctly
          //Auth.loggedIn() &&
           admin == true ? (
          window.location.href = "/teacherdata"
          ) : (
            window.location.href ="/studentAccommodations"
          )

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
              <button className="submit-btn" type="submit">
                Submit
              </button>
            </form>
            {error && <div>Login failed</div>}
          </div>
        </div>
      </div>
      <div className='start-section'>
      <p className="not-a-member"> Not yet a member? {'  '}
        <Link className="signup " to ="/signup">Sign up</Link>
        </p>
          </div>
    </main>
    )
}

export default Login;
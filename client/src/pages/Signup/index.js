import React, {useState} from 'react'
import { useMutation } from '@apollo/client'
import { ADD_USER } from '../../utils/mutations'
import { Link } from 'react-router-dom'
import './index.css'


import Auth from '../../utils/auth'

const Signup = () => {
    const [formState, setFormState] = useState({ username: '', password: ''})
    const [addUser, {error}] = useMutation(ADD_USER)
    const handleChange = event => {
        const { name, value } = event.target

        setFormState({
            ...formState,
            [name]: value
        })
    }

    const handleFormSubmit = async event => {
        event.preventDefault()
        try{
          const {data} = await addUser({
            variables: {...formState}
          })
          Auth.login(data.addUser.token)
          window.location.href = "/accommodations"
          
        } catch (e) {
          console.error(e)
        }
    }

    return (
<main className="">
      <div className="">
        <div className="">
          <h4 className="signup-title">Sign Up</h4>
          <div className="signup-form">
            <form className="user-input" onSubmit={handleFormSubmit}>
              <input
                className="form-input"
                placeholder="Type a username"
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

            {error && <div>Signup Failed </div>}
          </div>
        </div>
      </div>
      <div>
          <Link className="login" to="/login"> Already a member? Login</Link>

          </div>
    </main>
  );
}

export default Signup
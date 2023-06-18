import React, {useState, userParam} from 'react'
import {Link} from 'react-router-dom'
import {useMutation, useQuery} from '@apollo/client'
import {QUERY_ME} from '../../utils/queries'
import { LOGIN_USER } from '../../utils/mutations'
import Auth from '../../utils/auth'
import './index.css'

const Login = props => {
  // const { username: userParam } = useParams()
    const [formState, setFormState] = useState({ username: '', password: ''})
    const [login, {error}] = useMutation(LOGIN_USER)
    const {loading, data} = useQuery(QUERY_ME)
    const admin = data?.me.isAdmin
    console.log(data)
    
    if (loading) {
      return <div className='loader'>Loading...</div>;
    }

    // update state based on form input changes
    const handleChange = event => {
        const {name, value} = event.target
        
        setFormState({
            ...formState,
            [name]: value
        })
    }
    
    const handleFormSubmit = async event => {
      event.preventDefault();
      try {
        const { data } = await login({
          variables: { ...formState },
        });
        //seems to break with debugger here
        Auth.login(data.login.token);
        window.location.href = "/Loading";
      //not seeming to wait for loading before redirecting? tried making a seperate page at that still didnt work  
        // if (!loading && Auth.loggedIn() && admin != true) {
        //   window.location.href = "/studentAccommodations";
        // } else {
        //   window.location.href = `/teacherdata/${data?.me.username}`;
        // }
        
      } catch (e) {
        console.log(e);
      }
      
      // Clear form values
      setFormState({
        username: "",
        password: ""
      });
    };


    
    return (
        <main className="">
      <div className="">
        <div className="">
          <h4 className="login-title">Login</h4>
          <div className="login-form">
            <form onSubmit={handleFormSubmit}>
              <div className="user-input">
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
              </div>
              <div className='center'>
              <button className="submit-btn" type="submit">
                Submit
              </button>
              </div>
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
import React, { useContext } from 'react'
import AuthContext from '../context/AuthContext'
import "./LoginPage.css"

const LoginPage = () => {
  let {loginUser} = useContext(AuthContext);
  return (
    <div>
        <form onSubmit={loginUser}>
          <h2>Login:</h2>
            <input className="text-input" type="text" name='username' placeholder='Username' style={{ marginTop: "30px" }} /><br /><br />
            <input className="text-input" type="password" name='password' placeholder='Password' /><br />
            <input className="submit-btn" type="submit" /><br /><br />
            <a href="/register">Don't Have an Account?</a>
        </form>
    </div>
  )
}

export default LoginPage
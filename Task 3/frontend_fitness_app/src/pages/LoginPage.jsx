import React, { useContext } from 'react'
import AuthContext from '../context/AuthContext'

const LoginPage = () => {
  let {loginUser} = useContext(AuthContext);
  return (
    <div>
        <form onSubmit={loginUser}>
          <h2>Login:</h2>
            <input className="text-input" type="text" name='username' placeholder='Username' style={{ marginTop: "30px", width: "700px" }} /><br /><br />
            <input className="text-input" type="password" name='password' placeholder='Password' style={{ marginBottom: "30px", width: "700px" }} /><br />
            <input className="submit-btn" type="submit" /><br /><br />
            <a href="/register">Don't Have an Account?</a>
        </form>
    </div>
  )
}

export default LoginPage
import React, { useContext } from 'react'
import AuthContext from '../context/AuthContext'

const LoginPage = () => {
  let {loginUser} = useContext(AuthContext);
  return (
    <div>
        <form onSubmit={loginUser}>
          <h2>Login:</h2>

            <div className="input-field" style={{ marginTop: "20px"}}>
              <p className="input-title">Username</p>
              <input type="text" className="text-input" name="username" placeholder="username" style={{ width: "700px" }} />
            </div>

            <div className="input-field" style={{ marginTop: "20px"}}>
              <p className="input-title">Password</p>
              <input type="text" className="text-input" name="password" placeholder="password" style={{ width: "700px" }} />
            </div>

            <input className="submit-btn" type="submit" style={{ marginTop: "30px" }} /><br /><br />
            <a href="/register">Don't Have an Account?</a>
        </form>
    </div>
  )
}

export default LoginPage
import React, { useContext } from "react"
import AuthContext from "../context/AuthContext"
import "./RegisterPage.css"
import { DEFAULT_MIN_BREAKPOINT } from "react-bootstrap/esm/ThemeProvider";

const RegisterPage = () => {
  let {registerUser} = useContext(AuthContext);
  return (
    <div>
        <form onSubmit={registerUser}>
            <h2>Create Account:</h2>
            <div className="horizontal-container" style={{ marginTop: "30px" }}>
              <div className="input-field">
                <p className="input-title">Email</p>
                <input type="email" className="text-input" name="email" placeholder="example@fake.com" />
              </div>
              <div className="input-field">
                <p className="input-title">Username</p>
                <input type="text" className="text-input" name="username" placeholder="username" />
              </div>
              <div className="input-field">
                <p className="input-title">Password</p>
                <input type="password" className="text-input" name="password" placeholder="password" />
              </div>
            </div>
            <br /><br />

            <div className="radio-btns-container">
              <label className="radio-btns-label">Gender:</label>
              <div className="radio-btns">
                <div className="radio-btn">
                  <input type="radio" className="radio-input" name="gender" value="male" id="male" />
                  <label className="radio-label" htmlFor="male">Male</label>
                </div>
                <div className="radio-btn">
                  <input type="radio" className="radio-input" name="gender" value="female" id="female" />
                  <label className="radio-label" htmlFor="female">Female</label>
                </div>
              </div>
            </div>
            <br />

            <div className="horizontal-container">
              <div className="input-field">
                <p className="input-title">Age</p>
                <input type="number" className="number-input" name="age" placeholder="18" min={0} />
              </div>
              <div className="input-field">
                <p className="input-title">Weight</p>
                <input type="number" className="number-input" name="weight" placeholder="75" min={0} />
                <p className="text-inside-input">kg</p>
              </div>
              <div className="input-field">
                <p className="input-title">Height</p>
                <input type="number" className="number-input" name="height" placeholder="180" min={0} />
                <p className="text-inside-input">cm</p>
              </div>
            </div>
            <br /><br />

            <div className="radio-btns-container">
              <label className="radio-btns-label">Fitness Goal:</label>
              <div className="radio-btns">
                <div className="radio-btn">
                  <input type="radio" className="radio-input" name="fitness-goal" value="weight_loss" id="weight_loss" />
                  <label className="radio-label" htmlFor="weight-loss">Weight Loss</label>
                </div>
                <div className="radio-btn">
                  <input type="radio" className="radio-input" name="fitness-goal" value="muscle_gain" id="muscle_gain" />
                  <label className="radio-label" htmlFor="muscle-gain">Muscle Gain</label>
                </div>
                <div className="radio-btn">
                  <input type="radio" className="radio-input" name="fitness-goal" value="maintenance" id="maintenance" />
                  <label className="radio-label" htmlFor="maintenance">Maintenance</label>
                </div>
              </div>
            </div>
            <div className="input-field" style={{ marginTop: "10px", marginBottom: "-15px" }} >
              <p className="input-title">Weight Goal</p>
              <input type="text" className="text-input" name="weight-goal" placeholder="Your Weight Goal" min={0} />
              <p className="text-inside-input">kg</p>
            </div>
            <br />

            <input className="submit-btn" type="submit" placeholder="Submit" /><br /><br />
            <a href="/login">Already have an account?</a>
        </form>
    </div>
  )
}

export default RegisterPage
import React, { useContext } from "react"
import AuthContext from "../context/AuthContext"
import "./RegisterPage.css"

const RegisterPage = () => {
  let {registerUser} = useContext(AuthContext);
  return (
    <div>
        <form onSubmit={registerUser}>
            <h2>Create Account:</h2>
            <input type="text" className="text-input" name="username" placeholder="Username" style={{ marginTop: "30px" }} />
            <input type="password" className="text-input" name="password" placeholder="Password" />
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

            <input type="number" className="number-input" name="age" placeholder="age" min={0} />
            <input type="number" className="number-input" name="weight" placeholder="weight (in kgs)" min={0} />
            <input type="number" className="number-input" name="height" placeholder="height (in cms)" min={0} />
            <br /><br />

            <div className="radio-btns-container">
              <label className="radio-btns-label">Fitness Goal:</label>
              <div className="radio-btns">
                <div className="radio-btn">
                  <input type="radio" className="radio-input" name="fitness-goal" value="weight-loss" id="weight-loss" />
                  <label className="radio-label" htmlFor="weight-loss">Weight Loss</label>
                </div>
                <div className="radio-btn">
                  <input type="radio" className="radio-input" name="fitness-goal" value="muscle-gain" id="muscle-gain" />
                  <label className="radio-label" htmlFor="muscle-gain">Muscle Gain</label>
                </div>
                <div className="radio-btn">
                  <input type="radio" className="radio-input" name="fitness-goal" value="maintenance" id="maintenance" />
                  <label className="radio-label" htmlFor="maintenance">Maintenance</label>
                </div>
              </div>
            </div>
            <input type="text" className="text-input" name="weight-goal" placeholder="Your Weight Goal" min={0} style={{ marginTop: "10px" }} />
            <br />

            <input className="submit-btn" type="submit" placeholder="Submit" /><br /><br />
            <a href="/login">Already have an account?</a>
        </form>
    </div>
  )
}

export default RegisterPage
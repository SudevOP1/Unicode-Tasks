import React from 'react'
import bodybuilder from "../assets/bodybuilder.png"
import { useNavigate } from 'react-router-dom'

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <div className="landing-page">

      <div className="section hero-section">
        <div className="headings-container">
          <div className="headings">
            <h1>FitGenius</h1>
            <p>The Ultimate AI-Powered Fitness Platform</p>
            <p>Your Personalized Workout Planner and Tracker</p>
            <div>
              <button className="hero-btn start-now-btn">Start Now</button>
              <button className="hero-btn learn-more-btn">Learn More</button>
            </div>
          </div>
        </div>
        <div className="bodybuilder-img-container">
          <img className="bodybuilder-img" src={bodybuilder} />
        </div>
      </div>


      <hr className="section-divider" />


      <div className="section why-choose-us-section">
        <div className="section-heading">
          <h1>Why Choose Us?</h1>
        </div>

        <div className="reasons-to-choose">
          <div className="reasons-container-horizontal">
            <div className="reason-1"><h1>AI-Powered Fitness Plans</h1></div>
            <div className="reason-2"><h1>Real-Time Tracking</h1></div>
          </div>
          <div className="reasons-container-horizontal">
            <div className="reason-3"><h1>Progress Insights</h1></div>
            <div className="reason-4"><h1>AI-Driven Workout Planner</h1></div>
          </div>
        </div>
      </div>


      <hr className="section-divider" />


      <div className="section subscriptions-section">
        <div className="section-heading">
          <h1>Our Subscription Plans</h1>
        </div>
        
        <div className="subscriptions">
          
          <div class="subscription-1">
            <h1 class="subscription-heading">FitStarter</h1>
            <h1 class="subscription-price">₹0</h1>
            <h3>per month</h3>
            <div class="subscription-divider-1">.</div>
            <h3>Generate workout routine only once</h3>
            <h3>Track Daily Weight ❌</h3>
            <h3>Track Workout Streak ❌</h3>
            <button onClick={()=>{navigate("/login")}} class="get-started-button get-started-button-1">Get Started</button>
          </div>


          <div className="subscription-2-fake">
            <h1 className="subscription-heading">StrengthMaster</h1>
            <h1 className="subscription-price">₹50</h1>
            <h3>per month</h3>
            <div className="subscription-divider-2">.</div>
            <h3>Generate workout routine only once</h3>
            <h3>Track Daily Weight ✅</h3>
            <h3>Track Workout Streak ✅</h3>
            <button onClick={()=>{navigate("/login")}} className="get-started-button get-started-button-2">Get Started</button>
          </div>
          <div className="subscription-2">
            <h1 className="subscription-heading">StrengthMaster</h1>
            <h1 className="subscription-price">₹50</h1>
            <h3>per month</h3>
            <div className="subscription-divider-2">.</div>
            <h3>Generate workout routine only once</h3>
            <h3>Track Daily Weight ✅</h3>
            <h3>Track Workout Streak ✅</h3>
            <button onClick={()=>{navigate("/login")}} className="get-started-button get-started-button-2">Get Started</button>
          </div>

          <div className="subscription-3">
            <h1 className="subscription-heading">FitnessTitan</h1>
            <h1 className="subscription-price">₹200</h1>
            <h3>per month</h3>
            <div className="subscription-divider-3">.</div>
            <h3>Generate workout routine unlimited times</h3>
            <h3>Track Daily Weight ✅</h3>
            <h3>Track Workout Streak ✅</h3>
            <button onClick={()=>{navigate("/login")}} className="get-started-button get-started-button-3">Get Started</button>
          </div>

        </div>

      </div>


    </div>
  )
}

export default LandingPage
import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import BentoBox from '../components/BentoBox';
import Slider from '../components/Slider';
import fireGif from "../assets/fire.gif";
import pfp from "../assets/pfp.png";
import "./Pages.css"
import CheckBoxComponent from '../components/CheckBoxComponent';

import Abs        from "../assets/muscles/Abs.png"
import Arms       from "../assets/muscles/Arms.png"
import Back       from "../assets/muscles/Back.png"
import Biceps     from "../assets/muscles/Biceps.png"
import Chest      from "../assets/muscles/Chest.png"
import Legs       from "../assets/muscles/Legs.png"
import Rest1      from "../assets/muscles/Rest1.png"
import Rest2      from "../assets/muscles/Rest2.png"
import Shoulders  from "../assets/muscles/Shoulders.png"
import Triceps    from "../assets/muscles/Triceps.png"

const HomePage = () => {
  let [healthDetail,          setHealthDetail]          = useState([]);
  let [quote,                 setQuote]                 = useState("");
  let [weeklyRoutine,         setWeeklyRoutine]         = useState({});
  let [loading,               setLoading]               = useState(false);
  let [todaysDay,             setTodaysDay]             = useState("");
  let [workoutStreak,         setWorkoutStreak]         = useState(-1);
  let [percentOfExsCompleted, setPercentOfExsCompleted] = useState({});
  let [userWeights,           setUserWeights]           = useState({});
  
  let { authTokens, user, logoutUser }  = useContext(AuthContext);

  let muscleImages = {
    Abs       : Abs,
    Arms      : Arms,
    Back      : Back,
    Biceps    : Biceps,
    Chest     : Chest,
    Legs      : Legs,
    Rest      : Rest2,
    // Rest      : Rest1,
    Shoulders : Shoulders,
    Triceps   : Triceps,
  };
  
  let getHealthDetail = async () => {
    let response = await fetch("http://127.0.0.1:8000/api/health-details/", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        "Authorization": "Bearer " + String(authTokens.access),
      }
    });
    let data = await response.json();

    if (response.status === 200) {
      setHealthDetail(data);
    } else if (response.statusText === "Unauthorized") {
      logoutUser();
    } else {
      console.log(response.error);
    }
  };

  let getQuote = async () => {
    let response = await fetch("http://127.0.0.1:8000/gemini-api/get-quote/", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        "Authorization": "Bearer " + String(authTokens.access),
      }
    });
    let data = await response.json();

    if (response.status === 200) {
      setQuote(data.quote);
    } else if (response.statusText === "Unauthorized") {
      logoutUser();
    } else {
      console.log(response.error);
    }
  };

  let getWeeklyRoutine = async () => {
    let response = await fetch("http://127.0.0.1:8000/gemini-api/get-weekly-routine/", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        "Authorization": "Bearer " + String(authTokens.access),
      }
    });
    let data = await response.json();

    if (response.status === 200) {
      console.log(data);
      setWeeklyRoutine(data);
    } else if (response.statusText === "Unauthorized") {
      logoutUser();
    } else {
      console.log(response.error);
    }
  };
  
  let toggleExerciseComplete = async (exerciseName) => {
    let response = await fetch("http://127.0.0.1:8000/gemini-api/toggle-exercise-completed/", {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        "Authorization": "Bearer " + String(authTokens.access),
      },
      body: JSON.stringify({
        name: exerciseName,
      }),
    });
    let data = await response.json();

    try {
      if (response.status === 200) {
        console.log(data.success);
        getWeeklyRoutine();
        getWorkoutStreak();
        getPercentOfExsCompleted();
      } else if(response.status === 404) {
        console.log("exercise not found");
        getWeeklyRoutine();
        getWorkoutStreak();
        getPercentOfExsCompleted();
      } else if(response.statusText === "Unauthorized") {
        logoutUser();
      } else {
        console.log("Error occurred." || data.error);
      }
    } catch(error) {
      console.log("Error occurred: " + error);
    }
  };

  let toggleStepsComplete = async () => {
    let response = await fetch("http://127.0.0.1:8000/gemini-api/toggle-steps-completed/", {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        "Authorization": "Bearer " + String(authTokens.access),
      },
      body: JSON.stringify({
        day: todaysDay,
      }),
    });
    let data = await response.json();

    try {
      if (response.status === 200) {
        console.log(data.success);
        getWeeklyRoutine();
        getWorkoutStreak();
        getPercentOfExsCompleted();
      } else if(response.status === 404) {
        console.log("steps not found");
        getWeeklyRoutine();
        getWorkoutStreak();
        getPercentOfExsCompleted();
      } else if(response.statusText === "Unauthorized") {
        logoutUser();
      } else {
        console.log("Error occurred." || data.error);
      }
    } catch(error) {
      console.log("Error occurred: " + error);
    }
  };

  let getTodaysDay = () => {
    const days = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
    const todaysDayIndex = new Date().getDay();
    setTodaysDay(days[todaysDayIndex]);
  };

  let getWorkoutStreak = async () => {
    let response = await fetch("http://127.0.0.1:8000/gemini-api/get-workout-streak/", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        "Authorization": "Bearer " + String(authTokens.access),
      },
    });
    let data = await response.json();

    try {
      if (response.status === 200) {
        console.log(data);
        setWorkoutStreak(data.streak);
      } else if(response.statusText === "Unauthorized") {
        logoutUser();
      } else {
        console.log("Error occurred." || data.error);
      }
    } catch(error) {
      console.log("Error occurred: " + error);
    }
  };

  let getPercentOfExsCompleted = async () => {
    let response = await fetch("http://127.0.0.1:8000/gemini-api/get-percent-of-exs-completed/", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        "Authorization": "Bearer " + String(authTokens.access),
      },
    });
    let data = await response.json();

    try {
      if (response.status === 200) {
        console.log(data);
        setPercentOfExsCompleted({
          "day"     : data.day,
          "week"    : data.week,
          "month"   : data.month,
          "overall" : data.overall,
        });
      } else if(response.statusText === "Unauthorized") {
        logoutUser();
      } else {
        console.log("Error occurred." || data.error);
      }
    } catch(error) {
      console.log("Error occurred: " + error);
    }
  };

  let getUserWeights = async () => {
    let response = await fetch("http://127.0.0.1:8000/gemini-api/get-user-weights/", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        "Authorization": "Bearer " + String(authTokens.access),
      },
    });
    let data = await response.json();

    try {
      if (response.status === 200) {
        setUserWeights(data);
        // console.log("User Weights: ", userWeights);
      } else if(response.statusText === "Unauthorized") {
        logoutUser();
      } else {
        console.log("Error occurred." || data.error);
      }
    } catch(error) {
      console.log("Error occurred: " + error);
    }
  };

  
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      
      getTodaysDay();
      await getUserWeights();
      await getHealthDetail();
      await getWeeklyRoutine();
      await getQuote();
      await getWorkoutStreak();
      await getPercentOfExsCompleted();
      
      setLoading(false);
    };
    fetchData();
  }, []);
  

  return (
    <div style={{ marginLeft: "0.5vh" }}>

      <div style={{ height: "13vh", padding: "2vh", display: "flex", justifyContent: "space-between", marginBottom: "2vh" }}>
        <div className="greeting">
          <h1 style={{ color: "#E88547", fontSize: "2.9rem" }}>Welcome {user ? user.username : "Guest"}</h1>
          <h3 style={{ color:"white" }}>
            How's your {
              healthDetail.length > 0
              ? healthDetail[0].fitness_goal === "muscle_gain" ? "Muscle Gain"
              : healthDetail[0].fitness_goal === "weight_loss" ? "Weight Loss"
              : healthDetail[0].fitness_goal === "maintenance" ? "Maintenance"
              : "Fitness" : "Fitness"
            } Workout going?
          </h3>
        </div>
        <div className="profile-pic">
          <a href="/profile"><img src={pfp} alt="Profile" height="100%" /></a>
        </div>
      </div>

      <div className="bento-boxes">
        <div className="bento-container-vertical">
          <div className="bento-container-horizontal">
            <BentoBox width="32vw" height="43vh" color="#B39CD0" martop="0px">
              <h1 className="routine-heading">Today's Exercises</h1>
              <div className="routine-content" style={{ gap: "10px" }}>
                <div className="routine-items" style={{ alignItems: "start", justifyContent: "space-around", height: "80%" }}>
                  {
                    loading
                    ? <p className="loading-text" style={{ marginTop: "-10px" }}>Loading...</p>
                    : !loading && weeklyRoutine?.routines?.[0]?.days?.[todaysDay]?.exercises
                    ? weeklyRoutine.routines[0].days[todaysDay].exercises.map((exercise, index) => (
                        <div key={exercise.name + index} className="exercise-item">
                          <button onClick={() => toggleExerciseComplete(exercise.name)} className="checkbox-button">
                            {
                              exercise.completed
                              ? <CheckBoxComponent completed={true} width="15px" height="15px"/>
                              : <CheckBoxComponent completed={false} width="15px" height="15px"/>
                            }
                          </button>
                          <p className="exercise-name">{exercise.name}: {exercise.sets} x {exercise.reps} </p>
                        </div>
                      ))
                    : <p className="no-routine-text">Please create a routine first!</p>
                  }
                  {
                    !loading && weeklyRoutine?.routines?.[0]?.days?.[todaysDay] &&
                    <div key="steps" className="steps-item">
                      <button onClick={() => toggleStepsComplete()} className="checkbox-button">
                        {
                          weeklyRoutine.routines[0].days[todaysDay].steps.completed
                          ? <CheckBoxComponent completed={true} width="15px" height="15px"/>
                          : <CheckBoxComponent completed={false} width="15px" height="15px"/>
                        }
                      </button>
                      <p className="steps-text">Cardio: {weeklyRoutine.routines[0].days[todaysDay].steps} Steps</p>
                    </div>
                  }
                </div>
              </div>
            </BentoBox>

            <BentoBox width="32vw" height="43vh" color="#92EA9D" martop="0px">
              <h1 className="routine-heading">Weekly Routine</h1>
              <div className="routine-content" style={{ gap: "10px", marginTop: "-10px" }}>
                <div className="routine-items" style={{ height: "80%" }}>
                  {
                    loading
                    ?  <p className="loading-text">Loading...</p>
                    : weeklyRoutine.routines && weeklyRoutine.routines.length > 0
                    ? <div className="weekday-container">


                      
                        <div className="weekday-first">
                          {
                            weeklyRoutine.routines[0].days["sun"].exercises.length > 0
                            ? <div className="weekday">
                                {<img style={{ width: "35px" }} src={muscleImages[weeklyRoutine.routines[0].days["sun"].exercises[0].muscle]} />}
                                Sun: {weeklyRoutine.routines[0].days["sun"].exercises[0].muscle}
                              </div>
                            : <div className="weekday">
                                {<img style={{ width: "35px" }} src={muscleImages["Rest"]} />}
                                Sun: Rest
                              </div>
                          }
                        </div>

                        <div className="weekday-remaining">
                          <div className="weekday-second">
                            {["mon", "tue", "wed"].map((day) => (
                              <div key={day} className="weekday">
                                {<img style={{ width: "35px" }} src={muscleImages[
                                  weeklyRoutine.routines[0].days[day]?.exercises.length > 0
                                  ? weeklyRoutine.routines[0].days[day].exercises[0].muscle
                                  : "Rest"
                                ]} />}
                                {day.charAt(0).toUpperCase() + day.slice(1)}:{" "}
                                {
                                  weeklyRoutine.routines[0].days[day]?.exercises.length > 0
                                  ? weeklyRoutine.routines[0].days[day].exercises[0].muscle
                                  : "Rest"
                                }
                              </div>
                            ))}
                          </div>

                          <div className="weekday-third">
                            {["thu", "fri", "sat"].map((day) => (
                              <div key={day} className="weekday">
                                {<img style={{ width: "35px" }} src={muscleImages[
                                  weeklyRoutine.routines[0].days[day]?.exercises.length > 0
                                  ? weeklyRoutine.routines[0].days[day].exercises[0].muscle
                                  : "Rest"
                                ]} />}
                                {day.charAt(0).toUpperCase() + day.slice(1)}:{" "}
                                {
                                  weeklyRoutine.routines[0].days[day]?.exercises.length > 0
                                  ? weeklyRoutine.routines[0].days[day].exercises[0].muscle
                                  : "Rest"
                                }
                              </div>
                            ))}
                          </div>
                        </div>



                      </div>
                    : <p className="no-routine-text">Please create a routine first!</p>
                  }
                </div>
              </div>
            </BentoBox>



            <div className="bento-container-vertical">
              <BentoBox width="30vw" height="28vh" color="#F28B82" martop="0px">
                <div className="weight-graph-container" style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%", flexDirection: "column", gap: "15px" }}>
                  <h1 style={{ color: "black" }}>You're doing Great!</h1>
                  <div className="weight-graph" style={{ border: "1px solid black", borderRadius: "10px", width: "70%", height: "50%", display: "flex", justifyContent: "center", alignItems: "center", color: "black" }}>
                    Weight Graph
                  </div>
                </div>
              </BentoBox>

              <BentoBox width="30vw" height="11vh" color="#7FB8DB">
                <div className="streak-container" style={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "row", gap: "2%" }}>
                  <img height="60vh" src={fireGif} alt="Fire Gif" style={{ marginTop: "3px" }} />
                  {
                  !loading && workoutStreak === 0
                  ? <h1 style={{ color: "black", paddingTop: "3%" }}>Let's begin your journey!</h1>
                  : !loading && workoutStreak !== -1
                  ? <h1 style={{ color: "black", paddingTop: "3%" }}>{workoutStreak}-day workout streak</h1>
                  : <p>Loading...</p>
                  }
                </div>
              </BentoBox>
            </div>
          </div>

          <div className="bento-container-horizontal">
            <BentoBox width="54vw" height="26vh" color="#FFCB9A">
                
              { loading && percentOfExsCompleted.length === 0
              ? <p>Loading...</p>
              : <div className="sliders-container">
                
                  <div className="slider-container">
                    <div className="slider">
                      <Slider percent={percentOfExsCompleted["day"]} />
                    </div>
                    <h1>Day</h1>
                  </div>

                  <div className="slider-container">
                    <div className="slider">
                      <Slider percent={percentOfExsCompleted["week"]} />
                    </div>
                    <h1>Week</h1>
                  </div>

                  <div className="slider-container">
                    <div className="slider">
                      <Slider percent={percentOfExsCompleted["month"]} />
                    </div>
                    <h1>Month</h1>
                  </div>

                  <div className="slider-container">
                    <div className="slider">
                      <Slider percent={percentOfExsCompleted["overall"]} />
                    </div>
                    <h1>Overall</h1>
                  </div>

                </div>
              }
            </BentoBox>

            <BentoBox width="42vw" height="26vh" color="#F4D35E">
              <div className="quote-container" style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
                <h1 style={{ color: "black" }}>" {loading ? "..." : quote} "</h1>
              </div>
            </BentoBox>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

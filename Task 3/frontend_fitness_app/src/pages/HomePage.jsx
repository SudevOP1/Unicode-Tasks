import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import BentoBox from '../components/BentoBox';
import Slider from '../components/Slider';
import fireGif from "../assets/fire.gif";
import pfp from "../assets/pfp.png";
import "./Pages.css"
import CheckBoxComponent from '../components/CheckBoxComponent';

const HomePage = () => {
  let [healthDetail,  setHealthDetail]  = useState([]);
  let [quote,         setQuote]         = useState("");
  let [weeklyRoutine, setWeeklyRoutine] = useState({});
  let [todaysRoutine, setTodaysRoutine] = useState(null);
  let [loading,       setLoading]       = useState(false);
  let [todaysDay,     setTodaysDay]     = useState("");
  let [prevDays,      setPrevDays]      = useState([]);
  let { authTokens, user, logoutUser }  = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      
      getTodaysDay();
      await getHealthDetail();
      await getWeeklyRoutine();
      await getQuote();
      
      setLoading(false);
    };
    fetchData();
  }, []);
  
  
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
  
  let getTodaysDay = () => {
    const days = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
    const todaysDayIndex = new Date().getDay();
    setTodaysDay(days[todaysDayIndex]);

    const prevDaysArr = [];
    for(let i = 1; i <= 4; i++) {
      const prevDayIndex = (todaysDayIndex - i + days.length) % 7;
      prevDaysArr.unshift(days[prevDayIndex]);
    }
    setPrevDays(prevDaysArr);
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
      } else if(response.status === 404) {
        console.log("exercise not found");
        getWeeklyRoutine();
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
      } else if(response.status === 404) {
        console.log("steps not found");
        getWeeklyRoutine();
      } else if(response.statusText === "Unauthorized") {
        logoutUser();
      } else {
        console.log("Error occurred." || data.error);
      }
    } catch(error) {
      console.log("Error occurred: " + error);
    }
  };

  return (
    <div style={{ marginLeft: "0.5vh" }}>
      <div style={{ height: "13vh", padding: "2vh", display: "flex", justifyContent: "space-between" }}>
        <div className="greeting">
          <h1 style={{ color: "#E88547", fontSize: "2.9rem" }}>Welcome {user ? user.username : "Guest"}</h1>
          <h3>
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
              <div className="todays-routine-container" style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%", flexDirection: "column" }}>
                <h1 style={{ color: "black" }}>Today's Routine</h1>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px", margin: "20px auto 0" }}>
                  {
                    loading
                    ? <p style={{ color: "black", fontSize: "1.3rem" }}>Loading...</p>
                    : !loading && weeklyRoutine?.routines?.[0]?.days?.[todaysDay]?.exercises
                    ? weeklyRoutine.routines[0].days[todaysDay].exercises.map((exercise, index) => (
                      <div key={exercise.name + index} style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
                        <button onClick={() => toggleExerciseComplete(exercise.name)} style={{ color: "black", background: "none", border: "none" }}>{
                          exercise.completed
                          ? <CheckBoxComponent completed={true} width="15px" height="15px"/>
                          : <CheckBoxComponent completed={false} width="15px" height="15px"/>
                        }</button>
                        <p style={{ color: "black", fontSize: "1.3rem" }}>{exercise.name}</p>
                      </div>
                      ))
                    : <p style={{ color: "black", fontSize: "1.3rem" }}>Please create a routine first!</p>
                  }
                  {
                    !loading
                    ? !loading && weeklyRoutine?.routines?.[0]?.days?.[todaysDay]
                    ? <div key="steps" style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
                        <button onClick={() => toggleStepsComplete()} style={{ color: "black", background: "none", border: "none" }}>{
                          weeklyRoutine.routines[0].days[todaysDay].steps.completed
                          ? <CheckBoxComponent completed={true} width="15px" height="15px"/>
                          : <CheckBoxComponent completed={false} width="15px" height="15px"/>
                        }</button>
                        <p style={{ color: "black", fontSize: "1.3rem" }}>{weeklyRoutine.routines[0].days[todaysDay].steps} Steps</p>
                      </div>
                    : null : null
                  }
                </div>
              </div>
            </BentoBox>

            <BentoBox width="32vw" height="43vh" color="#92EA9D" martop="0px">
              <div className="weekly-routine-container">
                <h1 style={{ color: "black" }}>Weekly Routine</h1>
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
                  <h1 style={{ color: "black", paddingTop: "3%" }}>6-day workout streak</h1>
                </div>
              </BentoBox>
            </div>
          </div>

          <div className="bento-container-horizontal">
            <BentoBox width="54vw" height="26vh" color="#FFCB9A">
              <div className="sliders-container" style={{ width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", gap: "10%" }}>

                <div style={{ display: "flex", alignItems: "center", flexDirection: "row", width: "100%", justifyContent: "center" }}>
                  <div style={{ width: "40vw", height: "3vh" }}>
                    <Slider percent={20} />
                  </div>
                  <h1 style={{ color: "black", fontSize: "1.3rem", width: "8vw", display: "flex", justifyContent: "center" }}>Day</h1>
                </div>

                <div style={{ display: "flex", alignItems: "center", flexDirection: "row", width: "100%", justifyContent: "center" }}>
                  <div style={{ width: "40vw", height: "3vh" }}>
                    <Slider percent={30} />
                  </div>
                  <h1 style={{ color: "black", fontSize: "1.3rem", width: "8vw", display: "flex", justifyContent: "center" }}>Week</h1>
                </div>

                <div style={{ display: "flex", alignItems: "center", flexDirection: "row", width: "100%", justifyContent: "center" }}>
                  <div style={{ width: "40vw", height: "3vh" }}>
                    <Slider percent={69} />
                  </div>
                  <h1 style={{ color: "black", fontSize: "1.3rem", width: "8vw", display: "flex", justifyContent: "center" }}>Week</h1>
                </div>

                <div style={{ display: "flex", alignItems: "center", flexDirection: "row", width: "100%", justifyContent: "center" }}>
                  <div style={{ width: "40vw", height: "3vh" }}>
                    <Slider percent={80} />
                  </div>
                  <h1 style={{ color: "black", fontSize: "1.3rem", width: "8vw", display: "flex", justifyContent: "center" }}>Overall</h1>
                </div>

              </div>
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

import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import "./Pages.css";
import { useNavigate } from "react-router-dom"

const CreateRoutinePage = () => {

    let { authTokens, user, logoutUser } = useContext(AuthContext);
    let [loading, setLoading] = useState(false);
    let [weeklyRoutine, setWeeklyRoutine] = useState([]);
    let navigate = useNavigate();
    
    let createWeeklyRoutine = async () => {
        setLoading(true);
        let response = await fetch("http://127.0.0.1:8000/gemini-api/create-weekly-routine/", {
            method: "GET",
            headers: {
                "Content-type": "application/json",
                "Authorization": "Bearer " + String(authTokens.access),
            }
        });
        let data = await response.json();
  
        if (response.status === 200) {
            setWeeklyRoutine(data.days);
            console.log(data);
        } else if (response.statusText === "Unauthorized") {
            logoutUser();
        } else {
            console.log(response.error);
        }
        setLoading(false);
    };
    
    let saveWeeklyRoutine = async () => {
        setLoading(true);
        let response = await fetch("http://127.0.0.1:8000/gemini-api/save-weekly-routine/", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                "Authorization": "Bearer " + String(authTokens.access),
            },
            body: JSON.stringify({ days: weeklyRoutine }),
        });
        
        if (response.status === 200) {
            // navigate("/");
            console.log("Workout plan saved!");
        } else if (response.statusText === "Unauthorized") {
            logoutUser();
        } else {
            console.log(response.error);
        }
        setLoading(false);
    };

    return (
        <div style={{ padding: "20px" }}>
            <h1 style={{ color: "#E88547" }}>Create a Weekly Routine for Yourself!</h1>
            {
                weeklyRoutine.length > 0
                ? null
                : <button className="submit-btn" style={{ margin: "30px 0" }} onClick={createWeeklyRoutine}>Create!</button>
            }
            {loading && <p style={{ fontSize: "1.3rem", color: "white" }}>Loading...</p>}

            {weeklyRoutine.length === 0 && !loading && <p style={{ fontSize: "1.3rem", color: "white" }}>No routine created yet.</p>}
            
            {
                weeklyRoutine.length > 0
                ? <button className="submit-btn" style={{ margin: "20px 20px 30px 0px" }} onClick={createWeeklyRoutine}>Generate New Routine</button>
                : null
            }
            <button className="submit-btn" onClick={saveWeeklyRoutine}>Save Routine</button>
            
            {!loading && weeklyRoutine.length > 0 && (
                <div style={{ width: "100%" }}>
                    <table className="profile-page-table" style={{ width: "100%", margin: "0" }}>
                        <thead>
                            <tr>
                                <th style={{ fontSize: "1.7rem" }}>Day</th>
                                <th style={{ fontSize: "1.7rem" }}>Muscle</th>
                                <th style={{ fontSize: "1.7rem" }}>Exercises</th>
                                <th style={{ fontSize: "1.7rem" }}>Sets x Reps</th>
                                <th style={{ fontSize: "1.7rem" }}>Steps</th>
                            </tr>
                        </thead>
                        <tbody>
                            {weeklyRoutine.map((day, index) => (
                                <tr key={index}>
                                    <td style={{ fontSize: "1.3rem" }}>{day.day}</td>
                                    <td style={{ fontSize: "1.3rem" }}>{day.muscle}</td>
                                    <td style={{ fontSize: "1.3rem" }}>
                                        {day.muscle === "Rest" ? "Rest Day" : (
                                            <ul>
                                                {day.exercises.map((exercise, idx) => (
                                                    <li key={idx}>
                                                        {exercise.name}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </td>
                                    <td style={{ fontSize: "1.3rem" }}>
                                        {day.muscle === "Rest" ? "Rest Day" : (
                                            <ul>
                                                {day.exercises.map((exercise, idx) => (
                                                    <li key={idx}>
                                                        {exercise.sets} x {exercise.reps}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </td>
                                    <td style={{ fontSize: "1.3rem" }}><p style={{ color: "#d2d2d2", display: "flex", justifyContent: "end" }}>{day.steps}</p></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                </div>
            )}
        </div>
    );
};

export default CreateRoutinePage;

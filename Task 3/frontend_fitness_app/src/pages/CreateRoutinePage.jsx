import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import "./Pages.css";
import { useNavigate } from "react-router-dom"

const CreateRoutinePage = () => {

    let { authTokens, user, logoutUser } = useContext(AuthContext);
    let [loading, setLoading] = useState(false);
    let [weeklyRoutine, setWeeklyRoutine] = useState([]);
    let navigate = useNavigate();
    
    const createWeeklyRoutine = async () => {
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
        } else if (response.statusText === "Unauthorized") {
            logoutUser();
        } else {
            console.log(response.error);
        }
        setLoading(false);
    };
    
    const saveWeeklyRoutine = async () => {
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
        <div>
            <h1>Create a Weekly Routine for Yourself!</h1>
            <button style={{ color: "black" }} onClick={createWeeklyRoutine}>
                {weeklyRoutine.length > 0 ? "Generate New Routine" : "Create!"}
            </button>

            {loading && <p>Loading...</p>}

            {weeklyRoutine.length === 0 && !loading && <p>No routine created yet.</p>}
            
            {!loading && weeklyRoutine.length > 0 && (
                <div>
                    <table border="1" cellPadding="10">
                        <thead>
                            <tr>
                                <th>Day</th>
                                <th>Muscle</th>
                                <th>Exercises</th>
                                <th>Steps</th>
                            </tr>
                        </thead>
                        <tbody>
                            {weeklyRoutine.map((day, index) => (
                                <tr key={index}>
                                    <td>{day.day}</td>
                                    <td>{day.muscle}</td>
                                    <td>
                                        {day.muscle === "Rest" ? "Rest Day" : (
                                            <ul>
                                                {day.exercises.map((exercise, idx) => (
                                                    <li key={idx}>
                                                        {exercise.name} - {exercise.reps} reps, {exercise.sets} sets
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </td>
                                    <td>{day.steps} steps</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <button style={{ color: "black" }} onClick={saveWeeklyRoutine}>Save Routine</button>
                </div>
            )}
        </div>
    );
};

export default CreateRoutinePage;

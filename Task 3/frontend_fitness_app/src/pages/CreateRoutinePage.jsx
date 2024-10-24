import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import "./Pages.css";

const CreateRoutinePage = () => {

    let { authTokens, user, logoutUser } = useContext(AuthContext);
    let [loading, setLoading] = useState(false);
    let [weeklyRoutine, setWeeklyRoutine] = useState([]);

    const getWeeklyRoutine = async () => {
        setLoading(true);
        let response = await fetch("http://127.0.0.1:8000/gemini-api/create-and-get-weekly-routine/", {
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

    return (
        <div>
            <h1>Create a Weekly Routine for Yourself!</h1>
            <button style={{ color: "black" }} onClick={getWeeklyRoutine}>Create!</button>

            {loading && <p>Loading...</p>}
            
            {!loading && weeklyRoutine.length > 0 && (
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
            )}

            {weeklyRoutine.length === 0 && !loading && <p>No routine created yet.</p>}
        </div>
    )
}

export default CreateRoutinePage;

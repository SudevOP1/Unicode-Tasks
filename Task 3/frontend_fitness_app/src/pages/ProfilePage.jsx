import React, { useContext, useState, useEffect } from 'react';
import AuthContext from '../context/AuthContext';

const ProfilePage = () => {
  let { authTokens, logoutUser } = useContext(AuthContext);
  let [loading, setLoading] = useState(false);
  let [weeklyRoutine, setWeeklyRoutine] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      await getWeeklyRoutine();
      
      setLoading(false);
    };
    fetchData();
  }, []);

  const getWeeklyRoutine = async () => {
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
      console.error(response.error);
    }
  };

  return (
    <div>
      <h1 style={{ padding: "20px 20px", color: "#E88547" }}>Profile Page</h1>
      <div style={{ display: "flex" }}>
        
      <div className="profile-page-left-side">
        {!loading && !weeklyRoutine ? (
          <div style={{ margin: "30px 20px 20px" }}>
            <a style={{ color: "#2E95D3" }} href="/create-routine">Click here to create a Routine!</a>
          </div>
        ) : (
          <div>
            <table className="profile-page-table">
              <thead>
                <tr>
                  <th>Day</th>
                  <th>Muscle</th>
                  <th>Exercises</th>
                  <th>Sets x Reps</th>
                  <th>Steps</th>
                </tr>
              </thead>
              <tbody>
                {weeklyRoutine?.routines[0]?.days &&
                  Object.entries(weeklyRoutine.routines[0].days).map(([day, details]) => (
                    <tr key={day}>
                      <td>{
                        day   === "mon" ? "Monday"
                        : day === "tue" ? "Tuesday"
                        : day === "wed" ? "Wednesday"
                        : day === "thu" ? "Thursday"
                        : day === "fri" ? "Friday"
                        : day === "sat" ? "Saturday"
                        : day === "sun" ? "Sunday"
                        : null
                      }</td>
                      <td>{details.exercises[0]?.muscle || "Rest Day"}</td>
                      <td>
                        {details.exercises.length > 0
                        ? <ul>
                            {details.exercises.map((exercise, index) =>
                              <li key={index}>{exercise.name}</li>
                            )}
                          </ul>
                        : "Rest Day"
                        }
                      </td>
                      <td>
                        { details.exercises.length > 0
                        ? <ul>
                            {details.exercises.map((exercise, index) => (
                              <li key={index}>{exercise.sets} x {exercise.reps}</li>
                            ))}
                          </ul>
                        : "———"
                        }
                      </td>
                      <td><p style={ {display: "flex", justifyContent: "end", color: "#d2d2d2" }}>{details?.steps || "———"}</p></td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="profile-page-right-side">
        <h3>Name</h3>
        <h3>Username</h3>
        <h3>Email</h3>
        <h3>Weight</h3>
        <h3>Height</h3>
        <h3>Height</h3>
      </div>
      
      </div>
    </div>

  );
};

export default ProfilePage;

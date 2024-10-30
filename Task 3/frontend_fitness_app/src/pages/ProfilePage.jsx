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
      {!loading && !weeklyRoutine ? (
        <div>
          <h4>Routine not created yet!</h4>
          <a href="/create-routine">Create a Routine!</a>
        </div>
      ) : (
        <div>
          <table border="1" cellPadding="10">
            <thead>
              <tr>
                <th>Day</th>
                <th>Muscle</th>
                <th>Exercises</th>
                <th>Sets x Reps</th>
              </tr>
            </thead>
            <tbody>
              {weeklyRoutine?.routines[0]?.days &&
                Object.entries(weeklyRoutine.routines[0].days).map(([day, details]) => (
                  <tr key={day}>
                    <td>{day}</td>
                    <td>{details.exercises[0]?.muscle || "Rest Day"}</td>
                    <td>
                      {details.exercises.length > 0 ? (
                        <ul>
                          {details.exercises.map((exercise, index) => (
                            <li key={index}>
                              {exercise.name}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        "Rest Day"
                      )}
                    </td>
                      {details.exercises.length > 0 ? (
                        <ul>
                          {details.exercises.map((exercise, index) => (
                            <li key={index}>
                              {exercise.sets} x {exercise.reps}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        "Rest Day"
                      )}
                    <td>

                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;

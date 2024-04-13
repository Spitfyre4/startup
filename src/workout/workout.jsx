import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../workout.css';

export function Workout() {
  const { id, isUser } = useParams();
  const [workoutData, setWorkoutData] = useState(null);

  useEffect(() => {
    async function fetchWorkout() {
      try {
        const data = await loadWorkout(id, isUser);
        setWorkoutData(data);
      } catch (error) {
        console.error('Error fetching workout:', error);
      }
    }

    fetchWorkout();
  }, [id, isUser]);

  console.log(workoutData);

  return (
    <main className="workout-background">
      <div className="translucent-box workout-margin-bottom" style={{ left: '5%' }}>
        {workoutData ? (
          <>
            <h1><span className="workoutName">{workoutData.name}</span></h1>
            <div id="exercises" className="table-container">
              <table className="table">
                <thead>
                  <tr>
                    <th>Exercise</th>
                    <th>Reps/Min</th>
                    <th>Sets</th>
                  </tr>
                </thead>
                <tbody>
                  {workoutData.exercises.map(exercise => (
                    <tr key={exercise.name}>
                      <td>{exercise.name}</td>
                      <td>{exercise.reps}</td>
                      <td>{exercise.sets}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </main>
  );
}

async function loadWorkout(workoutID, isUser) {
  try {
    let workoutsArray = [];
    const username = getUsername();

    if (isUser) {
      const response = await fetch('/api/workouts', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ username: username })
      });
      if (!response.ok) {
        window.location.href = "index.html";
      }
      workoutsArray = await response.json();
    } else {
      const response = await fetch('/api/catalog');
      if (!response.ok) {
        window.location.href = "index.html";
      }
      workoutsArray = await response.json();
    }

    const workouts = new Map(workoutsArray.map(workout => [workout.id, workout]));
    const workoutData = workouts.get(workoutID);
    return workoutData;
  } catch (error) {
    console.error('Error loading workout:', error);
    return null;
  }

  function getUsername() {
    return localStorage.getItem('username') ?? 'Mystery user';
  }
}
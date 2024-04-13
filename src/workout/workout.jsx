import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../workout.css';
import { useNavigate } from 'react-router-dom';

export function Workout() {
  const { id, isUser } = useParams();
  const [workoutData, setWorkoutData] = useState(null);
  const navigate = useNavigate();

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

  async function downloadWorkout(workoutID) {
    try {
      const workoutData = await loadWorkout(workoutID, isUser);
      
      const myWorkout = workoutData;
      
      const req = new workoutReq(getUsername(), myWorkout);
  
      const response = await fetch('/api/workout', {
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify(req)
      });
  
      if (response.ok) {
        navigate("/workouts");
      } else {
        console.error('Failed to download workout:', response.statusText);
        navigate("/");
      }
    } catch (error) {
      console.error('Error downloading workout:', error);
    }
  }

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

      <div className="translucent-box statsBox">
        <h2>Stats</h2>
        <span id="downloads">Downloads: 0</span>
        <br></br>
        {isUser === 'true' ? (
          <button type="button" className="btn btn-primary" onClick={() => uploadWorkout(id)}>Upload</button>
        ) : (
          <button type="button" className="btn btn-primary" onClick={() => downloadWorkout(id)}>Download</button>
        )}
        
      </div>
    </main>
  );
}

async function loadWorkout(workoutID, isUser) {
  try {
    let workoutsArray = [];
    const username = getUsername();

    if (isUser === 'true') {
      console.log("is user");
      const response = await fetch('/api/workouts', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ username: username })
      });
      if (!response.ok) {
        navigate("/");
      }
      workoutsArray = await response.json();
    } else {
      console.log("is catalog");
      const response = await fetch('/api/catalog');
      if (!response.ok) {
        navigate("/");
      }
      workoutsArray = await response.json();
    }

    const workouts = new Map(workoutsArray.map(workout => [workout.id, workout]));
    const workoutData = workouts.get(workoutID);
    console.log("workoutData: " + workoutData);
    return workoutData;
  } catch (error) {
    console.error('Error loading workout:', error);
    return null;
  }

  function getUsername() {
    return localStorage.getItem('username') ?? 'Mystery user';
  }
}

async function uploadWorkout(workoutID) {
  

}

class workoutReq{
  constructor(username, workout){
      this.username = username;
      this.workout = workout;
  }
}

class workout{
constructor(name, exercises){
    this.name = name;
    this.exercises = exercises;
    this.stats = { views: 0, downloads: 0};
    this.id = generateUniqueId();
}
}

function getUsername() {
  return localStorage.getItem('username') ?? 'Mystery user';
}
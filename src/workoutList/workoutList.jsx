import React, { useEffect, useState } from 'react';
import '../workout.css';
import { useNavigate } from 'react-router-dom';

export function WorkoutList({ isUser }) {
  const [workouts, setWorkouts] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    async function fetchWorkouts() {
      try {
        let response;
        if (isUser) {
          const username = getUsername();
          response = await fetch('/api/workouts', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ username })
          });
        } else {
          response = await fetch('/api/catalog');
        }

        if (!response.ok) {
          navigate("/");
          return;
        }

        const workoutsArray = await response.json();
        setWorkouts(workoutsArray);
      } catch (error) {
        console.error('Error fetching workouts:', error);
      }
    }

    fetchWorkouts();
  }, [isUser]);
  
  return (
    <main className="catalog-background">
      <div className="translucent-box margin-bottom">
      <h1>
        {isUser ? 'Workouts' : 'Catalog'} 
        {isUser && (
          <button className="new_workout_button" onClick={() => navigate("/newWorkout")}>
            +
          </button>
        )}
      </h1>
        <div id="workout-links">
        {workouts.map(workout => (
            <React.Fragment key={workout.id}>
            <button
              onClick={() => navigate(`/workout/${workout.id}/${isUser}`)}
              className="workout_link btn btn-secondary"
            >
              {workout.name}
            </button>
            <br />
            </React.Fragment>
          ))}
        </div>
      </div>
    </main>
  );

  function getUsername() {
    return localStorage.getItem('username') ?? 'Mystery user';
  }

}
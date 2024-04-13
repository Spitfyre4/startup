import React, { useEffect, useState } from 'react';
import './workout.css';
// import { getUsername } from './account/account.jsx';

export function WorkoutList({ isUser }) {
  const [workouts, setWorkouts] = useState([]);

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
          window.location.href = "index.html";
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
        <h1>{isUser ? 'Workouts' : 'Catalog'}</h1>
        <div id="workout-links">
        {workouts.map(workout => (
            <React.Fragment key={workout.id}>
              <a
                href={`workout.html?id=${workout.id}${isUser ? '&user=true' : '&user=false'}`}
                className="workout_link btn btn-secondary"
              >
                {workout.name}
              </a>
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
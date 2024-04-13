import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../workout.css';

export function NewWorkout() {

    function addExerciseField(){

    }
    function createWorkout(){

    }


    return (
    <main className="workout-background">
    <div id="workout-form" className="translucent-box margin-bottom">
      <h1>New Workout</h1>
      <label htmlFor="workout-name">Workout Name:</label>
      <input type="text" id="workout-name" name="workout-name" className="workout-name" required /><br /><br />
  
      <div id="exercise-fields">
        {/* Exercise fields are added dynamically */}
      </div>
  
      <button type="button" className="btn btn-primary" onClick={addExerciseField}>Add Exercise</button><br /><br />
  
      <button type="button" className="btn btn-primary" onClick={createWorkout}>Create Workout</button>
    </div>
  </main>
    )
}
import React, { useState } from 'react';
import '../workout.css';
import { useNavigate } from 'react-router-dom';

class workoutReq {
    constructor(username, workout) {
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


function generateUniqueId() {
    const timestamp = new Date().getTime();
    const random = Math.random().toString(36).substring(2);
    return `${timestamp}${random}`;
}

export function NewWorkout() {
    const [workoutName, setWorkoutName] = useState("");
    const [exercises, setExercises] = useState([]);
    const navigate = useNavigate();

    function addExerciseField() {
        setExercises(prevExercises => [
            ...prevExercises,
            {
                exerciseName: "",
                reps: "",
                sets: ""
            }
        ]);
    }

    function handleFieldChange(index, fieldName, value) {
        setExercises(prevExercises => {
            const newExercises = [...prevExercises];
            newExercises[index][fieldName] = value;
            return newExercises;
        });
    }

    async function createWorkout() {
        const workoutObj = new workout(workoutName, exercises);
    
        const username = getUsername(); 
    
        const req = new workoutReq(username, workoutObj);
    
        try {
            const response = await fetch('/api/workout', {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(req)
            });
    
            if (response.ok) {
                navigate("/workouts");
            } else {
                console.error('Failed to create workout:', response.statusText);
                navigate("/");
            }
        } catch (error) {
            console.error('Error creating workout:', error);
        }
    }

    return (
        <main className="workout-background">
            <div id="workout-form" className="translucent-box margin-bottom">
                <h1>New Workout</h1>
                <label htmlFor="workout-name">Workout Name:</label>
                <input
                    type="text"
                    id="workout-name"
                    name="workout-name"
                    className="workout-name"
                    required
                    value={workoutName}
                    onChange={(e) => setWorkoutName(e.target.value)}
                /><br /><br />

                <div id="exercise-fields">
                    {exercises.map((exercise, index) => (
                        <div key={index}>
                            <input
                                type="text"
                                className="exercise-name"
                                placeholder="Exercise Name"
                                value={exercise.exerciseName}
                                onChange={(e) => handleFieldChange(index, "exerciseName", e.target.value)}
                            />
                            <input
                                type="number"
                                className="reps"
                                placeholder="# of Reps/Minutes"
                                value={exercise.reps}
                                onChange={(e) => handleFieldChange(index, "reps", e.target.value)}
                            />
                            <input
                                type="number"
                                className="sets"
                                placeholder="Sets"
                                value={exercise.sets}
                                onChange={(e) => handleFieldChange(index, "sets", e.target.value)}
                            />
                        </div>
                    ))}
                </div>

                <button type="button" className="btn btn-primary" onClick={addExerciseField}>Add Exercise</button><br /><br />

                <button type="button" className="btn btn-primary" onClick={createWorkout}>Create Workout</button>
            </div>
        </main>
    );

    function getUsername() {
        return localStorage.getItem('username') ?? 'Mystery user';
      }
}
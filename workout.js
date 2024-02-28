


class workout{
    constructor(name, exercises){
        this.name = name;
        this.exercises = exercises;
        this.id = generateUniqueId(); //Change to uuid once we use react
    }
}

class exercise{
    constructor(name, reps, sets){
        this.name = name;
        this.reps = reps;
        this.sets = sets;
    }
}

function generateUniqueId() {
    const timestamp = new Date().getTime();
    const random = Math.random().toString(36).substring(2);
    return `${timestamp}${random}`;
}

function addExerciseField() {
    const exerciseFields = document.getElementById('exercise-fields');

    const exerciseContainer = document.createElement('div');

    // Exercise name
    const exerciseName = document.createElement('input');
    exerciseName.type = 'text';
    exerciseName.name = 'exercise-name';
    exerciseName.classList.add('exercise-name');
    exerciseName.placeholder = 'Exercise Name';
    exerciseContainer.appendChild(exerciseName);

    //Number of reps/minutes
    const reps = document.createElement('input');
    reps.type = 'number';
    reps.name = 'reps';
    reps.classList.add('reps');
    reps.placeholder = '# of Reps/Minutes';
    exerciseContainer.appendChild(reps);

    //Number of sets
    const sets = document.createElement('input');
    sets.type = 'number';
    sets.name = 'sets';
    sets.classList.add('sets');
    sets.placeholder = 'Sets';
    exerciseContainer.appendChild(sets);

    exerciseFields.appendChild(exerciseContainer);
}

function createWorkout(){
    const workoutName = document.getElementById('workout-name').value;
    const exercises = [];

    const myWorkout = new workout(workoutName, exercises);

    const exerciseList = document.querySelectorAll('.exercise-name');
    const repsList = document.querySelectorAll('.reps');
    const setsList = document.querySelectorAll('.sets');

    for (let i = 0; i < exerciseList.length; i++) {
        const name = exerciseList[i].value;
        const reps = repsList[i].value;
        const sets = setsList[i].value;

        const newExercise = new exercise(name, reps, sets);
        myWorkout.exercises.push(newExercise);
    }

    localStorage.setItem(myWorkout.id, JSON.stringify(myWorkout));
    addWorkoutID(myWorkout.id);
    console.log(myWorkout.name);
    window.location.href = "user_workouts.html";
}

function addWorkoutID(id){
    let idList = JSON.parse(localStorage.getItem('idList')) || [];

    const newId = id;
    idList.push(newId);

    localStorage.setItem('idList', JSON.stringify(idList));
}

function createWorkoutLinks() {
    const workoutLinksContainer = document.getElementById('workout-links');
    let idList = JSON.parse(localStorage.getItem('idList')) || [];
    
    idList.forEach(id => {
        const link = document.createElement('a');
        const workout = JSON.parse(localStorage.getItem(id));
        link.href = `workout.html?id=${workout.id}`;
        link.textContent = workout.name;
        link.classList.add('workout_link');
        link.classList.add('btn');
        link.classList.add('btn-secondary');
        workoutLinksContainer.appendChild(link);
        workoutLinksContainer.appendChild(document.createElement('br'));
    });
}

  window.onload = function() {
    if (window.location.pathname === '/new_workout.html') {
        addExerciseField();
    }
    else if (window.location.pathname === '/workout.html') {
        //loadWorkout();
    }
    else if (window.location.pathname === '/user_workouts.html') {
        createWorkoutLinks();
    }
}
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

async function createWorkout(){
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


    try {
        const response = await fetch('/api/workout', {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify(myWorkout)
        });

        if (response.ok) {
            window.location.href = "user_workouts.html";
        } else {
            console.error('Failed to create workout:', response.statusText);
        }
    } catch (error) {
        console.error('Error creating workout:', error);
    }
}

// function addWorkoutID(id){
//     let idList = JSON.parse(localStorage.getItem('idList')) || [];

//     const newId = id;
//     idList.push(newId);

//     localStorage.setItem('idList', JSON.stringify(idList));
// }

async function createWorkoutLinks(isUser) {
    const workoutLinksContainer = document.getElementById('workout-links');
    let workouts = new Map();
    let workoutsArray = [];
    try {
        if(isUser){
            const response = await fetch('/api/workouts');
            workoutsArray = await response.json();
        }
        else{
            const response = await fetch('/api/catalog');
            workoutsArray = await response.json();
        }
    
      } catch (error){
        console.error('Error creating workout links:', error);
      }

    console.log("WorkoutsArry");
    console.log(workoutsArray);
      workoutsArray.forEach(([key, value]) => {
        workouts.set(key, value);
    });
    
    console.log(workouts);
    for (const [id, workout] of workouts) {
        const link = document.createElement('a');
        link.href = `workout.html?id=${id}`;
        link.textContent = workout.name;
        link.classList.add('workout_link');
        link.classList.add('btn');
        link.classList.add('btn-secondary');
        workoutLinksContainer.appendChild(link);
        workoutLinksContainer.appendChild(document.createElement('br'));
    };
}

async function loadWorkout(workoutID){
    let workouts = new Map();
    let catalog = new Map();
    let workoutData = new workout;
    let workoutsArray = [];

    try {
        const response = await fetch('/api/workouts');
        workoutsArray = await response.json();
        const response2 = await fetch('/api/catalog');
        catalogArray = await response2.json();
      } catch (error){
        console.error('Error loading workout:', error);
      }

    workoutsArray.forEach(([key, value]) => {
        workouts.set(key, value);
    });

    catalogArray.forEach(([key, value]) => {
        catalog.set(key, value);
    });

    if(workouts.has(workoutID)){
        workoutData = workouts.get(workoutID);
    }
    else{
        workoutData = catalog.get(workoutID);
    }

    //Workout Name
    const workoutName = document.querySelector('.workoutName');
    workoutName.textContent = workoutData.name;

    //Excercises
    const exerciseList = workoutData.exercises;
    const exerciseField = document.getElementById('exercises');

    const table = document.createElement('table');
    table.classList.add('table');

    //headers
    const headerRow = document.createElement('tr');

    const exerciseNameHeader = document.createElement('th');
    exerciseNameHeader.textContent = 'Exercise';
    headerRow.appendChild(exerciseNameHeader);

    const repsHeader = document.createElement('th');
    repsHeader.textContent = 'Reps/Min';
    headerRow.appendChild(repsHeader);

    const setsHeader = document.createElement('th');
    setsHeader.textContent = 'Sets';
    headerRow.appendChild(setsHeader);

    table.appendChild(headerRow);

    for (let i = 0; i < exerciseList.length; i++) {
        const exerciseRow = document.createElement('tr');
        
        // Exercise name cell
        const exerciseNameCell = document.createElement('td');
        const exerciseName = document.createTextNode(exerciseList[i].name);
        exerciseNameCell.appendChild(exerciseName);
        exerciseRow.appendChild(exerciseNameCell);

        // Reps cell
        const repsCell = document.createElement('td');
        const reps = document.createTextNode(exerciseList[i].reps);
        repsCell.appendChild(reps);
        exerciseRow.appendChild(repsCell);

        // Sets cell
        const setsCell = document.createElement('td');
        const sets = document.createTextNode(exerciseList[i].sets);
        setsCell.appendChild(sets);
        exerciseRow.appendChild(setsCell);

        table.appendChild(exerciseRow);
    }

    exerciseField.appendChild(table);
    exerciseField.classList.add('table-container');

}

function populateStats(){
    let statNum = 0;
    let downNum = 0;
    function increaseStats() {
        statNum += Math.floor(Math.random() * 5);
        downNum += Math.floor(Math.random() * 2);
        const visitsSpan = document.getElementById('visits');
        const downloadsSpan = document.getElementById('downloads');
        visitsSpan.textContent = `Visits: ${statNum}`;
        downloadsSpan.textContent = `Downloads: ${downNum}`;
    }
    
    const intervalId = setInterval(increaseStats, 3000);
}

  window.onload = async function() {
    if (window.location.pathname === '/new_workout.html') {
        const user = new User();
        addExerciseField();
    }
    else if (window.location.pathname === '/workout.html') {
        const user = new User();
        const url = window.location.search;
        const urlParams = new URLSearchParams(url);
        const workoutID = urlParams.get('id');
        loadWorkout(workoutID);
        populateStats();
    }
    else if (window.location.pathname === '/user_workouts.html') {
        const user = new User();
        let idList = JSON.parse(localStorage.getItem('idList')) || [];
        createWorkoutLinks(true);
    }
    else if (window.location.pathname === '/workout_catalog.html'){
        const user = new User();

        try {
            const response2 = await fetch('/api/catalog');
            catalogArray = await response2.json();
          } catch (error){
            console.error('Error loading workout:', error);
          }

        
        if(catalogArray.length == 0){
            // A sample workout for the catalog
            const exercises = [];
            const workout1 = new workout("Easy Workout", exercises);

            const exercise1 = new exercise("Push-ups", 30, 3);
            workout1.exercises.push(exercise1);
            const exercise2 = new exercise("Sit-ups", 50, 3);
            workout1.exercises.push(exercise2);
            const exercise3 = new exercise("Squats", 30, 3);
            workout1.exercises.push(exercise3);
            const exercise4 = new exercise("Planks", 1, 3);
            workout1.exercises.push(exercise4);

            try {
                const response = await fetch('/api/upload', {
                    method: 'POST',
                    headers: {'content-type': 'application/json'},
                    body: JSON.stringify(workout1)
                });
            } catch (error) {
                console.error('Error creating catalog:', error);
            }
        }
    
        createWorkoutLinks(false);
    }
}
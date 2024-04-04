class workout{
    constructor(name, exercises){
        this.name = name;
        this.exercises = exercises;
        this.stats = { views: 0, downloads: 0};
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

class workoutReq{
    constructor(username, workout){
        this.username = username;
        this.workout = workout;
    }
}

const viewEvent = 'view';
const DownloadEvent = 'download';

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

    username = getUsername();
    const req = new workoutReq(username, myWorkout);
    console.log("Adding workout " + JSON.stringify(myWorkout));

    try {
        const response = await fetch('/api/workout', {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify(req)
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

function getUsername() {
    return localStorage.getItem('username') ?? 'Mystery user';
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
    const username = getUsername();

    try {
        if(isUser){
            const response = await fetch('/api/workouts', {
                method: 'POST',
                headers: {'content-type': 'application/json'},
                body: JSON.stringify({ username: username })
            });
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

    workoutsArray.forEach(workout => {
        workouts.set(workout.id, workout);
    });
    
    console.log(workouts);
    for (const [id, workout] of workouts) {
        const link = document.createElement('a');
        if(isUser){
            link.href = `workout.html?id=${id}&user=true`;
        }
        else{
            link.href = `workout.html?id=${id}&user=false`;
            // Might need to fix catalog part
        }
        link.textContent = workout.name;
        link.classList.add('workout_link');
        link.classList.add('btn');
        link.classList.add('btn-secondary');
        workoutLinksContainer.appendChild(link);
        workoutLinksContainer.appendChild(document.createElement('br'));
    };
}

async function loadWorkout(workoutID, isUser){
    let workouts = new Map();
    let catalog = new Map();
    let workoutData = new workout;
    let workoutsArray = [];
    username = getUsername();

    try {
        if(isUser){
            const response = await fetch('/api/workouts', {
                method: 'POST',
                headers: {'content-type': 'application/json'},
                body: JSON.stringify({ username: username })
            });
            workoutsArray = await response.json();
        }
        else{
            const response = await fetch('/api/catalog');
            workoutsArray = await response.json();
        }
    
      } catch (error){
        console.error('Error creating workout links:', error);
      }

    workoutsArray.forEach(workout => {
        workouts.set(workout.id, workout);
    });


    workoutData = workouts.get(workoutID);

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


function uploadButton() {
    const urlParams = new URLSearchParams(window.location.search);
    const div = document.querySelector('#uploadBtn');
    const workoutID = urlParams.get('id');
    const isUser = urlParams.get('user') === 'true';

    if (isUser) {
        // Make Upload button
        const uploadButton = document.createElement('button');
        uploadButton.type = 'button';
        uploadButton.className = 'btn btn-primary';
        uploadButton.textContent = 'Upload';
        uploadButton.onclick = function() {
            uploadWorkout(workoutID);
        };
        div.appendChild(uploadButton);        

    } else {
        // Make Download button
        const downloadButton = document.createElement('button');
        downloadButton.type = 'button';
        downloadButton.className = 'btn btn-primary';
        downloadButton.textContent = 'Download';
        downloadButton.onclick = function() {
            downloadWorkout(workoutID);
        };
        div.appendChild(downloadButton);                
    }
}

async function uploadWorkout(workoutID){
    let workouts = new Map();
    let workoutData = new workout;
    let workoutsArray = [];

    try {
        const response = await fetch('/api/workouts', {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify({ username: getUsername() })
        });
        workoutsArray = await response.json();
      } catch (error){
        console.error('Error uploading workout:', error);
      }


    workoutsArray.forEach(workout => {
        workouts.set(workout.id, workout);
    });

    if(workouts.has(workoutID)){
        workoutData = workouts.get(workoutID);
    }


    try {
        const response = await fetch('/api/upload', {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify(workoutData)
        });
        } catch (error) {
            console.error('Error uploading:', error);
        }

    
}

async function downloadWorkout(workoutID){
    const socket = new Websocket();
    socket.configureWebSocket();

    let catalog = new Map();
    let workoutData = new workout;

    try {
        const response = await fetch('/api/catalog');
        catalogArray = await response.json();
      } catch (error){
        console.error('Error downloading workout:', error);
      }

    catalogArray.forEach(workout => {
        catalog.set(workout.id, workout);
    });

    workoutData = catalog.get(workoutID);

    updateDownloads(workoutData);
    const event = {
        type: DownloadEvent,
        data: workoutData, 
      };
    console.log("broadcasting download");
    socket.broadcastEvent(event);
    console.log("back from broadcasting");


    const req = new workoutReq(getUsername(), workoutData);

    try {
        const response = await fetch('/api/workout', {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify(req)
        });

        if (response.ok) {
            await new Promise(resolve => setTimeout(resolve, 5000));
            window.location.href = "user_workouts.html";
        } else {
            console.error('Failed to download workout:', response.statusText);
        }
    } catch (error) {
        console.error('Error downloading workout:', error);
    }
}

// function populateStats(){
//     let statNum = 0;
//     let downNum = 0;
//     function increaseStats() {
//         statNum += Math.floor(Math.random() * 5);
//         downNum += Math.floor(Math.random() * 2);
//         const visitsSpan = document.getElementById('visits');
//         const downloadsSpan = document.getElementById('downloads');
//         visitsSpan.textContent = `Visits: ${statNum}`;
//         downloadsSpan.textContent = `Downloads: ${downNum}`;
//     }
    
//     const intervalId = setInterval(increaseStats, 3000);
// }

function updateStats(workoutData){
    const visitsSpan = document.getElementById('visits');
    const downloadsSpan = document.getElementById('downloads');
    visitsSpan.textContent = `Visits: ${workoutData.stats.views}`;
    downloadsSpan.textContent = `Downloads: ${workoutData.stats.downloads}`;
}

async function updateViews(workoutID){
    console.log("in update views");

    const socket = new Websocket();
    socket.configureWebSocket();

    let catalog = new Map();
    let workoutData = new workout;

    try {
        const response = await fetch('/api/catalog');
        catalogArray = await response.json();
      } catch (error){
        console.error('Error downloading workout:', error);
      }

    catalogArray.forEach(workout => {
        catalog.set(workout.id, workout);
    });

    workoutData = catalog.get(workoutID);

    workoutData.stats.views += 1;

    req = {workoutID: workoutData.id, workout: workoutData}

    try {
        const response = await fetch('/api/update', {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify(req)
        });

        if (response.ok) {
        } else {
            console.error('Failed to update workout:', response.statusText);
        }
    } catch (error) {
        console.error('Error updating workout:', error);
    }

    const event = {
    type: viewEvent,
    data: workoutData, 
    };

    socket.broadcastEvent(event);
}

async function updateDownloads(workoutData){

    workoutData.stats.downloads += 1;

    req = {workoutID: workoutData.id, workout: workoutData}

    try {
        const response = await fetch('/api/update', {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify(req)
        });

        if (response.ok) {
        } else {
            console.error('Failed to update workout:', response.statusText);
        }
    } catch (error) {
        console.error('Error updating workout:', error);
    }

}

class Websocket{
    socket;

    configureWebSocket() {
        const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
        this.socket = new WebSocket(`${protocol}://${window.location.host}/ws`);

        console.log("websocket configuring");

        this.socket.onmessage = async (event) => {
        console.log("in onmessage");
        const msg = JSON.parse(await event.data.text());
        if (msg.type === viewEvent || msg.type === DownloadEvent){
            if(window.location.pathname === '/workout.html'){
                const url = window.location.search;
                const urlParams = new URLSearchParams(url);
                const workoutID = urlParams.get('id');
                if(workoutID === msg.data.id){
                    updateStats(msg.data);
                }
            }
            
        }

        // if (msg.type === viewEvent ) {
        //     updateViews(msg.data);
        // } else if (msg.type === DownloadEvent) {
        //     console.log("in download event");
        //     updateDownloads(msg.data);
        // }
        };
    }

    broadcastEvent(event) {
        this.socket.send(JSON.stringify(event));
    }

}

  window.onload = async function() {
    if (window.location.pathname === '/new_workout.html') {
        // const user = new User();
        addExerciseField();
    }
    else if (window.location.pathname === '/workout.html') {
        const socket = new Websocket(); 
        socket.configureWebSocket();

        const url = window.location.search;
        const urlParams = new URLSearchParams(url);
        const workoutID = urlParams.get('id');
        const isUser = urlParams.get('user') === 'true';

        console.log("about to enter update views");
        updateViews(workoutID);
        loadWorkout(workoutID, isUser);
        uploadButton();
    }
    else if (window.location.pathname === '/user_workouts.html') {
        createWorkoutLinks(true);
    }
    else if (window.location.pathname === '/workout_catalog.html'){

        createWorkoutLinks(false);
    }
}
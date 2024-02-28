class workout{

}

function addExerciseField() {
    const exerciseFields = document.getElementById('exercise-fields');

    const exerciseContainer = document.createElement('div');

    // Exercise Name
    const exerciseName = document.createElement('input');
    exerciseName.type = 'text';
    exerciseName.name = 'exercise-name';
    exerciseName.placeholder = 'Exercise Name';
    exerciseContainer.appendChild(exerciseName);

    //Number of reps/Minutes
    const reps = document.createElement('input');
    reps.type = 'number';
    reps.name = 'reps';
    reps.placeholder = '# of Reps/Minutes';
    exerciseContainer.appendChild(reps);

    //Number of sets
    const sets = document.createElement('input');
    sets.type = 'number';
    sets.name = 'sets';
    sets.placeholder = 'Sets';
    exerciseContainer.appendChild(sets);

    exerciseFields.appendChild(exerciseContainer);
}
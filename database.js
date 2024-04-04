const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('smartWorkouts');
const userCollection = db.collection('users')
const workoutCollection = db.collection('workouts');

workoutCollection.createIndex({ username: 1 }, { unique: true });
userCollection.createIndex({ username: 1 }, { unique: true });

async function initializeCatalogUser() {
    const catalog = {
        username: 'catalog123456789',
        password: 'password'
    };
    console.log("bouta verify to initializeCatalogUser");
    if (!(await usernameExists(catalog.username))) {
        console.log("user no existo");
        await addUser(catalog);
        const catalogWorkout = {
            username: catalog.username,
            workouts: {}
        };
        await workoutCollection.insertOne(catalogWorkout);
    }
}


(async function testConnection() {
  await client.connect();
  await db.command({ ping: 1 });
})().catch((ex) => {
  console.log(`Unable to connect to database with ${url} because ${ex.message}`);
  process.exit(1);
});


async function addWorkout(username, workout){
    console.log("In addworkout DB");
    console.log("username: " + username);
    console.log("workout: " + JSON.stringify(workout));
    const filter = { username: username };
    const update = { $set: { [`workouts.${workout.id}`]: workout } };

    await workoutCollection.updateOne(filter, update);
}

async function addUser(user){
    console.log(" - DB addUser");
    const exists = await usernameExists(user.username);
    if(!exists){
        console.log("Username does not exist")
        const passwordHash = await bcrypt.hash(user.password, 10);
        const newUser = {
            username: user.username,
            password: passwordHash
        };
        await userCollection.insertOne(newUser);
        await workoutCollection.insertOne({ username: user.username, workouts: {} });
        return true;
    }
    else {
        return false;
    }
    
}

async function updateWorkout(workoutID, workout){
    console.log(" - DB updateWorkout");
    const filter = { "workouts.id": workoutID };
    const update = { $set: { "workouts.$": workout } };

    await workoutCollection.updateMany(filter, update);
    
}

async function getUserWorkouts(username){
    const filter = { username: username };
    const projection = { workouts: 1 };

    const document = await workoutCollection.findOne(filter, { projection: projection });
    console.log("Document:", document);
    return document ? document.workouts : {};
}

async function verifyUser(user){
    console.log("DB Verify user function");
    const username = user.username;
    const providedPassword = user.password;
    console.log(" -verifying " + username);

    const filter = { username: username };
    const result = await userCollection.findOne(filter);
    if (result) {
        const hashedPassword = result.password;
        const match = await bcrypt.compare(providedPassword, hashedPassword);
        return match;
    } else {
        return false;
    }
}

async function usernameExists(username) {
    console.log("in username exists");
    const filter = { username: username };
    const result = await userCollection.findOne(filter);
    console.log("result");
    console.log(result);
    return result !== null;
}

async function changeUsername(oldUsername, newUsername) {
    const filter = { username: oldUsername };
    const update = { $set: { username: newUsername } };

    if(!await usernameExists(newUsername)){
        await userCollection.updateOne(filter, update);
        await workoutCollection.updateOne(filter, update);
        return true
    }
    else{
        return false
    }
}

async function changePassword(username, password) {
    const passwordHash = await bcrypt.hash(password, 10);
    const filter = { username: username };
    const update = { $set: { password: passwordHash } };

    await userCollection.updateOne(filter, update);
    return true
}

module.exports = {addWorkout, addUser, getUserWorkouts, verifyUser, initializeCatalogUser, changeUsername, changePassword, updateWorkout};


const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('smartWorkouts');
const userCollection = db.collection('users')
const workoutCollection = db.collection('workouts');

workoutCollection.createIndex({ username: 1 }, { unique: true });
userCollection.createIndex({ username: 1 }, { unique: true });


(async function testConnection() {
  await client.connect();
  await db.command({ ping: 1 });
})().catch((ex) => {
  console.log(`Unable to connect to database with ${url} because ${ex.message}`);
  process.exit(1);
});


async function addWorkout(username, workout){
    const filter = { username: username };
    const update = { $set: { [`workouts.${workout.id}`]: workout } };

    await workoutCollection.updateOne(filter, update);
}

async function addUser(user){
    await userCollection.insertOne(user);
}

async function getUserWorkouts(username){
    const filter = { username: username };
    const projection = { workouts: 1 };

    const document = await workoutCollection.findOne(filter, { projection: projection });
    return document ? document.workouts : null;
}

async function verifyUser(user){
    const username = user.username;
    const password = user.password;

    const filter = { username: username, password: password };
    const result = await userCollection.findOne(filter);
    return result !== null;
}

module.exports = {addWorkout, addUser, getUserWorkouts, verifyUser};


const express = require('express');
const DB = require('./database.js');
const app = express();

const port = process.argv.length > 2 ? process.argv[2] : 3000;

app.use(express.json());

app.use(express.static('public'));

var apiRouter = express.Router();
app.use(`/api`, apiRouter);

// apiRouter.get('/workouts', (_req, res) => {
//     console.log("in workouts endpoint..");
//     const workoutsArray = Array.from(workouts); 
//     res.json(workoutsArray);
//   });

apiRouter.post('/workouts', (req, res) => {
    console.log("in workouts endpoint..");

    username = req.body;
    const workoutsArray = Array.from(DB.getUserWorkouts(username)); 
    res.json(workoutsArray);
  });

apiRouter.get('/catalog', (_req, res) => {
    console.log("in catalog endpoint..");

    // const workoutsArray = Array.from(catalog); 
    // res.json(workoutsArray);

    const workoutsArray = Array.from(DB.getUserWorkouts("catalog123456789")); 
    res.json(workoutsArray);
    
  });

apiRouter.get('/idList', (_req, res) => {
    console.log("in idList endpoint..");
    res.send(idList);
  });

apiRouter.post('/workout', (req, res) => {
    console.log("in workout endpoint..");

    // workouts.set(req.body.id, req.body);
    // idList.push(req.body.id);
    // res.send(workouts);

    DB.addWorkout(req.body.username, req.body.workout);
  });

apiRouter.post('/upload', (req, res) => {
    console.log("in upload endpoint..");

    // catalog.set(req.body.id, req.body);
    // res.send(catalog);

    DB.addWorkout("catalog123456789", req.body.workout);
  });

apiRouter.post('/user', (req, res) => {
    console.log("in user post endpoint..");
    const user = req.body;
    DB.initializeCatalogUser();
    DB.addUser(user);
    res.status(200);
  });

// apiRouter.get('/user', async (req, res) => {
//   const username = req.query.username;
//   const password = req.query.password;
//   console.log(username);
//   const user = { username, password };

//   const exists = await DB.verifyUser(user);
//   res.json({ exists: exists });
//   });

apiRouter.post('/verify', async (req, res) => {
  console.log("verify endpoint");
  const username = req.body.username;
  const password = req.body.password;
  const user = { username, password };
  console.log(" -verifying " + username);

  // DB.initializeCatalogUser();

  const exists = await DB.verifyUser(user);
  console.log("logging exists");
  console.log(exists);
  res.send({ exists: exists });
  });

app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

// let workouts = new Map();
// let catalog = new Map();
let idList = [];
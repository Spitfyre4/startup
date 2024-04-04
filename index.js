const express = require('express');
const DB = require('./database.js');
const { peerProxy } = require('./peerProxy.js');
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

apiRouter.post('/workouts', async (req, res) => {
  console.log("\n");
    console.log("in workouts endpoint..");

    username = req.body.username;
    const workouts = await DB.getUserWorkouts(username);
    const workoutsArray = Object.values(JSON.parse(JSON.stringify(workouts))); 
    console.log("array: " + JSON.stringify(workoutsArray));
    res.json(workoutsArray);
    console.log("\n");
  });

apiRouter.get('/catalog', async (_req, res) => {
  console.log("\n");
    console.log("in catalog endpoint..");

    // const workoutsArray = Array.from(catalog); 
    // res.json(workoutsArray);

    const workouts = await DB.getUserWorkouts("catalog123456789"); 
    const workoutsArray = Object.values(JSON.parse(JSON.stringify(workouts))); 
    res.json(workoutsArray);
    console.log("\n");
    
  });

apiRouter.get('/idList', (_req, res) => {
  console.log("\n");
    console.log("in idList endpoint..");
    res.send(idList);
    console.log("\n");
  });

apiRouter.post('/workout', async (req, res) => {
  console.log("\n");
    console.log("in workout endpoint..");

    // workouts.set(req.body.id, req.body);
    // idList.push(req.body.id);
    // res.send(workouts);

    console.log("username: " + req.body.username);
    console.log("workout: " + JSON.stringify(req.body.workout));
    const added = await DB.addWorkout(req.body.username, req.body.workout);
    res.send({added: added});
    console.log("\n");
  });

  apiRouter.post('/update', async (req, res) => {
    console.log("\n");
    console.log("in update endpoint..");
    
    console.log("\n");
    console.log("New workout: " + JSON.stringify(req.body.workout));
    console.log("\n");

    const added = await DB.updateWorkout(req.body.workoutID, req.body.workout);
    res.send({added: added});
    console.log("\n");
  });

apiRouter.post('/upload', async (req, res) => {
    console.log("\n");
    console.log("in upload endpoint..");

    // catalog.set(req.body.id, req.body);
    // res.send(catalog);
    console.log("workout in upload: " + JSON.stringify(req.body));

    const added = await DB.addWorkout("catalog123456789", req.body);
    console.log("out of add, back in upload");
    res.send({added: added});
    console.log("\n");
  });

apiRouter.post('/user', async (req, res) => {
  console.log("\n");
    console.log("in user post endpoint..");
    const user = req.body;

    const added = await DB.addUser(user);
    console.log(" - finished DB add, back in endpoint")
    res.status(200);
    console.log("added: ");
    console.log(added);
    res.send({added: added});
    console.log("\n");
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
  console.log("\n");
  console.log("verify endpoint");
  const username = req.body.username;
  const password = req.body.password;
  const user = { username, password };
  console.log(" -verifying " + username);

  const exists = await DB.verifyUser(user);
  console.log("logging exists");
  console.log(exists);
  res.send({ exists: exists });
  console.log("\n");
  });

apiRouter.post('/change-username', async (req, res) => {
    const { oldUsername, newUsername } = req.body;
    const changed = await DB.changeUsername(oldUsername, newUsername);
    res.send({ changed: changed });
});

apiRouter.post('/change-password', async (req, res) => {
    const { username, password } = req.body;
    const changed = await DB.changePassword(username, password);
    res.send({ changed: changed});
});

app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

const httpService = app.listen(port, () => {
  DB.initializeCatalogUser();
  console.log(`Listening on port ${port}`);
});

peerProxy(httpService);

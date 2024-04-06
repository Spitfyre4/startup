const cookieParser = require('cookie-parser');
const express = require('express');
const DB = require('./database.js');
const { peerProxy } = require('./peerProxy.js');
const app = express();

const authCookieName = 'token';

const port = process.argv.length > 2 ? process.argv[2] : 3000;

app.use(express.json());

app.use(cookieParser());

app.use(express.static('public'));

var apiRouter = express.Router();
app.use(`/api`, apiRouter);

// apiRouter.get('/workouts', (_req, res) => {
//     console.log("in workouts endpoint..");
//     const workoutsArray = Array.from(workouts); 
//     res.json(workoutsArray);
//   });

apiRouter.get('/idList', (_req, res) => {
  console.log("\n");
    console.log("in idList endpoint..");
    res.send(idList);
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

    setAuthCookie(res, user.token);

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
  let exists = false;
  console.log(" -verifying " + username);

  const trueUser = await DB.verifyUser(user);
  if(trueUser){
    exists = true;
  }
  console.log(trueUser);
  console.log("logging exists");
  console.log(exists);
  setAuthCookie(res, trueUser.token);
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

const secureApiRouter = express.Router();
apiRouter.use(secureApiRouter);

secureApiRouter.use(async (req, res, next) => {
  console.log("\nIn secureApi");
  const authToken = req.cookies[authCookieName];
  console.log("Retrieved auth -> " + authToken);
  const user = await DB.getUserByToken(authToken);
  console.log("verifying -> " + user);
  if (user) {
    console.log("User authorized");
    next();
  } else {
    console.log("User not authorized");
    res.status(401).send({ msg: 'Unauthorized' });
  }
});

secureApiRouter.post('/workouts', async (req, res) => {
  console.log("\n");
    console.log("in workouts endpoint..");

    username = req.body.username;
    const workouts = await DB.getUserWorkouts(username);
    const workoutsArray = Object.values(JSON.parse(JSON.stringify(workouts))); 
    console.log("array: " + JSON.stringify(workoutsArray));
    res.json(workoutsArray);
    console.log("\n");
  });


secureApiRouter.get('/catalog', async (_req, res) => {
  console.log("\n");
    console.log("in catalog endpoint..");

    // const workoutsArray = Array.from(catalog); 
    // res.json(workoutsArray);

    const workouts = await DB.getUserWorkouts("catalog123456789"); 
    const workoutsArray = Object.values(JSON.parse(JSON.stringify(workouts))); 
    res.json(workoutsArray);
    console.log("\n");
    
  });

secureApiRouter.post('/workout', async (req, res) => {
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

secureApiRouter.post('/update', async (req, res) => {
  console.log("\n");
  console.log("in update endpoint..");

  console.log("\n");
  console.log("New workout: " + JSON.stringify(req.body.workout));
  console.log("\n");

  const added = await DB.updateWorkout(req.body.workoutID, req.body.workout);
  res.send({added: added});
  console.log("\n");
});

app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

function setAuthCookie(res, authToken) {
  res.cookie(authCookieName, authToken, {
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
  });
}

const httpService = app.listen(port, () => {
  DB.initializeCatalogUser();
  console.log(`Listening on port ${port}`);
});

peerProxy(httpService);

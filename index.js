const express = require('express');
const DB = require('./database.js');
const app = express();

const port = process.argv.length > 2 ? process.argv[2] : 3000;

app.use(express.json());

app.use(express.static('public'));

var apiRouter = express.Router();
app.use(`/api`, apiRouter);

apiRouter.get('/workouts', (_req, res) => {
    console.log("in workouts endpoint..");
    const workoutsArray = Array.from(workouts); 
    res.json(workoutsArray);
  });

apiRouter.get('/catalog', (_req, res) => {
    console.log("in catalog endpoint..");
    const workoutsArray = Array.from(catalog); 
    res.json(workoutsArray);
  });

  apiRouter.get('/idList', (_req, res) => {
    console.log("in idList endpoint..");
    res.send(idList);
  });

apiRouter.post('/workout', (req, res) => {
    console.log("in workout endpoint..");
    console.log(req.body);
    workouts.set(req.body.id, req.body);
    idList.push(req.body.id);
    res.send(workouts);
  });

apiRouter.post('/upload', (req, res) => {
    console.log("in upload endpoint..");
    catalog.set(req.body.id, req.body);
    res.send(catalog);
  });

apiRouter.post('/user', (req, res) => {
    console.log("in user post endpoint..");
    const user = req.body

    DB.addUser(user)
  });

apiRouter.get('/user', async (_req, res) => {
  const user = req.body;

  const exists = await DB.verifyUser(user);
  res.json({ exists: exists });
  });

app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

let workouts = new Map();
let catalog = new Map();
let idList = [];
const express = require('express');
const app = express();

const port = process.argv.length > 2 ? process.argv[2] : 3000;

app.use(express.json());

app.use(express.static('public'));

var apiRouter = express.Router();
app.use(`/api`, apiRouter);

apiRouter.get('/workouts', (_req, res) => {
    res.send(workouts);
  });

apiRouter.get('/catalog', (_req, res) => {
    res.send(catalog);
  });

  apiRouter.get('/idList', (_req, res) => {
    res.send(idList);
  });

apiRouter.post('/workout', (req, res) => {
    workouts.set(req.body.id, req.body);
    idList.push(req.body.id);
    res.send(workouts);
  });

apiRouter.post('/upload', (req, res) => {
    catalog.push(req.body.id, req.body);
    res.send(catalog);
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

// function addWorkout(newWorkout, workouts){
    
// }

// function updateCatalog(newWorkout, catalog){

// }
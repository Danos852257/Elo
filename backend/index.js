import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import { getUser, signUpFunction, loginFunction, createCompetition, getCompetitions } from './controller.js';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors())

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var corsOptions = {
  origin: 'http://localhost:5500',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.get('/getUser/:user', async (req, res) => {
  const { user } = req.params;
  res.json(await getUser(user));
});

app.get('/getCompetitionsWithUser/:user', async (req, res) => {
  const { user } = req.params;
  res.json(await getCompetitionsWithUser(user));
});

app.get("/loginFunction", async (req, res) => {
  const user = req.query.username;
  const pWord = req.query.password;
  res.json(await loginFunction(user, pWord))
});

app.get("/getCompetitions", async (req, res) =>{
  const username = req.query.username;
  const comps = await getCompetitions(username);
  res.json(comps);
});

app.post("/signUpFunction", async (req, res) => {
  const { username, password } = req.body;
  let data;
  try {
    data = await signUpFunction(username, password)
    res.json(data);
  } catch (error) {
    console.log(error)
    res.json(error.message);
  }
});

app.post("/createCompetition", async (req, res) => {
  const { user, compName,playerData, isPublic } = req.body;
  let data;
  try{
    data = await createCompetition(user, compName, isPublic, playerData);
    res.json(data)
  }catch(error){
    console.log(error)
    res.json(error.message)
  }
});

app.get('/api/items', (req, res) => {
  res.json([{ id: 1, name: 'Item 1' }, { id: 2, name: 'Item 2' }]);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

import express from 'express';
import { addPlayersToComp, getCompetitionsWithUser, getUser } from './controller.js';

const app = express();

app.use(express.json());

app.get('/getUser/:user', async (req, res) => {
  const { user } = req.params;
  res.json(await getUser(user));
});

app.get('/getCompetitionsWithUser/:user', async (req, res) => {
  const { user } = req.params;
  res.json(await getCompetitionsWithUser(user));
});

app.post('/setPlayers/:comp', async (req, res) => {
  const { comp } = req.params;
  const data = req.body;

  try {
    await addPlayersToComp(comp, data);
    res.status(200).json({ message: `Players updated for competition "${comp}"` });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update players' });
  }
});

app.get('/api/items', (req, res) => {
  res.json([{ id: 1, name: 'Item 1' }, { id: 2, name: 'Item 2' }]);
});

app.listen(3000, () => {
  console.log(`Server is running on http://localhost:${3000}`);
});

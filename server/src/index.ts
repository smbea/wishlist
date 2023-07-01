import express from 'express';
import { connectToDb } from './db';
import cors from 'cors';
import bodyParser from 'body-parser';
import { User } from './models/User';

import itemsRouter from './routes/items';

const app = express();
const port = 8080; // default port to listen

connectToDb().catch(e => {
  console.log(e);
});

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/items', itemsRouter);

app.get('/', (req, res) => {
  res.send('Hello world!');
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ where: { username, password } });

  if (user != null) {
    res.status(200).send({ message: 'okk' });
  } else {
    res.status(409).send({ message: 'The credentials are not correct' });
  }
});

// start the Express server
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});

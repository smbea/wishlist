import express from 'express';
import { connectToDb } from './db';
import cors from 'cors';
import bodyParser from 'body-parser';
import { User } from './models/User';
import { Item } from './models/Item';

const app = express();
const port = 8080; // default port to listen

connectToDb().catch(e => {
  console.log(e);
});

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// define a route handler for the default home page
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

app.post('/item', async (req, res) => {
  const data = req.body;

  await Item.sync();
  await Item.create({ ...data });

  res.status(200).send({ message: 'ok' });
});

app.get('/item', (req, res) => {
  const url: string = req.query.foo as string;

  fetch(`http://127.0.0.1:8000/?url=${url}`, { headers: { 'Content-type': 'application/json' } })
    .then(async (response) => {
      if (response.ok) {
        const body = await response.json();
        res.status(200).send(body);
      } else {
        const error = await response.json();
        res.status(400).send({ error });
      }
    }).catch((e) => {
      console.log(e);
    });
});

app.get('/items', async (req, res) => {
  const items = await Item.findAll();

  res.send(items);
});

app.delete('/item', async (req, res) => {
  const id = req.body.id;

  Item.destroy({ where: { id } })
    .then(() => {
      res.sendStatus(200);
    })
    .catch((e) => {
      console.log(e);
      res.sendStatus(400);
    });
});

// start the Express server
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});

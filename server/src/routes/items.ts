import express from 'express';
import { Item } from '../models/Item';

const router: express.Router = express.Router({ mergeParams: true });

// gets
router.get('/', async (req, res) => {
  const items = await Item.findAll();

  res.send(items);
});

router.get('/info', async (req, res) => {
  const url: string = req.query.url as string;

  if (url === '') res.status(400).send('Missing url parameter');

  fetch(`https://ecommerce-scraper-saeh.onrender.com/?url=${url}`, { headers: { 'Content-type': 'application/json' } })
    .then(async (response) => {
      if (response.ok) {
        const body = await response.json();
        res.status(200).send(body);
      } else {
        const error = await response.json();
        res.status(400).send(error.message);
      }
    }).catch((e) => {
      console.log(e);
    });
});

// posts
router.post('/', async (req, res) => {
  const data = req.body;

  await Item.sync();

  try {
    await Item.create({ ...data });
    res.sendStatus(200);
  } catch (e) {
    if (e.name === 'SequelizeUniqueConstraintError') {
      res.status(400).send('Item already saved');
    } else res.sendStatus(400);
  }
});

// puts
router.put('/:id', async (req, res) => {
  const id = req.params.id;
  const data = req.body;

  Item.update({ ...data }, { where: { id } })
    .then((updatedCount) => {
      if (updatedCount[0] > 0) res.sendStatus(200);
      else res.sendStatus(404);
    })
    .catch(() => {
      res.sendStatus(400);
    });
});

// deletes
router.delete('/:id', async (req, res) => {
  const id = req.params.id;

  Item.destroy({ where: { id } })
    .then((deletedCount) => {
      if (deletedCount > 0) res.sendStatus(200);
      else res.sendStatus(404);
    })
    .catch(() => {
      res.sendStatus(400);
    });
});

router.get('/info', async (req, res) => {
  const url: string = req.query.url as string;

  if (url === '') res.status(400).send('Missing url parameter');

  fetch(`https://ecommerce-scraper-saeh.onrender.com/?url=${url}`, { headers: { 'Content-type': 'application/json' } })
    .then(async (response) => {
      if (response.ok) {
        const body = await response.json();
        res.status(200).send(body);
      } else {
        const error = await response.json();
        res.status(400).send(error.message);
      }
    }).catch((e) => {
      console.log(e);
    });
});

export default router;

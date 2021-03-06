const Problem = require('../db/models/problem');
const Controller = require('./controller');
const ctrl = new Controller();
const jwt = require('../jwt');
const express = require('express');
const router = express.Router();
module.exports = router;

router.use(jwt.expressMiddleware);

ctrl.regester('create', (req, res) => {
  req.body.user_id = req.user.id;
  res.status(201);
  return Problem.create(req.body);
});

ctrl.regester('view', (req, res) => {
  return Problem.findById(req.params.id);
});

ctrl.regester('index', (req, res) => {
  return Problem.find(req.query);
});

ctrl.regester('remove', async (req, res) => {
  const problem = await Problem.findById(req.params.id);
  await problem.remove();
});

router.post('/', ctrl.create);
router.get('/:id', ctrl.view);
router.get('/', ctrl.index);
router.delete('/:id', ctrl.remove);


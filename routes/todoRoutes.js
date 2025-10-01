const express = require('express');
const router = express.Router();
const controller = require('../controllers/todoControllers');
const logger = require('../logger');

router.use((req, _res, next) => {
  console.log('➡️  todos router hit:', req.method, req.originalUrl);
  next();
});

router.get('/', controller.getAllTodos, (req, res) => {
  logger.info('➡️  get all todos');
  next();
});
router.post('/' , controller.createTodo);
router.patch('/:id', controller.updateTodo);
router.delete('/:id', controller.deleteTodo);

module.exports = router;
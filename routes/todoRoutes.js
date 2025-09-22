const express = require('express');
const router = express.Router();
const controller = require('../controllers/todoControllers');

router.use((req, _res, next) => {
  console.log('➡️  todos router hit:', req.method, req.originalUrl);
  next();
});

router.get('/', controller.getAllTodos);
router.post('/' , controller.createTodo);
router.put('/:id', controller.updateTodo);
router.delete('/:id', controller.deleteTodo);

module.exports = router;
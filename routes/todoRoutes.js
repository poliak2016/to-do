const express = require('express');
const router = express.Router();
const controller = require('../controllers/todoControllers');
const logger = require('../logger');

// router.get('/test-error', (req, res, next) => {
//   next(new Error("💥 Test error triggered!"));
// });


router.use((req, _res, next) => {
  logger.info('➡️  todos router hit:', req.method, req.originalUrl);
  next();
});

router.get('/', controller.getAllTodos);
router.post('/' , controller.createTodo);
router.patch('/:id', controller.updateTodo);
router.delete('/:id', controller.deleteTodo);

module.exports = router;
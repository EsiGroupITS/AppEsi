const { register, login, getAll } = require('../controllers/auth.controller');

const router = require('express').Router();

router.post('/api/register/',register);
router.get('/api/login/', login);
router.get('/api/users/', getAll);


module.exports = router;
const userController = require('../controllers/user.controller')
const authorization = require('../middlewares/authorization');
const roles = require('../constants/roles');

const express = require('express');
const router = express.Router();

// routes
router.post('/authenticate', userController.authenticateSchema, userController.authenticate);
router.post('/refresh-token', userController.refreshToken);
router.post('/revoke-token', authorization.authorize(), userController.revokeTokenSchema, userController.revokeToken);
router.post('/', authorization.authorize(roles.Admin), userController.create)
router.delete('/', authorization.authorize(roles.Admin), userController.remove)
router.get('/', authorization.authorize(roles.Admin), userController.getAll);
router.get('/:id', authorization.authorize(), userController.getById);
router.get('/:id/refresh-tokens', authorization.authorize(), userController.getRefreshTokens);


module.exports = router;

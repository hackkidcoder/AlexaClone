const express = require('express');
const userRoutes = express.Router();
const userCtrl = require('../controllers/user');
const {LOGIN, ADMINPANEL,FINDURL} = require('../utils/constants/app_constants').ROUTES.USER;
userRoutes.post(LOGIN, userCtrl.login);
userRoutes.post(ADMINPANEL, userCtrl.adminPanel);
userRoutes.post(FINDURL, userCtrl.findUrl);
module.exports = userRoutes;

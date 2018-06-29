const express = require('express');
const router = express.Router();

let authz_controller = require('../controllers/authzController');

router.post('/Plugin.Activate', authz_controller.plugin_activate);

router.post('/AuthZPlugin.AuthZReq', authz_controller.plugin_authreq);

router.post('/AuthZPlugin.AuthZRes', authz_controller.plugin_authres);

module.exports = router;

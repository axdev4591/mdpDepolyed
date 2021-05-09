const express = require('express');
const router = express.Router();
const orderCtrl = require('../controllers/orders')

router.post('/create', orderCtrl.createOrder)
router.get('/getorders/:userId', orderCtrl.getUserOrders);
router.get('/getusers', orderCtrl.getAllUser);
router.get('/getorders', orderCtrl.getUsersMiddleware);



module.exports = router;
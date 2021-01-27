const express = require('express');
const router = express.Router();
const productCtrl = require('../controllers/products')
const multer = require('../middleware/multer-config')
const util = require('../../util')



router.post('/create', util.isAuth, util.isAdmin, multer, productCtrl.createProduct)

router.get('/', productCtrl.getAllProducts)

router.get('/:filter', productCtrl.getAllProducts)

router.get('/:categorySlug/:filter', productCtrl.getProductsByCategory);

router.get('/detail/:categorySlug/:productSlug', productCtrl.getSingleProduct);

router.put('/update/:id', util.isAuth, util.isAdmin, multer, productCtrl.updateProduct)

router.delete('/delete/:id', util.isAuth, util.isAdmin, multer, productCtrl.deleteProduct)


module.exports = router;
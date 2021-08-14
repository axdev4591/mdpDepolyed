const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path')
const bodyParser = require('body-parser');
const config =  require('./config')
const util = require('./util')


  mongoose
  .connect(config.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  }).then(() => console.log('Successfully connected to Atlas MongoDB  !'))
  .catch((error) => console.log("Connection to Atlas MongoDb failed"+ error.reason));

 /* mongoose
  .connect(config.DIGITAL_MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    tlsCAFile: './ca-certificate.crt'
  }).then(() => console.log('Successfully connected to DigitalOcean MongoDB  !'))
  .catch((error) => console.log("Connection to DigitalOcean MongoDb failed"+ error.reason));
*/
const adminRoutes = require('./api/routes/admins');
const categoryRoutes = require('./api/routes/categories');
const userRoutes = require('./api/routes/users');
const productRoutes = require('./api/routes/products');
const cartItemRoutes = require('./api/routes/cartItems');
const orderRoutes = require('./api/routes/orders');

app.use(cors());
app.use(express.json());
app.use(bodyParser.json())
app.use('/admin', adminRoutes)
app.use('/category', categoryRoutes)
app.use('/user', userRoutes)
app.use('/products', productRoutes)
app.use('/cart', util.isAuth, cartItemRoutes)
app.use('/order', util.isAuth, orderRoutes)
app.use('/images', express.static(path.join(__dirname, 'images')))

//server static assests in production
if(process.env.NODE_ENV === 'production'){

  app.use(express.static('client/build'))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}
app.use((req, res, next) => {
  
    res.status(404).json({
        message: 'Not Found sorry'
    })
})




module.exports = app;


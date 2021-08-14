//import dotenv from 'dotenv';

 require("dotenv").config();

module.exports = {
  PORT: process.env.PORT || 2019,
  MONGODB_URL: 'mongodb+srv://admin:admin4591@cluster0.t0x6x.mongodb.net/mendpressdb?retryWrites=true&w=majority',
  JWT_SECRET: process.env.JWT_SECRET || 'somethingsecret',
  DIGITAL_MONGODB_URL: 'mongodb+srv://doadmin:z6sySTx785029A1E@mendpress-mongodb-f587283d.mongo.ondigitalocean.com/admin?authSource=admin&replicaSet=mendpress-mongodb&tls=true'
  //PAYPAL_CLIENT_ID: process.env.PAYPAL_CLIENT_ID || 'sb',
  //accessKeyId: process.env.accessKeyId || 'accessKeyId',
  //secretAccessKey: process.env.secretAccessKey || 'secretAccessKey',
};
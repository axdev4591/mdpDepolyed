//import dotenv from 'dotenv';

 require("dotenv").config();

module.exports = {
  PORT: process.env.PORT || 2019,
  MONGODB_URL: process.env.MONGODB_URI || 'mongodb+srv://admin:adminmdp@cluster0.mhofk.mongodb.net/test?authSource=admin&replicaSet=atlas-xioko1-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true',
  JWT_SECRET: process.env.JWT_SECRET || 'somethingsecret'
  //PAYPAL_CLIENT_ID: process.env.PAYPAL_CLIENT_ID || 'sb',
  //accessKeyId: process.env.accessKeyId || 'accessKeyId',
  //secretAccessKey: process.env.secretAccessKey || 'secretAccessKey',
};
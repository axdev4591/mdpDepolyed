const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const UserAddress = require('../models/userAddress');
const util =  require('../../util');



exports.updateUser = async (req, res) => {
    const userId = req.params.id;
    const user = await User.findById(userId);

    console.log("update user data "+JSON.stringify(req.body))
    if (user) {
      user.firstName = req.body.name || user.firstName;
      user.lastName = req.body.name || user.lastName;
      user.email = req.body.email || user.email;
      user.password = req.body.password || user.password;
      user.status = req.body.status || user.status;
      user.createdAt = req.body.createdAt || user.createdAt;
      user.sex = req.body.sex || user.sex;
      user.tel = req.body.tel || user.tel;
      
      const updatedUser = await user.save();
    /*  res.send({
        _id: updatedUser.id,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        token: getToken(updatedUser),
      });*/

      res.status(200).json({
        message: updatedUser
    })
    console.log("data successfully updated "+JSON.stringify(updatedUser))

    } else {
      res.status(404).send({ message: 'User Not Found' });
    }
  }

exports.createAdmin = (req, res, next) => {

    User.findOne({email: req.body.email})
    .exec()
    .then(user => {

        if(user){
            console.log('Email Already Exists')
            return res.status(500).json({
                Errormessage: 'Email Already Exists'
            })
           
        }else{

            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if(err){
                    return res.status(500).json({
                        message: 'Something went wrong'
                    });
                }else{
                    const user = new User({
                        _id: new mongoose.Types.ObjectId(),
                        firstName: req.body.firstName,
                        lastName: req.body.lastName,
                        email: req.body.email,
                        password: hash,
                        isAdmin: true,
                        createdAt: new Date().toISOString()
                    });

                    user.save()
                    .then(newUser  => {
                        res.status(201).json({
                            message: 'Admin Account Created Successfully',
                            _id: newUser.id,
                            firstName: newUser.firstName,
                            lastName: newUser.lastName,
                            email: newUser.email,
                            isAdmin: newUser.isAdmin,
                            token: util.getToken(newUser)
                        })
                    })
                    .catch(er => {
                        res.status(500).json({
                            message: er
                        })
                        console.log("error: "+er)
                    });


                }
                
            });

        }

        
    });


}

exports.createAddress = (req, res, next) => {

console.log("create adresss \n\n")

console.log("create adresss "+JSON.stringify(req.body))
console.log("create adresss \n\n")

    UserAddress.findOne({"user": req.body.userId})
    .exec()
    .then(user => {

        if(user){

            UserAddress.findOneAndUpdate({"user": req.body.userId}, {
                $push: {
                    "address": req.body.address
                }
            }, {
                new: true
            })
            .then(doc => {
                res.status(201).json({
                    message: doc
                });
            });

        }else{

            const userAddress = new UserAddress({
                _id: new mongoose.Types.ObjectId(),
                user: req.body.userId,
                address: req.body.address
            });

            userAddress.save()
            .then(doc => {
                res.status(201).json({
                    message: doc
                });
            })
            .catch(error => {
                res.status(500).json({
                    error: error
                })
                console.log("500 error adresss "+JSON.stringify(error))

            })

        }

    });

}

exports.getAddress = (req, res, next) => {

    UserAddress.findOne({"user": req.params.userId})
    .select('_id user address')
    .exec()
    .then(user => {
        res.status(200).json({
            message: user
        })
        console.log("ù$$$$$$$$$$$ adress "+JSON.stringify(user))

    })
    .catch(error => {
        res.status(500).json({
            error: error
        })
    })

}

exports.login = (req, res, next) => {
    console.dir(req.body)
    console.log(" is email in body? " +req.body.email)
    console.log("don thningk "+ req.body)
    User.findOne({email: req.body.email})
    .select('_id isAdmin firstName lastName email password')
    .exec()
    .then(user => {
        if(user){

            bcrypt.compare(req.body.password, user.password, (err, result) => {
                if(err){
                    console.log('Login Failed')
                    return res.status(500).json({
                        message: 'Login Failed'
                    })
                }else{
                    if(result){
                            res.status(200).json({
                                message: 'User connected Successfully',
                                userId: user._id,
                                firstName: user.firstName,
                                lastName: user.lastName,
                                email: user.email,
                                isAdmin: user.isAdmin ,
                                token: util.getToken(user)
                            })
                     }else{
                        res.status(500).json({
                            message: 'Incorrect Password'
                        });
                        console.log( 'Incorrect Password')
                    }
                }
            });

        }else{
            res.status(500).json({
                message: 'Email doesn\'t not exists'
            });
            console.log('Email doesn\'t not exists')
        }
    })
    .catch(error => {
        res.status(500).json({
            error: error
        })
        console.log('request failed 500')
    })


}

exports.signup = (req, res, next) => {
    console.log("body  : "+JSON.stringify(req.body))

    User.findOne({email: req.body.email})
    .exec()
    .then(user => {

        if(user){
            console.log('Email Already Exists')
            return res.status(500).json({
                Errormessage: 'Email Already Exists'
            })
           
        }else{

            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if(err){
                    return res.status(500).json({
                        message: 'Something went wrong'
                    });
                }else{
                    const user = new User({
                        _id: new mongoose.Types.ObjectId(),
                        firstName: req.body.firstName,
                        lastName: req.body.lastName,
                        email: req.body.email,
                        password: hash,
                        createdAt: new Date().toISOString()
                    });

                    user.save()
                    .then(newUser  => {
                        res.status(201).json({
                            message: 'Account Created Successfully',
                            _id: newUser.id,
                            firstName: newUser.firstName,
                            lastName: newUser.lastName,
                            email: newUser.email,
                            isAdmin: newUser.isAdmin,
                            token: util.getToken(newUser)
                        })
                    })
                    .catch(er => {
                        res.status(500).json({
                            message: er
                        })
                        console.log("error: "+er)
                    });


                }
                
            });

        }

        
    });


}






/**exports.loginOld = (req, res, next) => {
    console.dir(req.body);
    console.log(" is email in body? " +req.body.email)
    console.log("don thningk "+ req.body)
    User.findOne({email: req.body.email})
    .select('_id firstName lastName email password')
    .exec()
    .then(user => {
        if(user){

            bcrypt.compare(req.body.password, user.password, (err, result) => {
                if(err){
                    console.log('Login Failed')
                    return res.status(500).json({
                        message: 'Login Failed'
                    })
                }else{
                    if(result){
                        const payload = {
                            userId: user._id,
                            iat:  Math.floor(Date.now() / 1000) - 30,
                            exp: Math.floor(Date.now() / 1000) + (60 * 60 * 60 * 24),
                        }
                        jwt.sign(payload, 'mysecretkey', (err, token) => {
                            if(err){
                                
                                console.log( 'Authentication Failed')
                                return res.status(500).JSON({
                                    message: 'Authentication Failed'
                                })
                            }else{
                                res.status(200).json({
                                    message: {
                                        user: {
                                            userId: user._id,
                                            firstName: user.firstName,
                                            lastName: user.lastName,
                                            email: user.email
                                        },
                                        token: token
                                    }
                                })
                            }
                        })
                    }else{
                        res.status(500).json({
                            message: 'Incorrect Password'
                        });
                        console.log( 'Incorrect Password')
                    }
                }
            });

        }else{
            res.status(500).json({
                message: 'Email doesn\'t not exists'
            });
            console.log('Email doesn\'t not exists')
        }
    })
    .catch(error => {
        res.status(500).json({
            error: error
        })
        console.log('request failed 500')
    })


} */
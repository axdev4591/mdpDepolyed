const mongoose = require('mongoose');
const Order = require('../models/order');
const CartItem = require('../models/cartItem');
const UserAddress = require('../models/userAddress');
const User =  require('../models/user')


exports.createOrder = (req, res, next) => {
    const order = new Order({
        _id: new mongoose.Types.ObjectId(),
        user: req.body.user,
        order: req.body.order,
        address: req.body.address,
        paymentType: req.body.paymentType,
        paymentStatus: req.body.paymentStatus
    });

    order.save()
    .then(order => {

        CartItem.remove({"user": req.body.user})
        .exec()
        .then(doc => {
            res.status(201).json({
                message: order
            });
        })
        .catch(error => {
            res.status(500).json({
                error: error
            });
        })


        
    })
    .catch(error => {
        res.status(500).json({
            error: error
        });
    })
}

exports.getUserOrders = (req, res, next) => {


    console.log("get orders "+JSON.stringify(req.params.userId))
    const userId = req.params.userId;
    Order.find({"user": userId})
    .select('address order orderDate paymentType paymentStatus isOrderCompleted')
    .populate('order.product', 'name imageUrl')
    .exec()
    .then(orders => {

        console.log("get user order"+userId + "  "+orders)
        UserAddress.findOne({"user": userId})
        .exec()
        .then(userAddress => {

            const orderWithAddress = orders.map(order => {
                const address = userAddress.address.find(userAdd => order.address.equals(userAdd._id));
                return {
                    _id: order._id,
                    order: order.order,
                    address: address,
                    orderDate: order.orderDate,
                    paymentType: order.paymentType,
                    paymentStatus: order.paymentStatus,
                    isOrderComleted: order.isOrderComleted
                }
            });

            res.status(200).json({
                message: orderWithAddress
            });
            console.log("order with adress: "+ orderWithAddress)

        })
        .catch(error => {
            return res.status(500).json({
                error: error
            })
        })

        
    })
    .catch(error => {
        res.status(500).json({
            error: error
        });
    });

}

exports.getAllUser = (req, res, next) => {

    console.log("&&&&&&&&&order for users &&&&&&&&&&&&&&\n\n")

    User.find()
    .then(user => {
        res.status(200).json({
            message: user
        })
        //console.log(user)
    })
    .catch(error => {
        console.log("no user found")
        res.status(500).json({
            error: error
        })
      
    })

}
exports.getUsersMiddleware = (req, res, next) => {

    console.log("&&&&&&&&&order for users &&&&&&&&&&&&&&\n\n")

    User.find()
    .then(user => {
        //res.locals.usersID = user
        
        console.log(user)
        res.status(200).json({
            message: user
        })

        //next()
    })
    .catch(error => {
        console.log("no user found")
        res.status(500).json({
            error: error + "erroror"
        })
      
    })

}

exports.getAllOrders = (req, res, next) => {
    console.log("&&&&&&&&&order for admin &&&&&&&&&&&&&&\n\n")

    const usersID = res.locals.usersID
    console.log("get users IDs "+JSON.stringify("users ids in admin "+usersID))


    User.find()
    .then(user => {
        console.log(JSON.stringify(user))
        user.map((us) => {
            Order.find({"user": us._id})
            .select('address order orderDate paymentType paymentStatus isOrderCompleted')
            .populate('order.product', 'name imageUrl')
            .exec()
            .then(orders => {
        
                console.log("get user order"+us._id + "  "+orders)
                UserAddress.findOne({"user": us._id})
                .exec()
                .then(userAddress => {
        
                    const orderWithAddress = orders.map(order => {
                        const address = userAddress.address.find(userAdd => order.address.equals(userAdd._id));
                        return {
                            _id: order._id,
                            order: order.order,
                            address: address,
                            orderDate: order.orderDate,
                            paymentType: order.paymentType,
                            paymentStatus: order.paymentStatus,
                            isOrderComleted: order.isOrderComleted
                        }
                    });
        
                    res.status(200).json({
                        message: orderWithAddress
                    });
                    console.log("order with adress: "+ orderWithAddress)
        
                })
                .catch(error => {
                    console.log("order error 500 1er:\n\n")

                    return res.status(500).json({
                        error: error
                    })
                })
        
                
            })
            .catch(error => {
                console.log("order error 500 2er:\n\n")
                res.status(500).json({
                    error: error
                });
            });
        
            })
        })
    .catch(error => {
        console.log("order error 500 3er:\n\n")

                console.log("no user found")
                res.status(500).json({
                    error: error
                })
                
            })
        
     
   
  

}

exports.deleteOrder = (req, res, next) => {

}

exports.updateOrder = (req, res, next) => {

}
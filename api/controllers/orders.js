const mongoose = require('mongoose');
const Order = require('../models/order');
const CartItem = require('../models/cartItem');
const UserAddress = require('../models/userAddress');
const User =  require('../models/user')


exports.createOrder = async  (req, res, next) => {
    const order = new Order({
        _id: new mongoose.Types.ObjectId(),
        user: req.body.user,
        order: req.body.order,
        address: req.body.address,
        paymentType: req.body.paymentType,
        paymentStatus: req.body.paymentStatus
    });
 
    const userId = req.body.id;
    const user = await User.findById(userId);
   

    order.save()
    .then(order => {

        CartItem.remove({"user": req.body.user})
        .exec()
        .then(doc => {
            if (user) {
                user.hasAnOrder = true;
                user.save();
                
                } 
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

        console.log("get user order "+userId + "  "+orders)
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
                    isOrderCompleted: order.isOrderCompleted
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

exports.updateOrder = async (req, res, next) => {

    const orderId = req.params.id;
    const order = await Order.findById(orderId);
    if (order) {
        order.user = req.body.user || order.user;
        order.order = req.body.order || order.order;
        order.address = req.body.address || order.address;
        order.paymentType = req.body.paymentType || order.paymentType;
        order.paymentStatus = req.body.paymentStatus || order.paymentStatus;
        order.deliveryStatus = req.body.deliveryStatus || order.deliveryStatus;
        order.deliveryDate = req.body.deliveryDate || order.deliveryDate;

      const updatedOrder = await order.save();
      res.status(201).json({
        message: updatedOrder
    })
    } else {
      res.status(404).send({ message: 'User Not Found' });
    }
  

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
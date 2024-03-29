const mongoose = require('mongoose')
const CartItem = require('../models/cartItem')

exports.addToCart = (req, res, next) => {

    CartItem.findOne({user: req.body.user})
    .exec()
    .then(cartItem => {

        if(cartItem){

            const item = cartItem.cart.find(item => item.product == req.body.product);
            let where, action, set;
            if(item){
                action = "$set";
                where = { "user": req.body.user, "cart.product": req.body.product};
                set = "cart.$";
            }else{
                action = "$push";
                where = { "user": req.body.user };
                set = "cart"
            }

            CartItem.findOneAndUpdate(where, {
                [action] : {
                    [set] : {
                        _id: item ? item._id : new mongoose.Types.ObjectId(),
                        product: req.body.product,
                        quantity: item ? (item.quantity + req.body.quantity) : req.body.quantity,
                        price: req.body.price,
                        total: item ? req.body.price * (req.body.quantity + item.quantity) : (req.body.price * req.body.quantity)
                    }
                }
            })
            .exec()
            .then(newItem => {
                res.status(201).json({
                    message: newItem
                })
            })
            .catch(error => {
                res.status(500).json({
                    message: error
                });
            });

            

        }else{
            console.log("get ############ "+JSON.stringify(req.body.user))
            const newCartItem = new CartItem({
                _id: new mongoose.Types.ObjectId(),
                user: req.body.user,
                cart: [
                    {
                        _id: new mongoose.Types.ObjectId(),
                        product: req.body.product,
                        quantity: req.body.quantity,
                        price: req.body.price,
                        total: req.body.quantity * req.body.price
                    }
                ]
            });

            newCartItem
            .save()
            .then(newCart => {
                res.status(201).json({
                    message: newCart
                });
            })
            .catch(error => {
                res.status(500).json({
                    error : error
                });
            });

        }

    })
    .catch(error => {
        res.status(500).json({
            error : error
        });
    });    

}

exports.getUserCartItems =  (req, res, next) => {

    const userId = req.params.userId

    CartItem.find({user: userId})
    .select('_id user cart')
    .populate('cart.product', 'name imageUrl')
    .exec()
    .then(cartItems => {
        res.status(200).json({
            message: cartItems 
        })
        
    }).catch(err => {
        console.log("ann error occured: "+err)
    })
}

exports.QtyUpdate = (req, res, next) => {

    const userId = req.body.userId;
    const productId = req.body.productId;
    const quantity = req.body.quantity;
    const total = req.body.total;

    console.log("update cart "+req.body.userId)

    CartItem.updateOne({"user": userId, "cart.product": productId}, {
        $set : {
            "cart.$.quantity": quantity,
            "cart.$.total": total
        }
    })
    .exec()
    .then(cartItem => {
        res.status(201).json({
            message: cartItem
        });
        console.log("update cart get response $$$$$$$$"+ JSON.stringify(cartItem))

    })
    .catch(error => {
        res.status(500).json({
            error: error
        });
        console.log(" error update cart "+ error)

    });

}

exports.DeleteCartItem = (req, res, next) => {

    const userId = req.body.userId;
    const productId = req.body.productId;

    CartItem.findOneAndUpdate({"user": userId, "cart.product": productId}, 
    { $pull: { "cart" : { product: productId } } },         { new: true }
    )
    .exec()
    .then(cartItem => {
        res.status(201).json({
            message: cartItem
        });
        console.log("update cart remove item "+ JSON.stringify(cartItem))

    })
    .catch(error => {
        res.status(500).json({
            error: error
        });
        console.log(" error update relmove item cart "+ error)

    });

}

/***CartItem.find(
        {"cart.product": productId}, 
        {cart: {$elemMatch: {product: productId}}}) */
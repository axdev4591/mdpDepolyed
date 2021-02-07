import React, { useEffect, useState } from 'react';
import QuantityControl from '../../../components/QuantityControl';
import { useDispatch, useSelector } from 'react-redux';

import './style.css';
import {
    clearCart } from '../../../store/actions/cartActions'
import {MdpButton} from '../../../components/UI/MdpStyledComponents'
import { addToCart, updateCart, getCartItems} from '../../../store/actions/cartActions'



const CartItem = (props) => {

    const dispatch = useDispatch();
    const userSignin = useSelector(state => state.userSignin);
    const { loading, userInfo, error } = userSignin;

    const cart = useSelector(state => state.cart);
   const { cartItem, totalAmount, cartCount} = cart


    useEffect(() => {

        if(userInfo){
            dispatch(getCartItems(userInfo))
        }
      }, [props])

    const removeFromCartHandler = () => {
        const product = {
                    productId: props.productId,
                    quantity: props.quantity,
                    total: props.total

                    }
        dispatch(clearCart(userInfo, product));
        dispatch(getCartItems(userInfo))

      }


    return (
        <div className="SingleItem">
            <div className="ItemWrapper">
                <div className="ItemImage" style={{width: '80px', height: '80px', overflow: 'hidden', position: 'relative'}}>
                    <img style={{maxWidth: '100%', maxHeight: '100%', position: 'absolute', left: '50%', transform: 'translateX(-50%)'}} src={props.imageUrl} alt="" />
                </div>
                <div className="ItemDetails">
                    <p className="ItemName">{props.name}</p>
                    <p className="ItemPrice">{props.total}€</p>
                </div>
            </div>
            <div className="CartActionButtons">
                <QuantityControl
                    productId={props.productId}
                    name={props.name} 
                    quantity={props.quantity}
                    changeQuantity={props.changeQuantity}
                    increaseQuantity={props.increaseQuantity}
                    decreaseQuantity={props.decreaseQuantity}
                />
                <MdpButton style={{marginTop: "15px"}} outline mdpXL  onClick={() => removeFromCartHandler()} >
                 Supprimer
                 </MdpButton>
            </div>
        </div>
    )
}

export default CartItem;
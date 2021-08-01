import React, { useState , useEffect} from 'react';
import Header from '../../components/Header/Header';
import './style.css';
import { addToCart, updateCart, getCartItems } from '../../store/actions/cartActions'
import { useSelector, useDispatch } from 'react-redux';



const ThankYou  = (props) => {

        const queryParams = props.location.search.split("?")[1];
        const orderId = queryParams.split("=")[1];

        const cart = useSelector(state => state.cart);
        const { cartItem, totalAmount, cartCount} = cart

        const userSignin = useSelector(state => state.userSignin);
        const { loading, userInfo, error } = userSignin;
        const dispatch = useDispatch()

        useEffect(() => {

            if(userInfo){
            dispatch(getCartItems())
            }
        }, [])

        return (
            <div>
                <div className="Content">
                    <div className="ThankyouPage">
                       <h1>Merci pour votre commande</h1>
                       <p className="OrderId">L'identifiant de votre commande est: {orderId.toLocaleUpperCase()}</p>
                       <p className="SmallText"> Vous recevrez bientôt un mail de confirmation </p>
                    </div>
                </div>
            </div>
        );
    

}

export default ThankYou;
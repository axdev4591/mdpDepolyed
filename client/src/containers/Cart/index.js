import React, { useEffect, useState } from 'react';
import Header from '../../components/Header/Header';
import './style.css';
import CartItem from './CartItem'
import CartPrice from '../../components/CartPrice';


import { addToCart, updateCart, getCartItems} from '../../store/actions/cartActions'
import { useDispatch, useSelector } from 'react-redux'
import { Route , withRouter} from 'react-router-dom'
import {MdpButton} from '../../components/UI/MdpStyledComponents'



const Cart = (props) => {

  const cart = useSelector(state => state.cart);
  const { cartItem, totalAmount, cartCount} = cart

  const userSignin = useSelector(state => state.userSignin);
  const { loading, userInfo, error } = userSignin;

  const [qty, setQty] = useState(0)

  const dispatch = useDispatch();

 
 
  useEffect(() => {
    /*if (userInfo) {
      dispatch(addToCart(userInfo, cartItems));
    }*/
    if(userInfo){
        dispatch(getCartItems(userInfo))
    }
  }, [qty])


  const decreaseQuantity = (e, productId) => {
        updateThisCart(productId, -1)
        setQty(-1)
    }

  const increaseQuantity = (e, productId) => {
        updateThisCart(productId, 1);
        setQty(1)
    }

  const  updateThisCart =  (productId, quantity) => {

        try{
            
            let product = cartItem.find(item => item.product === productId);
            const myproduct = {
                productId: product.product,
                quantity: parseInt(product.quantity) + parseInt(quantity),
                newQuantity: quantity,
                price: product.price,
                total: parseFloat(product.total) + parseFloat( product.price * quantity )
            }

            if(product.quantity <= 0){
                return;
            }
            dispatch(updateCart(userInfo.token, userInfo.userId, myproduct))

        }catch(error){
            console.log(error);
        }
        
    }

  const changeQuantity = (e, productId) => {

         console.log(e.target.value);

         if(isNaN(e.target.value)){
         return;
         }

        const firstDigit = parseInt(e.target.value.split("")[0]);
        if(firstDigit === 0){
            return;
        }

        // //alert(e.target.value);

        updateThisCart(productId, parseInt(e.target.value));
    }

    return (
        <React.Fragment>
            <div className="Content">
                <div className="CartWrapper">
                    <div className="CartDetails">
                        {/* List cart items */}
                        <div className="CardTitle">
                            <h3>Mon panier</h3>
                        </div>
                        <div className="CardBody">

                            {cartItem.length === 0 ?
                                <div>
                                Vous n'avez aucun article dans votre panier
                                </div>
                                     :
                                     cartItem.map(product => 
                                    <CartItem
                                        key={product.product}
                                        productId={product.product}
                                        name={product.name}
                                        imageUrl={product.imageUrl}
                                        price={product.price}
                                        quantity={product.quantity}
                                        total={product.total}
                                        //name="quantity" 
                                        changeQuantity={changeQuantity}
                                        increaseQuantity={increaseQuantity}
                                        decreaseQuantity={decreaseQuantity}
                                />)
                            }

                            <div className="PlaceOrder">
                                <MdpButton outline mdpXLContact onClick={() => props.history.push('/')}>Poursuivre mes achats</MdpButton>
                            </div>

                        </div>
                    </div>
                    
                    <CartPrice red={props}/>

                </div>
            </div>
        </React.Fragment>
    );

}


export default Cart
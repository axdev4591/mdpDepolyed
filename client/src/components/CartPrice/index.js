import React, { useEffect, useState } from 'react';
import './style.css';
import  { Redirect } from 'react-router-dom'
import { addToCart, updateCart, getCartItems} from '../../store/actions/cartActions'
import { useDispatch, useSelector } from 'react-redux'
import {MdpButton} from '../../components/UI/MdpStyledComponents'




const CartPrice = (props) => {


  const cart = useSelector(state => state.cart);
  const { cartItem, totalAmount, cartCount} = cart

  const userSignin = useSelector(state => state.userSignin);
  const { loading, userInfo, error } = userSignin;

  const [qty, setQty] = useState(0)

  const dispatch = useDispatch();


  useEffect(() => {
      dispatch(getCartItems())

  }, [])


    return (
        <div className="PriceWrapper">
            {/* show price */}
            <div className="CardTitle">
                <h3>Détails de la commande</h3>
            </div>
            <div className="CardBody">
                <div className="FinalBilling">
                    <div className="Row">
                        <p>Prix ({cartCount})</p>
                        <p>{totalAmount}€</p>
                    </div>
                    <div className="Row">
                        <p>Livraison</p>
                        <p>0€</p>
                    </div>
                    <hr />
                    <div className="Row">
                        <h4>Total à Payer</h4>
                        <h4>{totalAmount}€</h4>
                    </div>
                    <div className="Row" style={{marginLeft: "48px", marginTop: "63px"}}>
                        <MdpButton outline mdpXLContact onClick={() => props.red.history.push('/place-order')}>Passer la commande</MdpButton>
                    </div>
                </div>
                
            </div>
        </div>
    );


}


export default CartPrice
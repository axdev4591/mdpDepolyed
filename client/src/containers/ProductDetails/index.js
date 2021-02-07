
import Header from '../../components/Header/Header';
import './style.css';
import React, {useEffect,  useState } from 'react';
import { useSelector, useDispatch} from 'react-redux'
import {useParams, Link } from 'react-router-dom'

import { detailsProduct } from '../../store/actions/productActions'
import {usePath} from 'hookrouter';
//import Rating from '../components/Rating';
//import { PRODUCT_REVIEW_SAVE_RESET } from '../constants/productConstants';
import { addToCart, updateCart, getCartItems } from '../../store/actions/cartActions'

import {MdpButton} from '../../components/UI/MdpStyledComponents'

const ProductDetails = (props) => {
  const userSignin = useSelector((state) => state.userSignin)
  const { userInfo } = userSignin
  const productDetails = useSelector((state) => state.productDetails)
  const { product, loading, error } = productDetails
  const dispatch = useDispatch()
  const { category, slug } = useParams()
  const cart = useSelector(state => state.cart);
  const { cartItems, totalAmount, cartCount} = cart


  useEffect(() => {
    
    dispatch(detailsProduct(category, slug))

    if(userInfo){
        dispatch(getCartItems(userInfo))
    }


    return () => {
      //
    };
  }, [slug, category]);


  const addItemToCart = (product) => {

    if(!userInfo){
        props.history.push('/login');
        return;
    }else {
        if(!userInfo.isAdmin){
            const cartItem = {
                user: userInfo.userId,
                product: product._id,
                name: product.name,
                imageUrl: product.imageUrl,
                quantity: 1,
                price: product.price
            }
        
           dispatch(addToCart(userInfo, cartItem))
        }
    } 
   
}


    let productDescription

    if(product){
        productDescription = 
            <div style={{marginBottom: "12px"}} className="Content">
                <div style={{marginTop: "12px"}} className="ProductDetailsWrapper">
                    <div className="ProductDetailsImage">
                        <div className="ProductDetailsImageWrapper">
                            <img  src={product.imageUrl} alt="" />
                        </div>
                        <div className="mdpBtn">
                             <MdpButton outline mdpXLContact  onClick={() => {
                                 addItemToCart(product)
                                props.history.push('/cart')
                             } }>
                                <i className="fas fa-shopping-cart" style={{marginRight: "3px"}}></i>
                                &nbsp;
                                Ajouter au panier
                             </MdpButton>        
                        </div>
                        
                    </div>
                    <div className="ProductDetails">
                        <p className="ProductTitle">{product.name}</p>
                        <p className="ProductPrice">{product.price}€</p>
                        <div className="BreadCrumb">
                            <small>Auteur: Nene DOGBA | Date de parition: 12 mars 2020</small>
                            <small>{ product.stock > 0 ? "  "+ product.stock  + " exemplaire en stock" : "Rupture de stock"  } | Expédition sous 24 heures</small>
                            
                        </div>
                        <div className="ProductDescription">
                            <h3 style={{marginTop: "17px"}}>Description</h3>
                            <div className="BreadCrumb">
                            <small>{product.description}</small>
                            </div>

                            <h4 style={{marginTop: "18px"}}>A propos de l'auteur</h4>
                            <div className="BreadCrumb">
                            <small>      
                            <p>laceholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available</p>
                            </small>
                            </div>
                         
                        </div>
                        <div className="mdpBtn" style={{marginTop: "51px"}}>
                        <MdpButton outline mdpXLContact onClick={() => { if(userInfo){
                                  }
                                  }} style={{marginRight: "6px"}}><i className="fas fa-heart" style={{marginRight: "3px", color:"red"}}></i>&nbsp;Acheter maintenant</MdpButton>
                        </div>
                    </div>
                </div>

            </div>
    }else{
        productDescription = <div>Product is loading...!</div>
    }
    
    

    return (
        <div>
            {productDescription}
        </div>
    );
    

}



export default ProductDetails
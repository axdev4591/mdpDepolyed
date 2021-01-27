import Axios from "axios";
import Cookie from "js-cookie";
import { ADD_TO_CART, GET_CART_DETAILS, UPDATE_CART, CLEAR_CART, CART_ADD_ITEM } 
from "../../constants/cartConstants"
import { base_url } from '../../constants/index'


export const addToCart = (userInfo, cartItems) => async (dispatch, getState) => {
    try {
        const { data } = await Axios.post(`${base_url}/cart/add`, cartItems, {
        headers: {
          Authorization: ' Bearer ' + userInfo.token
        }
      })
      dispatch({
        type: ADD_TO_CART,
        cartItem: cartItems
       })
     
      const { cart: { cartItem } } = getState();
      Cookie.set("cartItem", JSON.stringify(cartItem));
  
    } catch (error) {
        console.log(error);
    }
  }

export const getCartItems = (userInfo) => async (dispatch, getState) => {

        try{

            const data = await Axios.post(`${base_url}/cart/user/${userInfo.userId}`, userInfo, {
                headers: {
                  Authorization: ' Bearer ' + userInfo.token
                }
              })

              console.log("get cart items from cartActions "+JSON.stringify(data.data.message[0]))
           
            dispatch({
                type: GET_CART_DETAILS,
                cartItems: data.data.message[0]
            })
            const { cart: { cartItem } } = getState()
            Cookie.set("cartItem", JSON.stringify(data.data.message[0]))
      
        }catch(error){
            console.log(error);
        }
        
    }


export const updateCart = (token, userId, product) => async (dispatch, getState) => {

   const product1 = {
        userId: userId,
        productId: product.productId,
        quantity: product.quantity,
        total: product.total
    }

    try {
        const { data } = await Axios.put(`${base_url}/cart/update/quantity`, product1, {
        headers: {
          Authorization: ' Bearer ' + token
        }
      })
      
        dispatch({
            type: UPDATE_CART,
            item: product
        });
     
      const { cart: { cartItem } } = getState();
      Cookie.set("cartItem", JSON.stringify(cartItem));
  
    } catch (error) {
        console.log(error);
    }
   
}
export const clearCart = (userInfo, product) => async (dispatch, getState) => {

    const product1 = {
         userId: userInfo.userId,
         productId: product.productId
     }

     console.log(userInfo.token)
 
     try {
         const { data } = await Axios.put(`${base_url}/cart/delete/${userInfo.userId}`, product1, {
         headers: {
           Authorization: ' Bearer ' + userInfo.token
         }
       })

   
     } catch (error) {
         console.log(error);
     }
    
    }
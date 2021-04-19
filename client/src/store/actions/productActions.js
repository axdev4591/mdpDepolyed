
import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,
    CATEGORY_LIST_REQUEST,
    CATEGORY_LIST_SUCCESS,
    CATEGORY_LIST_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_SAVE_REQUEST,
    PRODUCT_SAVE_SUCCESS,
    PRODUCT_SAVE_FAIL,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_DELETE_FAIL,
    PRODUCT_DELETE_REQUEST,
    PRODUCT_REVIEW_SAVE_REQUEST,
    PRODUCT_REVIEW_SAVE_FAIL,
    PRODUCT_REVIEW_SAVE_SUCCESS,
  } from '../../constants/productConstants'
  
  import axios from 'axios'
  import Axios from 'axios'
  import { base_url } from '../../constants/index'


  //retrieve product for admin dashboard
  const listProducts = (categorySlug = '', filter) => async (dispatch) => {
     
        if(categorySlug == ''){
          try{
            dispatch({ type: PRODUCT_LIST_REQUEST });
            const { data } = await axios.get(`${base_url}/products/${filter}`)
            console.log(`${base_url}/products/${filter}`)
      
            dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data.message })
            console.log("\n\n")
            console.log("get products from ProductActions: " + JSON.stringify(data.message))
            console.log("\n\n")


          }
          catch (error) {
            dispatch({ type: PRODUCT_LIST_FAIL, payload: error.message })
            console.log("problème de récupération des catégories "+error)
          }
        }
        else{
          try{


          dispatch({ type: PRODUCT_LIST_REQUEST });
          const { data } = await axios.get(`${base_url}/products/${categorySlug}/${filter}`)
          console.log(`${base_url}/products/${categorySlug}/${filter}`)
      
          dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data.message })
          console.log("\n\n")
          console.log("get products from ProductActions: " + JSON.stringify(data.message))
          console.log("\n\n")
          }catch (error) {
            dispatch({ type: PRODUCT_LIST_FAIL, payload: error.message })
            console.log("problème de récupération des catégories "+error)
          }
        }


  
  }
  
  //retrieve category
  const listCategories = () => async (dispatch) => {  
    try {
      dispatch({ type: CATEGORY_LIST_REQUEST })
      const { data } = await axios.get(`${base_url}/category`)
      console.log("\n\n")
      console.log("get categories from ProductActions: " + JSON.stringify(data.message))
      console.log("\n\n")

      dispatch({ type: CATEGORY_LIST_SUCCESS, payload: data.message })
    } catch (error) {
      dispatch({ type: CATEGORY_LIST_FAIL, payload: error.message })
      console.log("problème de récupération des catégories "+error.message)
    }
  }

  //Create product or update product
  const saveProduct = (product) => async (dispatch, getState) => {
    
    try {
        const {
            userSignin: { userInfo },
          } = getState();
        
        if(userInfo.isAdmin){
        dispatch({ type: PRODUCT_SAVE_REQUEST, payload: product })
        
        console.log("ia sadmin &&&&&&& "+JSON.stringify(userInfo))

        const products = new FormData()
        products.append("id", product._id)
        products.append("name", product.name)
        products.append("price", product.price)
        products.append("description", product.description)
        products.append("imageUrl", product.imageUrl)
        products.append("stock", product.stock)
        products.append("category", product.myCategory)

        console.log("bbbbbbbb "+product.myCategory)

        if (product.create) {
            const { data } = await Axios.post(`${base_url}/products/create`, products, {
            headers: {
              Authorization: 'Bearer ' + userInfo.token
            },
            })

            dispatch({ type: PRODUCT_SAVE_SUCCESS, payload: data.message });

        } else {
          console.log("token: "+userInfo.token)
            const { data } = await Axios.put(`${base_url}/products/update/${product._id}`,  products, {
                headers: {
                  Authorization: 'Bearer ' + userInfo.token
                },
            }
            )

            dispatch({ type: PRODUCT_SAVE_SUCCESS, payload: data.message })

        }
        }
    } catch (error) {
        dispatch({ type: PRODUCT_SAVE_FAIL, payload: error.message })
        console.log("not admin "+error)
        }
  };



  //get prodcut detail
  const detailsProduct = (categorySlug, productSlug) => async (dispatch) => {
    try {
      
      dispatch({ type: PRODUCT_DETAILS_REQUEST, payload: productSlug })
      const { data } = await axios.get(`${base_url}/products/detail/${categorySlug}/${productSlug}`);
      dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data.message })
      console.log("detail prod*********"+JSON.stringify(data.message))
      
    } catch (error) {
      dispatch({ type: PRODUCT_DETAILS_FAIL, payload: error.message });
    }
  }
 
  const deleteProduct = (product) => async (dispatch, getState) => {
    try {
      console.log('start deleteig **********')
      const {
        userSignin: { userInfo },
      } = getState();
    
    if(userInfo.isAdmin){
      dispatch({ type: PRODUCT_DELETE_REQUEST, payload: product._id })
      const { data } = await axios.delete(`${base_url}/products/delete/${product._id}`, {
        headers: {
          Authorization: 'Bearer ' + userInfo.token
        },
      })
      console.log('success deleted')
      dispatch({ type: PRODUCT_DELETE_SUCCESS, payload: data, success: true })
    }} catch (error) {
      dispatch({ type: PRODUCT_DELETE_FAIL, payload: error.message })
    }
  }
  
  const saveProductReview = (productId, review) => async (dispatch, getState) => {
    try {
      const {
        userSignin: {
          userInfo: { token },
        },
      } = getState();
      dispatch({ type: PRODUCT_REVIEW_SAVE_REQUEST, payload: review });
      const { data } = await axios.post(
        `/api/products/${productId}/reviews`,
        review,
        {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        }
      );
      dispatch({ type: PRODUCT_REVIEW_SAVE_SUCCESS, payload: data });
    } catch (error) {
      // report error
      dispatch({ type: PRODUCT_REVIEW_SAVE_FAIL, payload: error.message });
    }
  }


  export {
    listProducts,
    detailsProduct,
    saveProduct,
    deleteProduct,
    saveProductReview,
    listCategories
      }
  

import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './style.css';
import Login from './Login';
import Signup from './Signup';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import Cookie from 'js-cookie';
import ShopeStore from '../components/ShopStore/ShopStore'

//Product reducer for admin
import {
  productListReducer,
  productDetailsReducer,
  productSaveReducer,
  productDeleteReducer,
  productReviewSaveReducer,
  categoryListReducer,
  productListFilteredReducer
} from '../store/reducers/productReducers';

//User reducer 
import { userSigninReducer, userRegisterReducer, userUpdateReducer} from '../store/reducers/userReducers'

//Cart reducers
import cartReducers from '../store/reducers/cartReducers';
import { composeWithDevTools } from 'redux-devtools-extension'

const cartItems = Cookie.getJSON('cartItem') || [];
const userInfo = Cookie.getJSON('userInfo') || null;



const initialState = {
  userSignin: { userInfo }
}

const reducer = combineReducers({
  userSignin: userSigninReducer,
  userRegister: userRegisterReducer,
  userUpdate: userUpdateReducer,
  productList: productListReducer,
  productDetails: productDetailsReducer,
  productSave: productSaveReducer,
  productDelete: productDeleteReducer,
  categoryList: categoryListReducer,
  productReviewSave: productReviewSaveReducer,
  productsFiltered: productListFilteredReducer,
  cart: cartReducers
});


const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(thunk))
);


window.store = store;

function App(props) {

  return (

    <Provider store={store}>
      <Router>
        <div className="App">

            <Switch>  
              <Route path="/login" component={Login} />  
              <Route path="/signup" component={Signup} />
              <Route path="/"  component={ShopeStore} />                  
            </Switch>

        </div>
      </Router>
    </Provider>

    
    
  );
}

export default App;

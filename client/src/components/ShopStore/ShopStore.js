import React, { useEffect,  useState  } from 'react';
import './style.css';
import Products from './Products/Products'
import { Route, Switch} from 'react-router-dom';
import PrivateRoute from '../../PrivateRoute';
import Header from '../Header/Header' 
import FooterContainer from '../Footer/FooterContainer' 
import ProductDetails from '../../containers/ProductDetails/index'
import ProductsScreen from '../../containers/Products/ProductsScreen'
import Users from '../../containers/usersList/Users'
import Home from '../../containers/Home'
import Contact from './Contact/Contact'
import About from './About/About'
import Cart from '../../containers/Cart';
import PlaceOrder from '../../containers/PlaceOrder';
import ThankYou from '../../containers/ThankYou';
import Orders from '../../containers/Orders';
import OrderManagement from '../../containers/Orders/OrderManagement';


const ShopStore = () => {

    return (
        <React.Fragment>
            <Header/>
            <Switch>
                <Route path="/" exact component={Products} />
                <Route path="/products" exact component={Products} />
                <Route path="/products/:slug" exact component={Products} />
                <Route path="/manageproducts" exact component={ProductsScreen} />
                <Route path="/manageusers" exact component={Users} />               
                <Route path="/products/:category/:slug" component={ProductDetails} />
                <Route path="/contact" exact component={Contact} />
                <Route path="/About" exact component={About} /> 
                <PrivateRoute path="/cart" component={Cart} />
                <PrivateRoute path="/place-order" component={PlaceOrder} />
                <PrivateRoute path="/thank-you" component={ThankYou} />
                <PrivateRoute path="/orders" component={Orders} />
                <PrivateRoute path="/OrderManagement" component={OrderManagement} />

                          
                  {/**
              <Route path="/forget-password" component={ForgetPassword} />
              <Route path="/cpanel" component={ControlPanel} />*/}

            </Switch>
            <FooterContainer />

        </React.Fragment>
        
    )
    }




export default ShopStore
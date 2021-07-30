import React, { useEffect,  useState  } from 'react';
import './style.css';
import Products from './Products/Products'
import { Route, Switch} from 'react-router-dom';
import Header from '../Header/Header' 
import FooterContainer from '../Footer/FooterContainer' 
import ProductDetails from '../../containers/ProductDetails/index'
import ProductsScreen from '../../containers/Products/ProductsScreen'
import Users from '../../containers/usersList/Users'
import Home from '../../containers/Home'
import Contact from './Contact/Contact'
import About from './About/About'


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

            </Switch>
            <FooterContainer />

        </React.Fragment>
        
    )
    }




export default ShopStore
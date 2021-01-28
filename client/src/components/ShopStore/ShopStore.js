import React, { useEffect,  useState  } from 'react';
import './style.css';
import Products from './Products/Products'
import { Route, Switch} from 'react-router-dom';
import Header from '../Header/Header' 
import FooterContainer from '../Footer/FooterContainer' 
import ProductDetails from '../../containers/ProductDetails/index'
import ProductsScreen from '../../containers/Products/ProductsScreen'
import Home from '../../containers/Home'
import Contact from './Contact/Contact'


const ShopStore = () => {

    const [categoryTitle, setCategoryTitle] =  useState('Products')

    return (
        <React.Fragment>
            <Header/>
            <Switch>
                <Route path="/" exact component={Products} />
                <Route path="/products" exact component={Products} />
                <Route path="/products/:slug" exact component={Products} />
                <Route path="/manageproducts" exact component={ProductsScreen} />             
                <Route path="/products/:category/:slug" component={ProductDetails} />
                <Route path="/contact" exact component={Contact} />
            </Switch>
            <FooterContainer />

        </React.Fragment>
        
    )
    }




export default ShopStore
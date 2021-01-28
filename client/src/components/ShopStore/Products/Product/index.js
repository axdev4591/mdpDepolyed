import React from 'react';
import { Link, withRouter, useHistory } from 'react-router-dom'
import {usePath} from 'hookrouter';
import './styles.css'

const Product = props => {

    const path = usePath()
    //const url = path === '/' ? '/products/all' : path
    const url = '/products/all'
  
    
    return (
        <Link to={`${url}/${props.slug}`}>         
            <div className="Product">
                <div className="ProductImage">
                    <img  src={props.imageUrl} alt="" />
                </div>
                <div className="ProductDetails">
                    <p className="nameP">{props.name}</p>
                    <p className="priceP">{props.price}<span>€</span></p>
                    <button className="btnP">
                       Ajouter
                    </button>
                </div>
            </div>
        </Link>
    );
}

export default Product

import { NavLink, Link } from 'react-router-dom';
import './style.css';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'

import {listCategories, listProducts} from '../../../store/actions/productActions'


const BottomHeader = (props) => {

    const categoryList = useSelector((state) => state.categoryList)
    const {categories} = categoryList

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(listCategories())

    }, [])
   
    


    const categoryTree = (cate) => {

        var categoriesAr = [];

            if(cate){


        cate.map((value) => {
            categoriesAr.push(
                    <li key={value.slug} className="Column">
                        <NavLink to={`/products/${value.slug}`} onClick={() => {
                                             
                                            // setSlug(value.slug)
                                             //setTitle(value.name)
             
                                     } }><span className="cat">{value.name}</span>
                                     </NavLink>
                    </li>
            )
        })
        }

        return categoriesAr;
    }

        const cat = categoryTree(categories);
    
console.log("ajahahahaha: "+ cat)
        return (
            <div className="BottomHeader">
                <ul className="Menu">
                    <li className="MenuItem"><Link to="/"><i className="fas fa-home"></i></Link></li>
                    <li className="MenuItem">
                        <Link to="/products" className="MenuItemElement">Boutique&nbsp;<i className="fas fa-caret-down"></i></Link>
                        
                       {/**<ul className="Dropdown">
                        {cat}
                        
                        </ul> 
                                            <li className="MenuItem"><Link to="/products">Produits</Link></li>
*/} 
                    </li>
                    <li className="MenuItem"><Link to="/about">A propos</Link></li>
                    <li className="MenuItem"><Link to="/contact">Contact</Link></li>
                    
                </ul>
    
            </div>
        );
}



export default BottomHeader;
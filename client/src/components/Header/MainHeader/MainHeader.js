import { Link } from 'react-router-dom'
import './style.css';
import Logo from '../../Logo';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'


const MainHeader = (props) => {
  
    const cart = useSelector(state => state.cart);
    const { cartItem, totalAmount, cartCount} = cart
    const userSignin = useSelector((state) => state.userSignin)
    const { userInfo } = userSignin

    return (
        <div className="MainHeader">
            <Logo />
            <div>
                <div className="SearchOption">
                    <select>
                        <option>Catégories</option>
                        <option></option>

                    </select>
                    <input type="text" />
                    <button>
                        <i className="fas fa-search"></i>
                    </button>
                </div>
            </div>
            <div>
                <Link to="/cart"><i className="fas fa-shopping-cart"></i>(<span style={{color: "green"}}>{ userInfo ? cartCount : 0 }</span>)</Link>
                
            </div>
        </div>
    );
}



export default MainHeader
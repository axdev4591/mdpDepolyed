import './style.css';
import Header from '../../components/Header/Header'
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {base_url} from '../../constants/index'
import Axios from 'axios'




const Orders = (props) => {

  const userSignin = useSelector(state => state.userSignin);
  const { loading, userInfo, error } = userSignin
  const [ordersList, setOrderList] = useState([])


  useEffect(() => {
    
    if(!userInfo){

        props.history.push('/login');
                 
    }else{
        if(userInfo.isAdmin){
            adminGetAllOrders()
         }else{
            getOrders()
      }
    
    }
    return () => {
    };
  }, []);

     const getOrders = async () => {
        console.log(userInfo)
        try{

        const { data } = await Axios.get(`${base_url}/order/getorders/${userInfo.userId}`, {
            headers: {
                  Authorization: ' Bearer ' + userInfo.token
            }
        })
        console.log("responseorder: "+JSON.stringify(data.message));
        setOrderList(data.message)


        /*
        .then(response => response.json())
        .then(jsonResponse => {
            console.log("get orders: "+jsonResponse.message);
            console.log("responseorder: "+JSON.stringify(jsonResponse.message));
            
            setOrderList(data.data.message)
        })*/
    }catch(error){
            console.log(error);
        }
    }

    /****get all orders for administration back office */
    const adminGetAllOrders = async () => {

        try{

            const { data } = await Axios.get(`${base_url}/order/getorders`, {
                headers: {
                      Authorization: ' Bearer ' + userInfo.token
                }
            })
            console.log("response All orders: "+JSON.stringify(data.message));
            setOrderList(data.message)

        }catch(error){
            console.log(error);
        }
        /*

        fetch(`${base_url}/order/getusers`, {
            headers: {
                'Content-Type': 'application/json',
                'auth-token': userInfo.token
            }
        })
        .then(response => response.json())
        .then(jsonResponse => {
           
                jsonResponse.message.map(user => {
                
                fetch(`${base_url}/order/getorders/${user._id}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'auth-token': userInfo.token
                    }
                })
                .then(response => response.json())
                .then(jsonResponse => {
                    console.log("get all orders for admin: "+jsonResponse.message);
                   
                   // setOrderList( prevState => setOrderList( prevState.ordersList.concat(jsonResponse.message) ))
                })
                .catch(error => {
                    console.log(error);
                }) 
            
            })
    
        })
        .catch(error => {
            console.log(error);
        })*/
    }
    

    const formatDate = (date) => {
        let d = new Date(date);
        return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
    }

    const getOrderTotal = (id) => {
        const singleOrder = ordersList.find(order => order._id === id);
        let orderTotal = 0;
        singleOrder.order.forEach(order => {
            orderTotal = orderTotal + (order.price * order.quantity)
        });

        return orderTotal;
    }


    return (
        <React.Fragment>
            <Header />
            <div className="Content">
                <div className="Card">
                    <p className="CardText">Mes Commandes</p>

                    {
                        ordersList.map(order => {
                            return (
                                <div key={order._id} className="Order">
                                    <div className="OrderHeader">
                                        <a href="#">{order._id}</a>
                                    </div>
                                    <div className="OrderDescription">
                                        <div className="od1">
                                            <p className="odtitle">Adresse de livraison</p>
                                            <p>{`${order.address.address} ${order.address.cityDistrictTown} ${order.address.state} - ${order.address.pinCode}`}</p>
                                        </div>
                                        <div className="od2">
                                            <p className="odtitle">Type de paiement</p>
                                            <a className="odp" style={{color: "white"}}>{order.paymentType}</a>
                                        </div>
                                        <div className="od3">
                                            <p className="odtitle" >Statut du paiement</p>
                                            <a className="odp" style={{color: "white"}}>{order.paymentStatus}</a>
                                        </div>
                                        <div className="od3">
                                            <p className="odtitle" >Statut de la livraison</p>
                                            <a className="odp" style={{color: "white"}}>{ order.isOrderCompleted ? "livré le 12/01/2021" : order.paymentStatus }</a>
                                        </div>
                                    
                                    </div>
                                    <div>
                                        {order.order.map(item => (
                                            <div key={item._id} style={{display: 'flex', alignItems: 'center', margin: '5px 0', borderBottom: '1px solid #cecece'}}>
                                                <div style={{width: '80px', height: '80px', overflow: 'hidden', position: 'relative'}} className="ImageContainer">
                                                    <img style={{maxWidth: '100%', maxHeight: '100%', position: 'absolute', left: '50%', transform: 'translateX(-50%)'}} src={item.product.imageUrl}/>
                                                </div>
                                                <div>
                                                    <p className="odtitle">{item.product.name}</p>
                                                    <div style={{fontSize: '14px', color: '#555', fontWeight: 'bold'}}>
                                                    <p>Quantité: {item.quantity}</p>
                                                    <p>{item.price * item.quantity}€</p>
                                                    </div>
                                                    
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="OrderFooter">
                                        <p>Commande passée le <span>{formatDate(order.orderDate)}</span></p>
                                        <p>Total de la commande <span>{getOrderTotal(order._id)}€</span></p>
                                    </div>
                                </div>
                            )
                        })
                    }

                </div>
            </div>
        </React.Fragment>
    );
    
}


export default Orders
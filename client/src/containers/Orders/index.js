import './style.css';
import Header from '../../components/Header/Header'
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {base_url} from '../../constants/index'
import Axios from 'axios'
import {MdpButton} from '../../components/UI/MdpStyledComponents'





const Orders = (props) => {

  const userSignin = useSelector(state => state.userSignin);
  const { loading, userInfo, error } = userSignin
  const [ordersList, setOrderList] = useState([])
  const [userList, setUserList] = useState([])
  const [userIds, setUserIds] = useState([])
  const [isOrderOpened, setIsOrderOpened] = useState(false)
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")


  useEffect(() => {
    
    if(!userInfo){

        props.history.push('/login');
                 
    }else{
        if(userInfo.isAdmin){
            //getUsers()
            adminGetAllUsers()
         }else{
            getOrders()
      }
    
    }
    return () => {
    };
  }, []);

    //get orders fir a specific user
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

    }catch(error){
            console.log(error);
        }
    }

    // get orders for all users
    const getOrdersAdmin = async (uid) => {
        try{

        const { data } = await Axios.get(`${base_url}/order/getorders/${uid}`, {
            headers: {
                  Authorization: ' Bearer ' + userInfo.token
            }
        })
        console.log("responseorderrrrrrr: "+JSON.stringify(data.message));
        setOrderList(data.message)

    }catch(error){
            console.log(error);
        }
    }


    /****get all users for administration back office */
    const adminGetAllUsers = async () => {
       // getUsers()
        console.log("admin get orders")
        try{

            const { data } = await Axios.get(`${base_url}/admin/get-users`, {
                headers: {
                      Authorization: ' Bearer ' + userInfo.token
                }
            })
            console.log("response All users: "+JSON.stringify(data.message));
            setUserList(data.message)

        }catch(error){
            console.log(error + "error front");
        }
        
    }

    const deleteOrder =  async (orderId) => {
        console.log("admin get orders")
      /*  try{

            const { data } = await Axios.get(`${base_url}/admin/deleteOrder/${orderId}`, {
                headers: {
                      Authorization: ' Bearer ' + userInfo.token
                }
            })
            console.log("response All users: "+JSON.stringify(data.message));
            setUserList(data.message)

        }catch(error){
            console.log(error + "error front");
        }*/
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
            <div className="Content">
                <div className="Card">
                   { userInfo.isAdmin ? <p className="CardText">Liste des commandes</p> : <p className="CardText">Mes Commandes</p>} 

                    {
                      !userInfo.isAdmin && ordersList.map(order => {
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
                    {
                      userInfo.isAdmin && !isOrderOpened && userList.map(user => {
                        if(!user.isAdmin && user.hasAnOrder){
                            return (                               

                                <div key={user._id} className="Order">
                                    <div className="OrderHeader">
                                        CID: <a href="#">{user._id}</a>
                                    </div>
                                    <div className="OrderDescription">
                                    <div className="od1">
                                            <p className="odtitle">Prenom</p>
                                            <a className="odp" style={{color: "white"}}>{user.firstName}</a>

                                    </div>
                                    <div className="od1">
                                            <p className="odtitle">Nom</p>
                                            <a className="odp" style={{color: "white"}}>{user.lastName}</a>
                                    </div>
                                    <div className="od1" style={{marginRight: "5px"}}>
                                            <p className="odtitle" >Email</p>
                                            <a className="odp" style={{color: "white"}}>{user.email}</a>
                                    </div>
                                    <div className="od1">
                                            <p className="odtitle" style={{marginRight: "20px"}}>Voir les commandes</p>
                                                <MdpButton style={{float: "right"}} outline mdpXL onClick={() => {
                                                           // setCreate(true)
                                                           getOrdersAdmin(user._id)
                                                           setFirstName(user.firstName)
                                                           setLastName(user.lastName)
                                                            setIsOrderOpened(true)
                                                        } }
                                                        >
                                                        Consulter
                                                </MdpButton>

                                    </div>
                                    
                                    </div>
                                    <div>
                                    </div>
                                    <div className="OrderFooter">
                                        <p>Commande passée le </p>
                                        <p>Total de la commande€</p>
                                    </div>
                                </div>
                                 )
                                }
                        })
                    }
                    {
                      userInfo.isAdmin && isOrderOpened && ordersList.map(order => {
                            return (
                                <div key={order._id} className="Order">
                                    <div className="OrderHeader">
                                    N° de la commande:  <a style={{marginRight: "10px"}} href="#">{order._id}</a>

                                    Utilisateur: <a  className="odp" style={{color: "white"}}>{firstName} {lastName}</a>

                                    <MdpButton style={{float: "right"}} outline mdpXL onClick={() => {
                                                           setFirstName(" ")
                                                           setLastName(" ")
                                                            setIsOrderOpened(false) 
                                                            adminGetAllUsers()                                                           
                                                        } }
                                                        >
                                            Retour
                                    </MdpButton>
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
                                        <MdpButton 
                                        style={{marginLeft: "-675px"}}
                                        outline
                                        mdpS
                                        mdpDelete
                                        onClick={() => {
                                                            deleteOrder(order._id)
                                                            console.log(order._id)                                                           
                                                        } } >
                                        <i className="fas fa-trash" style={{marginRight: "3px"}}></i>&nbsp;
                                        Supprimer
                                        </MdpButton>
                                      
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
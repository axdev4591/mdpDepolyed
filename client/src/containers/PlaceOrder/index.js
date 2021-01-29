import Header from '../../components/Header/Header';
import './style.css';
import NormalInput from '../../components/UI/NormalInput'
import AddressForm from './AddressForm';
import CartPrice from '../../components/CartPrice';
import DeliveryAddress from './DeliveryAddress';
import RadioButton from '../../components/UI/RadioButton';
import { base_url } from '../../constants/index';
import React, { useState , useEffect} from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Axios from 'axios'
import { addToCart, updateCart, getCartItems } from '../../store/actions/cartActions'
import {MdpButton} from '../../components/UI/MdpStyledComponents'


const PlaceOrder = (props) => {


    const cart = useSelector(state => state.cart);
    const { cartItem, totalAmount, cartCount} = cart
    const dispatch = useDispatch()


    const userSignin = useSelector(state => state.userSignin);
    const { loading, userInfo, error } = userSignin;
    const [addresses, setAddresses] = useState([])
    const [address, setAddress] = useState({fullName: "",
                            mobileNumber: "",
                            pinCode: "",
                            locality: "",
                            address: "",
                            cityDistrictTown: "",
                            state: "",
                            landmark: "",
                            alternatePhoneNumber: ""})
    const [order, setOrder] = useState([])
    const [selectedAddress, setSelectedAddress] = useState('')
    const [existingAddress, setExistingAddress] = useState(false)
    const [newAddress, setNewAddress] = useState(false)
    const [isAddressConfirm, setIsAddressConfirm] = useState(false)
    const [isOrderConfirm, setIsOrderConfirm] = useState(false)
    const [selectedPaymentType, setSelectedPaymentType] = useState('COD')
    const [paymentTypes, setPaymentTypes] = useState([
        {id: 1, value: 'card', label: 'Carte de Credit', isActive: false},
        {id: 2, value: 'netBanking', label: 'Western Union', isActive: false},
        {id: 3, value: 'paypal', label: 'Paypal', isActive: false},
        {id: 4, value: 'cod', label: 'Cash après livraison', isActive: true},
    ])

    useEffect(() => {

          if(!userInfo){

                    props.history.push('/login')
          
        }

        dispatch(getCartItems(userInfo))
        getAddresses()
    

    }, [])

    const getAddresses = () => {
        fetch(`${base_url}/user/get-addresses/`+userInfo.userId, {
            headers: {
                  Authorization: ' Bearer ' + userInfo.token
            }
        })
        .then(response => {
            if(response.status == 200){
                return response.json();
            }else{
                throw new Error('Something went wrong');
            }
        })
        .then(jsonResponse => {
            console.log("response adress "+JSON.stringify(jsonResponse.message.address))
            setAddresses(jsonResponse.message.address)
        })
        .catch(error => {
            console.log(error);
            console.log("response adress error "+JSON.stringify(error))

        });

    }

    const inputHandler = (e) => {
        const updatedAddress = {
            ...address,
            [e.target.name] :  e.target.value
        }

        setAddress(updatedAddress)
    }

    const  addressSelector = (e) => {
        setSelectedAddress(e.target.value)
        setExistingAddress(true)
        setNewAddress(false)
    }

    const newAddressSelection = (e) => {
        setSelectedAddress('newAddressId')
        setExistingAddress(false)
        setNewAddress(true)
    }



    const addressSubmitHandler = async (e) => {
        e.preventDefault()

        try {

        const myaddress = {
            userId: userInfo.userId,
            address: address
        }
        console.log(userInfo.token)

        const data = await Axios.post(`${base_url}/user/new-address`, myaddress, {
                headers: {
                  Authorization: ' Bearer ' + userInfo.token
                }
              }
               )


            console.log("retour *****"+ JSON.stringify(data.data.message.address))
            const updatedAddressList = data.data.message.address

            setIsAddressConfirm(true)
            setAddress({
                ...address,
                ...address.address
            })
            setAddresses(updatedAddressList)
            setSelectedAddress(updatedAddressList[updatedAddressList.length - 1]._id)


        }catch(err){
            console.log(err)
        }

    }

    const confirmDeliveryAddress = () => {
        setIsAddressConfirm(true)
    }

    const  confirmOrder = () => {
        setIsOrderConfirm(true)
    }

    const selectPaymentOption = (e) => {
        setSelectedPaymentType(e.target.value)
    }

    const submitOrder = async () => {

        try{

            const order = cartItem.map(item => {
                return {
                    product: item.product,
                    price: item.price,
                    quantity: item.quantity
                }
            });

            const data = {
                    user: userInfo.userId,
                    address: selectedAddress,
                    order: order,
                    paymentType: 'COD',
                    paymentStatus: 'pending'
                }
            const response = await Axios.post(`${base_url}/order/create`,  data, {
                headers: {
                  Authorization: ' Bearer ' + userInfo.token
                }
              }
               )

            const jsonResponse = response.data.message


            console.log("after crete order succeed *****"+ JSON.stringify(response.data))
                 props.history.push({
                    pathname: '/thank-you',
                    search: '?orderid='+jsonResponse._id,
                    state: jsonResponse
                });
    

        }catch(error){
            console.log(error);
        }
        
    }

        let getaddress;
        if(isAddressConfirm && !newAddress){
            getaddress = addresses.find(address => address._id === selectedAddress);
        }else{
            getaddress = address
        }

        return (
            <React.Fragment>
                <Header />
                <div className="Content">
                    <div className="PlaceOrderWrapper">

                        
                        <div className="DeliveryAddress">

                            <div className="Card">
                                <p className="CardText">Login {userInfo ? <i style={{color: "green"}} className="fas fa-check"></i> : null}</p>
                                <p className="CardText">Email: {userInfo.email}</p>
                            </div>

                            {
                                isAddressConfirm ? 
                                 <div className="Card">
                                     <p className="CardText">Adresse de livraison {isAddressConfirm ? <i className="fas fa-check"></i> : null}</p>
                                     <p>
                                        <span>{`${getaddress.fullName} - ${getaddress.mobileNumber} - `}</span>
                                        <span>{ `${getaddress.address}, ${getaddress.cityDistrictTown}, ${getaddress.state} - ${getaddress.pinCode}`}</span>
                                        </p>
                                 </div> :
                                 <React.Fragment>
                                <div className="Card">
                                    <h4>Adresse de livraison</h4>
                                    {
                                        addresses.length && addresses.map(address => 
                                            <DeliveryAddress 
                                                key={address._id} 
                                                onAddressSelection={addressSelector} 
                                                value={selectedAddress}
                                                address={getaddress} />

                                        )
                                    }
                                    {
                                        existingAddress ?
                                        <div className="DeliveryButtonContainer" >
                                            <MdpButton outline mdpXLContact onClick={confirmDeliveryAddress} className="DeliveryAddressButton">Livrer ici</MdpButton>
                                        </div> : null
                                    }
                                    
                                </div>
                                <div className="Card">
                                    <div>
                                        <RadioButton 
                                            name="address"
                                            label="Ajouter une adresse"
                                            value={selectedAddress}
                                            onChange={newAddressSelection}
                                        />
                                    </div>
                                    {
                                        newAddress ? 
                                            <AddressForm
                                                address={address}
                                                inputHandler={inputHandler}
                                                addressSubmitHandler={addressSubmitHandler}
                                            /> : null
                                    }
                                    
                                    
                                </div>
                                </React.Fragment>
                            }
                            
                               

                                {
                                    isOrderConfirm ? 
                                    <div className="Card">
                                        <p className="CardText">Résumé de la commande<i className="fas fa-check"></i> </p>
                                    </div> : 
                                     isAddressConfirm ? 
                                    <div className="Card">
                                        <h4 className="CardText">Résumé de la commande</h4>
                                        {
                                             cartItem.map(item => (
                                                <div key={item.product} style={{display: 'flex', margin: '5px 0', alignItems: 'center'}}>
                                                    <div style={{width: '60px', height: '60px', overflow: 'hidden', position: 'relative'}}>
                                                        <img style={{maxWidth: '100%', maxHeight: '100%', position: 'absolute', left: '50%', transform: 'translateX(-50%)'}} src={item.imageUrl} alt="" />
                                                    </div>
                                                    <div>
                                                        <h5>{item.name}</h5>
                                                        <h6>Quantité : {item.quantity}</h6>
                                                        <h6>{item.total}€</h6>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                        <button onClick={confirmOrder} className="ContinueButton">Continue</button>
                                    </div>
                                 : null
                                }
                                
                                {
                                    isOrderConfirm ? 
                                    <div className="Card">
                                    <h4 className="CardText">Option de paiement</h4>
                                    <ul>
                                        {
                                            paymentTypes.map(payment => 
                                            <li className="paymentType" key={payment.id}>
                                                <RadioButton
                                                    key={payment.id} 
                                                    name="paymentType"
                                                    label={payment.label}
                                                    value={payment.value}
                                                    onChange={selectPaymentOption}
                                                />
                                            </li>)
                                        }
                                    </ul>
                                    {
                                        selectedPaymentType !== 'cod' ? 
                                        <p className="ErrorMessage">Désolé, seul le paiment en espèce à la livraison est disponible</p> : null
                                    }
                                    <button className="PaymentConfirm" onClick={
                                        () => { 
                                             if( isOrderConfirm == true ){

                                                submitOrder()
                                             }
                                            }
                                        }>Confirmer la commande</button>

                                </div> : null
                                }
                              
                        
                            </div>

                    <CartPrice />
                            
                    </div>

      
                </div>
                
            </React.Fragment>
        );
    }

export default PlaceOrder
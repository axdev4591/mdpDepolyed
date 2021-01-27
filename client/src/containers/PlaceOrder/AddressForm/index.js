import React, { Component } from 'react';
import NormalInput from '../../../components/UI/NormalInput';
import './style.css'


const AddressForm = props =>  {

        const {address} = props;
     

        return (
            <form onSubmit={props.addressSubmitHandler}>
                 <div className="Row">
                        <div style={{width: '49%'}}>
                            <NormalInput 
                                name="fullName"
                                value={address.fullName}
                                placeholder={'Nom complet'}
                                inputHandler={props.inputHandler}
                                type="text"
                            />
                        </div>
                        <div style={{width: '49%'}}>
                            <NormalInput 
                                name="mobileNumber"
                                value={address.mobileNumber}
                                placeholder={'N° de telephone'}
                                inputHandler={props.inputHandler}
                                type="text"
                            />
                        </div>
                    </div>
                    <div className="Row">
                        <div style={{width: '49%'}}>
                            <NormalInput 
                                name="pinCode"
                                value={address.pinCode}
                                placeholder={'Code postal'}
                                inputHandler={props.inputHandler}
                                type="text"
                            />
                        </div>
                        <div style={{width: '49%'}}>
                            <NormalInput 
                                name="locality"
                                value={address.locality}
                                placeholder={'Département'}
                                inputHandler={props.inputHandler}
                                type="text"
                            />
                        </div>
                    </div>
    
                    <div className="Row">
                        <NormalInput 
                                name="address"
                                value={address.address}
                                placeholder={'Adresse (N°, rue , avenue etc.. et libellé)'}
                                inputHandler={props.inputHandler}
                                type="textarea"
                                style={{height: '60px'}}
                        />
                    </div>
    
                    <div className="Row">
                        <div style={{width: '49%'}}>
                            <NormalInput 
                                name="cityDistrictTown"
                                value={address.cityDistrictTown}
                                placeholder={'Ville'}
                                inputHandler={props.inputHandler}
                                type="text"
                            />
                        </div>
                        <div style={{width: '49%'}}>
                            <NormalInput 
                                name="state"
                                value={address.state}
                                placeholder={'Pays'}
                                inputHandler={props.inputHandler}
                                type="text"
                            />
                        </div>
                    </div>
    

                    <div className="Row">
                    <div className="ActionButtonWrapper">
                        <button>Sauvegarder</button>
                    </div>
                    </div>

            </form>
           
        );
    
    
}

export default AddressForm;
import React, {useRef, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import IdleTimer from 'react-idle-timer'
import { logout, update } from '../../store/actions/userActions';
import {MdpButton} from '../../components/UI/MdpStyledComponents'




const IdleTimerContainer = (props) => {
    const idleTimerRef = useRef(null)
    const userSignin = useSelector(state => state.userSignin);
    const { loading, userInfo, error } = userSignin
    const dispatch = useDispatch();

    const [isIdle, setIsIdle] = useState(false)
    const [seconds, setSeconds ] =  useState(20);
    const [timer, setTimer] = useState(null)
    
    /*
    useEffect(()=>{
    let myInterval = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            }
            if (seconds === 0) {
                clearInterval(myInterval)
       
            } 
        }, 1000)

        return () => clearInterval(myInterval);
        
    }, [])
      */

 
    const onIdle =  () => {

/*
      if(userInfo){

        setIsIdle(true)
        let myInterval = setInterval(() => {
          if (seconds > 0) {
              setSeconds(seconds - 1);

          }
          if (seconds === 0) {
              clearInterval(myInterval)
              dispatch(logout());
              props.idle.history.push("/");
     
          }
      }, 1000)

      setTimer(myInterval)

                     
        }else{
       
            console.log("************ User not connected ************")
      
      }*/
    
    }
  

    return (
      <div>
          <IdleTimer ref={idleTimerRef} timeout = {5 * 1000} onIdle={onIdle}>
               {isIdle && <div style={{display:"flex"}}>
               <p style={{color: "red", fontSize: "17px", marginRight:"6px"}} >Vous serez déconnecter dans 00:{seconds}s..  </p>
               <MdpButton 
                onClick={() => {
                  clearInterval(timer)
                  setIsIdle(false)
                  setSeconds(20)             
                }}
             
             outline mdpXL >
                Annuler
             </MdpButton>
               </div>
               

               }
          </IdleTimer>
      </div>
      
    )
}

export default IdleTimerContainer

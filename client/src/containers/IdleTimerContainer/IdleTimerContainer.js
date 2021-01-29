import React, {useRef, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import IdleTimer from 'react-idle-timer'
import { logout, update } from '../../store/actions/userActions';
import {MdpButton} from '../../components/UI/MdpStyledComponents'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';




const IdleTimerContainer = (props) => {
    const idleTimerRef = useRef(null)
    const userSignin = useSelector(state => state.userSignin);
    const { loading, userInfo, error } = userSignin
    const dispatch = useDispatch();

    const [openDialog, setOpenDialog] = useState(false);
    const [isIdle, SetIsIdle] = useState(false)


    const onIdle =  () => {



     /*   if(userInfo){
            //setOpenDialog(true)

            if(isIdle){

            dispatch(logout());
            props.idle.history.push("/");
            console.log("************ User  is idle ************")
            }

                     
        }else{
       
            console.log("************ User not connected ************")
            
        
      }*/
    
    }

  
    const Transition = React.forwardRef(function Transition(props, ref) {
        return <Slide direction="up" ref={ref} {...props} />;
      })



    return (
      <div>
          <IdleTimer ref={idleTimerRef} timeout = {5 * 1000} onIdle={onIdle}>
          </IdleTimer>
          { openDialog && (    
    <div>
      <Dialog
        open={openDialog}
        TransitionComponent={Transition}
        keepMounted
        onClose={(e) => {
          e.preventDefault()
         setOpenDialog(false)}}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{"Déconnexion en cours..."}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
              Vous êtes inatif depuis un moment, pour des raisons de sécurité nous allons vous déconnecter dans 20s
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <MdpButton outline mdpXL onClick={
            (e) => { 
              e.preventDefault()
              SetIsIdle(false)
              setOpenDialog(false)

              }} >
            Rester
          </MdpButton>
          <MdpButton outline mdpXL onClick={
            () => {
                SetIsIdle(true)
                setOpenDialog(false)
              }} >
             Déconnecter
          </MdpButton>
        </DialogActions>
      </Dialog>
    </div>) }
      </div>
      
    )
}

export default IdleTimerContainer

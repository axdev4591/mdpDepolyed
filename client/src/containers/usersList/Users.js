
import React, { useEffect, useState } from 'react';
import {AgGridColumn, AgGridReact} from 'ag-grid-react';
import Header from '../../components/Header/Header'
import { useSelector, useDispatch } from 'react-redux';
import {base_url} from '../../constants/index'
import Axios from 'axios'
import {MdpButton} from '../../components/UI/MdpStyledComponents'
import './style.css';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

const Users = (props) => {

    useEffect(() => {
    
        if(!userInfo){
    
            props.history.push('/login');
                     
        }else{
            if(userInfo.isAdmin){
                //getUsers()
                adminGetAllUsers()
            }
        
        }
        return () => {
        };
      }, []);

    const userSignin = useSelector(state => state.userSignin);
    const { loading, userInfo, error } = userSignin
    const [userList, setUserList] = useState([])

   const rowData = [
       {uid: "1", nom: "Celica", prenom: "tg", email: "axe@tt.fr", tel: "0755226301"},
       {uid: "2", nom: "Mondeo", prenom: "uu", email: "axe@tt.fr", tel: "0755226301"},
       {uid: "3", nom: "Boxter", prenom: "kl", email: "axe@tt.fr", tel: "0755226301"},
       {uid: "4", nom: "Celica", prenom: "jj", email: "axe@tt.fr", tel: "0755226301"},
       {uid: "5", nom: "Mondeo", prenom: "gt", email: "axe@tt.fr", tel: "0755226301"},
       {uid: "6", nom: "Boxter", prenom: "af", email: "axe@tt.fr", tel: "0755226301"}
   ];
  
 
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

   return (
    <div className="Content">
    <div className="Card">
       <div className="ag-theme-alpine" style={{height: 600, width: 1250}}>
           <AgGridReact
               rowData={userList} >
                <AgGridColumn field="firstName"></AgGridColumn>
               <AgGridColumn field="lastName"></AgGridColumn>
               <AgGridColumn field="email"></AgGridColumn>
               <AgGridColumn field="firstName"></AgGridColumn>
               <AgGridColumn field="isAdmin"></AgGridColumn>
               <AgGridColumn field="hasAnOrder"></AgGridColumn>
               <AgGridColumn field="_id"></AgGridColumn>
               <AgGridColumn field="createdAt"></AgGridColumn>
           </AgGridReact>
       </div>
    </div>
    </div>
   );
};

export default Users;
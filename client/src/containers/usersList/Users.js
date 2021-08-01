
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
import 'ag-grid-enterprise';

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

   const columns = [
       {headerName:"Nom" , field:"lastName", checkboxSelection: true},
       {headerName:"Prenom" , field:"firstName", tooltipField: "Nom"}, 
       {headerName:"Email" , field:"email", tooltipField: "Nom"},
       {headerName:"IsAdmin" , field:"isAdmin", tooltipField: "Nom"}, 
       {headerName:"UID" , field:"_id", tooltipField: "Nom"}, 
       {headerName:"Date d'inscription" , field:"createdAt"}
   ];

   const defaultColDef = { 
       sortable: true, 
       editable: true, 
       filter: true,
       resizable: true,
       minWidth: 100,
       flex: 1,
       floatingFilter: true,
       icons: {
        sortAscending: '<i class="fa fa-sort-alpha-up"/>',
        sortDescending: '<i class="fa fa-sort-alpha-down"/>',
      },
      enableValue: true,}


  
 
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
    <div>
       <div className="ag-theme-alpine" style={{height: 600, width: 1291}}>
           <AgGridReact 
                rowData={userList} 
                columnDefs={columns} 
                defaultColDef={defaultColDef} 
                sideBar={{ toolPanels: ['columns'] }}
                rowGroupPanelShow={'always'}
                pivotPanelShow={'always'}
                debug={true}
                animateRows={true}
                rowSelection={'multiple'}
                enableBrowserTooltips={true}
                tooltipShowDelay={{tooltipShowDelay: 2}}
                pagination={true}
                suppressRowClickSelection={true}
                groupSelectsChildren={true}
                paginationAutoPageSize={true}
                />
       </div>
    </div>
    </div>
   );
};

export default Users;
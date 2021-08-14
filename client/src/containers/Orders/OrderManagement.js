
import React, { useEffect, useState } from 'react';
import {AgGridColumn, AgGridReact} from 'ag-grid-react';
import Header from '../../components/Header/Header'
import { useSelector, useDispatch } from 'react-redux';
import {base_url} from '../../constants/index'
import Axios from 'axios'
import {MdpButton} from '../../components/UI/MdpStyledComponents'
//import './style.css';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'ag-grid-enterprise';
import {AccessAlarm, ThreeDRotation, AutorenewIcon } from '@material-ui/icons';
import VisibilityIcon from '@material-ui/icons/Visibility';
import OrderManagement2 from './OrderManagement2'

const OrderManagement = (props) => {

    const userSignin = useSelector(state => state.userSignin);
    const { loading, userInfo, error } = userSignin
    const [userList, setUserList] = useState([])
    const [ordersList, setOrdersList] = useState([])
    const [status, setStatus] = useState(false)
    const [deleteDb, setDeleteDb] = useState(false)
    const [isOpened, setIsOpened] = useState(true)
    const [firstName, setFirstName] = useState("")
   const [lastName, setLastName] = useState("")
   const [myOrders, setMyOrders] = useState([])
   const [deliveryStatus, setDeliveryStatus] = useState("livré le 12/01/2021")


  
    const columns = [
        {headerName:"Actions" , field:"", editable: false,
        cellRendererFramework: (params) => ( <MdpButton outline mdpXL onClick={() => {
            if(!params.data.isAdmin && params.data.hasAnOrder){
              //setOrderUserID(params.data._id)
                getOrdersAdmin(params.data._id)
                setFirstName(params.data.firstName)
                setLastName(params.data.lastName)
                setIsOpened(false)
              console.log("orders ftater consulter "+JSON.stringify(myOrders))
              console.log("isopened after cisuloter 3: "+JSON.stringify(isOpened));
              }      
        } }
        >
        <span style={{flexDirection:"column", textAlign: "center"}}>Consulter <VisibilityIcon fontSize="medium" /></span>
        </MdpButton>)},
        {headerName:"Commande" , field:"hasAnOrder", editable: true, 
        cellRenderer: 'agAnimateShowChangeCellRenderer'},
        {headerName:"Nom" , field:"lastName", editable: false, 
         cellRenderer: 'agAnimateShowChangeCellRenderer'},
        {headerName:"Prenom" , field:"firstName", editable: false, 
        cellRenderer: 'agAnimateShowChangeCellRenderer'},
        {headerName:"UID", field:"_id", editable: false, 
        cellRenderer: 'agAnimateShowChangeCellRenderer'},    
       
    ];


 
    const columns1 = [
      {headerName:"N° de la commande" , field:"_id", editable: false, cellRenderer: 'agAnimateShowChangeCellRenderer'},
      {headerName:"Commande passée le" , field:"orderDate",cellRenderer: 'agAnimateShowChangeCellRenderer'},
      {headerName:"Produit" , field:"product", 
      cellRenderer: 'agAnimateShowChangeCellRenderer'},
      {headerName:"Montant total" , field:"total", 
      cellRenderer: 'agAnimateShowChangeCellRenderer'},
  
       
       {headerName:"Status de Paiement", field:"paymentStatut", cellRenderer: 'agAnimateShowChangeCellRenderer'},
  
      {headerName:"Adresse de livraison" , field:"deliveryAdress",  cellRenderer: 'agAnimateShowChangeCellRenderer'},
      {headerName:"Type de Paiement", field:"paymentType", cellRenderer: 'agAnimateShowChangeCellRenderer'}, 
      
      {headerName:"Status de Paiement", field:"paymentStatut",  cellRenderer: 'agAnimateShowChangeCellRenderer'},
      {headerName:"Statut de la livraison" , field:"DeliveryStatus",  cellRenderer: 'agAnimateShowChangeCellRenderer'}
     
  ];
  //columns for one user orders:


   /* const frameworkComponents ={
        genderCellRenderer: GenderRenderer
      }*/
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
        }
        }
    const [gridApi, setGridApi] = useState(null);
    const [gridColumnApi, setGridColumnApi] = useState(null);
    

    useEffect(() => {
    
        if(!userInfo){
    
            props.history.push('/login');
                     
        }else{
            if(userInfo.isAdmin){
                //getUsers()
                
                //getOneUserOrders()
                adminGetAllUsers()
            }
        
        }
        return () => {
        };
      }, []);
    
    
    const onGridReady = (params) => {
        setGridApi(params.api);
        setGridColumnApi(params.columnApi);
        console.log("Grid is ready load orders "+params.api);
        
      };

  
    const onQuickFilterChanged = () => {
    gridApi.setQuickFilter(document.getElementById('quickFilter').value);
    };
    const getRowData = () => {
        var rowData = [];
        userList.forEachNode(function (node) {
          rowData.push(node.data);
        });
        console.log('Row Data:');
        console.log(rowData);
      };
    
    const clearData = () => {
        userList.setRowData([]);
      };

    const updateItems = () => {
    var itemsToUpdate = [];
    gridApi.forEachNodeAfterFilterAndSort(function (rowNode, index) {
        if (index >= 2) {
        return;
        }
        var data = rowNode.data;
        itemsToUpdate.push(data);
    });
    var res = gridApi.applyTransaction({ update: itemsToUpdate });
    printResult(res);
    };

    const onRemoveSelected = () => {
    var selectedData = gridApi.getSelectedRows();
    var res = gridApi.applyTransaction({ remove: selectedData });
    printResult(res);

    if(deleteDb){

    //api delete on db  
  }
    };
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


    const saveDataOnDb = () =>  {
      
      }

    const printResult = (res) => {
    console.log('---------------------------------------');
    if (res.add) {
        res.add.forEach(function (rowNode) {
        console.log('Added Row Node', rowNode);
        });
    }
    if (res.remove) {
        res.remove.forEach(function (rowNode) {
        console.log('Removed Row Node', rowNode);
        });
    }
    if (res.update) {
        res.update.forEach(function (rowNode) {
        console.log('Updated Row Node', rowNode);
        });
    }
    }
    /****get all users for administration back office */
    const adminGetAllUsers = async () => {
        // getUsers()
            console.log("admin get users ")
            try{

                const { data } = await Axios.get(`${base_url}/admin/get-users`, {
                    headers: {
                        Authorization: ' Bearer ' + userInfo.token
                    }
                })
                console.log("response All users: ");
                setUserList(data.message)

            }catch(error){
                console.log(error + "error front");
            }
            
        }

    const getOrdersAdmin =  async (userId) => {
        
                console.log("admin get orders" + userId)
                try{
                    
                const { data } = await Axios.get(`${base_url}/order/getorders/${userId}`, {
                    headers: {
                            Authorization: ' Bearer ' + userInfo.token
                    }
                })
                console.log("responseorderrrrrrr: "+JSON.stringify(data.message));
                setOrdersList(data.message)
                console.log("responseorderrrrrrr 2: "+JSON.stringify(isOpened));

            
            }catch(error){
                console.log(error);
            }
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
    const onUpdateSomeValues = (rowIndex) => {
      var rowCount = gridApi.getDisplayedRowCount();
     
        var rowNode = gridApi.getDisplayedRowAtIndex(rowIndex);

        console.log("rownode::::: "+rowNode)
        if(rowNode.data.status!="NEW"){
          rowNode.setDataValue('status', "UPDATED")
        }
      
    };

    const onCellValueChanged = (event) => {
    
      console.log('Data after change is', event);
      onUpdateSomeValues(event.rowIndex)

    
    };

  const sendData = () => {
    console.log("isopen ="+isOpened)
    if(status){

      console.log('Data updated'+gridApi.data);
    //update user info
  }
  }

 const submitHandler = () => {
   console.log("submit data")
 }

   return (
    <div className="Content">
    <div className="Card">
    { isOpened ? <p className="CardText">Consultation des commandes</p> : <p className="CardText">Liste commandes</p>}

    { isOpened ? 
    
       <div className="ag-theme-alpine" style={{height: 560, width: 1251}}>
     

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
                onGridReady={onGridReady}
                components={{ datePicker: getDatePicker() }}
                //frameworkComponents={frameworkComponents}                    
                onCellValueChanged={onCellValueChanged}
                />          
       </div>
       : ordersList.map(order => {
        return (
         
          <div key={order._id} className="Order">
                        <div className="OrderHeader">
                        N° de la commande:  <a style={{marginRight: "10px"}} >{order._id}</a>

                        Utilisateur: <a  className="odp" style={{color: "white"}}>{firstName} {lastName}</a>

                        <MdpButton style={{float: "right"}} outline mdpXL onClick={() => {
                                                setFirstName(" ")
                                                setLastName(" ")
                                                setIsOpened(true) 
                                                adminGetAllUsers()                                                           
                                            } }
                                            >
                                Retour
                        </MdpButton>
                                    </div>
                                    <div className="OrderDescription" >
                                      
                                        <div className="od1">
                                            <p className="odtitle">Adresse de livraison</p>
                                            <input style={{backgroundColor:"#00008B", color: "white"}}
                                                    value={`${order.address.address} ${order.address.cityDistrictTown} ${order.address.state} - ${order.address.pinCode}`}
                                        
                                                    readOnly
                                                   type="text" />
                                       </div>
                                        <div className="od2">
                                            <p className="odtitle">Type de paiement</p>
                                            <input style={{backgroundColor:"#00008B", color: "white"}}
                                                    value={order.paymentType}
                                                    readOnly
                                                   type="text" />
                                            
                                        </div>
                                        <div className="od3">
                                            <p className="odtitle" >Statut du paiement</p>
                                            <input style={{backgroundColor:"#00008B", color: "white"}}
                                                    value={order.paymentStatus}
                                                    readOnly
                                                   type="text" />
                                        </div>
                                        <div className="od3">
                                            <p className="odtitle" >Statut de la livraison</p>
                                            <input style={{backgroundColor:"#00008B", color: "white"}}
                                                    value={deliveryStatus}
                                                    onChange={(e) => setDeliveryStatus(e.target.value)}
                                                   type="text" required />
                                              
                                          </div>
                                          <MdpButton type="submit" outline mdpXL style={{float: "left" }}
                                          onClick={(e) => {
                                            e.preventDefault()
                                            submitHandler()
                                          }}>
                                        Valider
                                      </MdpButton>
                                        
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
    })}
    </div>
    </div>
   );

   


 
  function extractValues(mappings) {
    return Object.keys(mappings);
  }
  function lookupValue(mappings, key) {
    console.log("key "+key)
    console.log("key "+JSON.stringify(mappings))
    return mappings[key];
  }
  function lookupKey(mappings, name) {
    var keys = Object.keys(mappings);
    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      if (mappings[key] === name) {
        return key;
      }
    }
  }

  function colourCellRenderer(params) {
    if (params.value === '(Select All)') {
      return params.value;
    }
    const image = props.value === 'Homme' ? 'male.png' : 'female.png';
      const imageSource = `https://www.ag-grid.com/example-assets/genders/${image}`;
    console.log("value "+params.value)
    return (
      '<span style="color: ' +
      removeSpaces(params.valueFormatted) +
      '">' + (params.value=="Homme"? '<img src="https://www.ag-grid.com/example-assets/genders/male.png"/>'+
      params.value +'</span>': '<img src="https://www.ag-grid.com/example-assets/genders/female.png"/>'+
      params.value +'</span>')
    );
  }
  //PregnantWomanIcon params.value + `<img src={${imageSource}}/></span>`
  function removeSpaces(str) {
    return str ? str.replace(/\s/g, '') : str;
  }

function getDatePicker() {
    function Datepicker() {}
    Datepicker.prototype.init = function (params) {
      this.eInput = document.createElement('input');
      this.eInput.value = params.value;
      this.eInput.classList.add('ag-input');
      this.eInput.style.height = '100%';
      
      this.eInput.setAttribute("type", "date");
    this.cell = params.eGridCell;
    this.oldWidth = this.cell.style.width;
    this.cell.style.width = "162px";
    this.eInput.value = params.value;
     //$(this.eInput).datepicker({ dateFormat: 'dd/mm/yy' });
    };
    Datepicker.prototype.getGui = function () {
      return this.eInput;
    };
    Datepicker.prototype.afterGuiAttached = function () {
      this.eInput.focus();
      this.eInput.select();
    };
    Datepicker.prototype.getValue = function () {
      return this.eInput.value;
    };
    Datepicker.prototype.destroy = function () {};
    Datepicker.prototype.isPopup = function () {
      return false;
    };
    return Datepicker;
  }
  
};
{/** ordersList.map(order => {
        return (
            <div key={order._id} className="Order">
                                    <div className="OrderHeader">
                                    N° de la commande:  <a style={{marginRight: "10px"}} href="#">{order._id}</a>

                                    Utilisateur: <a  className="odp" style={{color: "white"}}>{firstName} {lastName}</a>

                                    <MdpButton style={{float: "right"}} outline mdpXL onClick={() => {
                                                           setFirstName(" ")
                                                           setLastName(" ")
                                                           setIsOpened(false) 
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
    }) */}
export default OrderManagement;


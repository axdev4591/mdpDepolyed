
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

const OrderManagement2 = (props) => {

    const userSignin = useSelector(state => state.userSignin);
    const { loading, userInfo, error } = userSignin
    const [ordersList, setOrdersList] = useState([])
    const [deleteDb, setDeleteDb] = useState(false)
    const [isOpened, setIsOpened] = useState(true)
   const [fullName, setFullName] = useState("")
   const [myOrders, setMyOrders] = useState([])

 
    const columns = [
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
                getOrdersAdmin(props)
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
        myOrders.forEachNode(function (node) {
          rowData.push(node.data);
        });
        console.log('Row Data:');
        console.log(rowData);
      };
    
    const clearData = () => {
        myOrders.setRowData([]);
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


    const getOrdersAdmin =  async (props) => {
        
                console.log("admin get orders" + props.userId)
                try{
                    
                const { data } = await Axios.get(`${base_url}/order/getorders/${props.userId}`, {
                    headers: {
                            Authorization: ' Bearer ' + userInfo.token
                    }
                })
                console.log("OrderManagement 2 data order: "+JSON.stringify(data.message));

                  var listOfOrder = []
                   /* const singleOrder = item.find(order => order._id === id);
                    console.log("single order "+JSON.stringify(singleOrder))
                    let orderTotal = 0;
                    singleOrder.forEach(order => {
                        orderTotal = orderTotal + (order.price * order.quantity)
                    });*/

                    listOfOrder["_id"] = data.message[0]._id
                    console.log(" 2 data order list: "+JSON.stringify(data.message[0].order));
                    console.log(" 2 data order list: "+JSON.stringify(data.message[0].order[0]));
                 
                        listOfOrder["product"+data.message[0].order[0].product.name] = data.message[0].order[0].product.imageUrl

                        //const singleOrder = order.find(order => order._id === "607d5b4cc44820040ad3d8ab");
                    //console.log("single order "+JSON.stringify(singleOrder))

                    let orderTotal = 0;
                        orderTotal = orderTotal + (data.message[0].order[0].price * data.message[0].order[0].quantity)
                 
                        listOfOrder["total"] = orderTotal

                   
                    listOfOrder["orderDate"] = data.message[0].orderDate
                   
                    listOfOrder["deliveryAdress"] = data.message[0].address.address + " "+ data.message[0].address.cityDistrictTown + " "+ data.message[0].address.pinCode + " "+ data.message[0].address.state 
                    listOfOrder["paymentType"] = data.message[0].paymentType
                    listOfOrder["paymentStatus"] = data.message[0].paymentStatus
                    listOfOrder["deliveryStatus"] = data.message[0].isOrderCompleted   
                    
                  console.log("my orders 1"+ JSON.stringify(listOfOrder))            

                  setMyOrders(data.message[0])
                  setFullName(data.message[0].address.fullName)
            }catch(error){
                console.log(error);
            }
    }


    const formatDate = (date) => {
        let d = new Date(date);
        return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
    }

  const getOrderTotal = (id) => {
        console.log("single order1 "+JSON.stringify(myOrders))
        const singleOrder = myOrders.find(order => order._id === id);
        console.log("single order "+JSON.stringify(singleOrder))
        let orderTotal = 0;
        singleOrder.forEach(order => {
            orderTotal = orderTotal + (order.price * order.quantity)
        });

        return orderTotal;
    }

    const onUpdateSomeValues = (rowIndex) => {
      var rowCount = gridApi.getDisplayedRowCount();
     
        var rowNode = gridApi.getDisplayedRowAtIndex(rowIndex);

        console.log("rownode::::: "+rowNode)
      /*  if(rowNode.data.status!="NEW"){
          rowNode.setDataValue('status', "UPDATED")
        }*/
      
    };

    const onCellValueChanged = (event) => {
    
      console.log('Data after change is', event);
      onUpdateSomeValues(event.rowIndex)

    
    };

  const sendData = () => {
   
  }
  

 /* const setOrderData = () =>{

    var listOfOrder = []
    ordersList.map(item => {

      listOfOrder["_id"] = item._id
      listOfOrder["product"] = item.order
      listOfOrder["orderDate"] = item.orderDate
      listOfOrder["total"] = getOrderTotal(item.order._id)
      listOfOrder["deliveryAdress"] = item.address
      listOfOrder["paymentType"] = item.paymentType
      listOfOrder["paymentStatus"] = item.paymentStatus
      listOfOrder["deliveryStatus"] = ""
    })

    setMyOrders(listOfOrder)
    console.log("set all order ..... "+ JSON.stringify(ordersList))
    console.log("set user order ..... "+ JSON.stringify(myOrders))
  }*/

   return (
    <div  className="ag-theme-alpine" style={{height: 560, width: 1251}}>
   
        <MdpButton outline mdpXL onClick={() => {

            onRemoveSelected()
        } }
        >
         Supprimer
        </MdpButton>
        <p style={{float: 'left'}} > Acheteur: {fullName}</p>
        <MdpButton style={{float: 'right'}}  outline mdpXL onClick={() => {

           // setIsOpened(true)
            console.log(isOpened)
            //sendData()
            
            console.log("my orders "+ JSON.stringify(myOrders))
        } }
        >
        Enregistrer
        </MdpButton>
           <AgGridReact 
                rowData={myOrders} 
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
                onCellValueChanged={onCellValueChanged}
                />          
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

export default OrderManagement2;


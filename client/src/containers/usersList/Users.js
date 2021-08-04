
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
//import AutorenewIcon from '@material-ui/icons/Autorenew';
import {AccessAlarm, ThreeDRotation, AutorenewIcon } from '@material-ui/icons';
import CachedIcon from '@material-ui/icons/Cached';
import FiberNewIcon from '@material-ui/icons/FiberNew'
import PregnantWomanIcon from '@material-ui/icons/PregnantWoman';
//import SettingsAccessibilityIcon from '@material-ui/icons/SettingsAccessibility';

const Users = (props) => {

    const userSignin = useSelector(state => state.userSignin);
    const { loading, userInfo, error } = userSignin
    const [userList, setUserList] = useState([])
    const [status, setStatus] = useState(false)
    const [deleteDb, setDeleteDb] = useState(false)

    const colourMappings = {
      Homme: '#00008B',
      Femme: 'Forest Green'
    };
  
    const columns = [
        {headerName:"Statut" , field:"status", editable: false, 
        cellRendererFramework: (params) => (params.value=="UPDATED"?<CachedIcon fontSize="medium" />
        :(params.value=="EXISTING"?"":<FiberNewIcon fontSize="medium" />)) },

        {headerName:"" , field:"", checkboxSelection: true, headerCheckboxSelection:true, headerCheckboxSelectionFilteredOnly:true},
        {headerName:"Nom" , field:"lastName",
         cellRenderer: 'agAnimateShowChangeCellRenderer'},
        {headerName:"Prenom" , field:"firstName", tooltipField: "Nom", 
        cellRenderer: 'agAnimateShowChangeCellRenderer'},
        {headerName:"Sexe" , field:"sex", minWidth:150,
        cellEditor:"agRichSelectCellEditor",
        cellEditorParams:{
          values: ['Homme', 'Femme'],
          cellRenderer:  colourCellRenderer,
        },
        filter:"agSetColumnFilter",
        filterParams:{
          values: ['Homme', 'Femme'],
          valueFormatter: (params) => {
            return lookupValue(colourMappings, params.value);
          },
          cellRenderer: colourCellRenderer,
        },
        valueFormatter:(params) => {
          return lookupValue(colourMappings, params.value);
        },
        valueParser:(params) => {
          return lookupKey(colourMappings, params.newValue);
        },
        cellRenderer:colourCellRenderer},
        {headerName:"Email" , field:"email", tooltipField: "Nom",
        cellRenderer: 'agAnimateShowChangeCellRenderer'},
        {headerName:"Date d'inscription" , field:"createdAt", editable:true, 
        cellRenderer: 'agAnimateShowChangeCellRenderer',cellEditor:"datePicker", filter: "agDateColumnFilter"},
        {headerName:"Tel" , field:"tel", 
        cellRenderer: 'agAnimateShowChangeCellRenderer'},     
        {headerName:"Addresse" , field:"_id", tooltipField: "Nom", 
        cellRenderer: 'agAnimateShowChangeCellRenderer'},
       
    ];

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
        },
        //cellRenderer:"agAnimateShowChangeCellRenderer"
       // enableValue: true,
       // enableCellChangeFlash: true,
       // animateRows: true,
        }
    const rowStyle = { background: '#22402b' };
    const [gridApi, setGridApi] = useState(null);
    const [gridColumnApi, setGridColumnApi] = useState(null);
    

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
    
    
    const onGridReady = (params) => {
        setGridApi(params.api);
        setGridColumnApi(params.columnApi);
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
    
    const addItems = (addIndex) => {
    var newItems = [createNewRowData()];
    var res = gridApi.applyTransaction({
        add: newItems,
        addIndex: addIndex,
    });
    printResult(res);
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
    
    const createNewRowData = () => {
    var newData = {"status":"NEW","isAdmin":false,"hasAnOrder":false,
                "_id":"","firstName":"","lastName":"",
                "email":"","password":"",
                "createdAt":"",
                "__v":0,"tel":"","sex":""}
    return newData;
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
    console.log("status ="+status)
    if(status){

      console.log('Data updated'+gridApi.data);
    //update user info
  }
  }

   return (
    <div className="Content">
    <div className="Card">
    <p className="CardText">Liste des Utilisateurs</p>
       <div className="ag-theme-alpine" style={{height: 560, width: 1251}}>
       <MdpButton outline mdpXL onClick={() => {
            addItems(0)
        } }
        >
         Ajouter
        </MdpButton>
        <MdpButton outline mdpXL onClick={() => {

            onRemoveSelected()
        } }
        >
         Supprimer
        </MdpButton>
        <MdpButton style={{float: 'right'}}  outline mdpXL onClick={() => {

            setStatus(true)
            sendData()
        } }
        >
        Enregistrer
        </MdpButton>
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

export default Users;
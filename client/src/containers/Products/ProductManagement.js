import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import axios from 'axios';
import {AgGridColumn, AgGridReact} from 'ag-grid-react';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'ag-grid-enterprise';
//import AutorenewIcon from '@material-ui/icons/Autorenew';
import CachedIcon from '@material-ui/icons/Cached';
import FiberNewIcon from '@material-ui/icons/FiberNew'

import {
  saveProduct,
  listProducts,
  deleteProduct,
  listCategories
} from '../../store/actions/productActions'

import './style.css';
import {MdpButton} from '../../components/UI/MdpStyledComponents'


const ProductManagement = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState(null);
  const [category, setCategory] = useState('ebooks');
  const [stock, setStock] = useState('');
  const [description, setDescription] = useState('');
  const [slug, setSlug] = useState('');
  const [create, setCreate] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [deleteItem, setDeleteItem] = useState(false);
  const [delProduct,  setDelProduct] = useState(null)
  const [listOfProducts,  setListOfProducts] = useState(null)
  const [catListName, setCatListName] = useState([])
  const [catListID, setCatListID] = useState([])

  

  const userSignin = useSelector(state => state.userSignin);
  const {userInfo, error } = userSignin
  
  const productList = useSelector((state) => state.productList)
  const {loading, products} = productList

  const categoryList = useSelector((state) => state.categoryList)
  const {categories} = categoryList

  const productSave = useSelector((state) => state.productSave)
  const {
    loading: loadingSave,
    success: successSave,
    error: errorSave,
  } = productSave;

  const productDelete = useSelector((state) => state.productDelete)
  const {
    loading: loadingDelete,
    success: successDelete,
    error: errorDelete,
  } = productDelete;
  
  const dispatch = useDispatch();

  useEffect(() => {
    if (successSave) {
      setModalVisible(false);
    }
    dispatch(listProducts('', 1))
    dispatch(listCategories())
    setList()

  }, [successSave, successDelete])

  const openModal = (product) => {
    setModalVisible(true);
    setId(product._id);
    setName(product.name);
    setPrice(product.price);
    setDescription(product.description);
    setSlug(product.slug)
    setImageUrl(product.imageUrl);

    categories.map((cat) => {
      if(cat.name==product.category){
        setCategory(cat._id)

      }}
    )
    setStock(product.stock);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    console.log("aaaaa  aaaaaaaaaa"+category)
    console.log("aaaaa "+JSON.stringify(categories))

    var myCategory = ""

    if(create){
      categories.map((cat) => {
        if(cat.name==category){
          setCategory(cat._id)
          myCategory = cat._id
          console.log("aaaaa "+cat._id)
  
  
        }}
      )
    }else{
      myCategory = category
    }

   
    console.log("aaaaa "+category + " "+myCategory)
    dispatch(
      saveProduct({
        _id: id,
        name,
        price,
        imageUrl,
        myCategory,
        stock,
        description,
        slug,
        create
      }, userInfo.token)
    )
    dispatch(listCategories())
    dispatch(listProducts('', 1))
    setList()
    console.log("aaaaa "+category + " "+myCategory)
  }




    const setList = () => {

      var listOfProd = [] 
      var catListName = []
      var catListID = []

      products.map((produit) => {
        console.log("insde "+produit)
    
    
          categories.map((cat) => {
            if (cat._id == produit.category){
              produit["category"] = cat.name
              listOfProd.push(produit)
              
              if(!catListName.includes(cat.name) && !catListID.includes(cat._id)){
                
              catListName.push(cat.name)
              catListID.push(cat._id)
              }
    
            }
          })
        })
        console.log("insde 2"+JSON.stringify(listOfProd))
      setCatListName(catListName)
      setCatListID(catListID)

      setListOfProducts(listOfProd)
    }



const columns = [
  {headerName:"Statut" , field:"status", editable: false, 
        cellRendererFramework: (params) => (params.value=="UPDATED"?<CachedIcon fontSize="medium" />
        :(params.value=="EXISTING"?"":<FiberNewIcon fontSize="medium" />)) },

        {headerName:"" , field:"", checkboxSelection: true, headerCheckboxSelection:true, headerCheckboxSelectionFilteredOnly:true},
        {headerName:"ID" , field:"_id", editable: false, cellRenderer: 'agAnimateShowChangeCellRenderer'},
        
        {headerName:"Couverture", field:"imageUrl", cellRenderer: ImageRenderer}, 
        {headerName:"Nom" , field:"name",cellRenderer: 'agAnimateShowChangeCellRenderer'},
        {headerName:"Prix" , field:"price", cellRenderer: 'agAnimateShowChangeCellRenderer'},
      
        {headerName:"Categorie" , field:"category",  
        cellEditor:"agRichSelectCellEditor",
        cellEditorParams:{
          values: catListName,
          cellRenderer:  (params)=>(params.value),
        },
        filter:"agSetColumnFilter",
        filterParams:{
          values: catListName,
          cellRenderer: (params)=>(params.value),
        }
      },
        {headerName:"En stock" , field:"stock", cellRenderer: 'agAnimateShowChangeCellRenderer'},
        {headerName:"Ajouté le", field:"createdAt",cellEditor:"datePicker",  cellRenderer: 'agAnimateShowChangeCellRenderer', filter: "agDateColumnFilter"}
      ,
      
        {headerName:"Description", field:"description", cellRenderer: 'agAnimateShowChangeCellRenderer'}
  
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
  listOfProducts.forEachNode(function (node) {
    rowData.push(node.data);
  });
  console.log('Row Data:');
  console.log(rowData);
};

const clearData = () => {
  listOfProducts.setRowData([]);
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

};

const deleteOrder =  async (orderId) => {
  console.log("admin get orders")

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
}

const addItems = (addIndex) => {
  var newItems = [createNewRowData()];
  var res = gridApi.applyTransaction({
      add: newItems,
      addIndex: addIndex,
  });
  printResult(res);
  };
  const createNewRowData = () => {
    var newData = {"status":"NEW","_id":"","name":"",

    "slug":"",
    
    "price":0,"stock":0,
    
    "description":"",
    
    "category":"",
    
    "imageUrl":" ",
    
    "createdAt":" "}
    return newData;
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
  
  return (
    <div className="Content">
    <div className="Card">
    <p className="CardText">Liste des produits</p>

    
       <div className="ag-theme-alpine" style={{height: 560, width: 1251}}>
         <div style={{flex:1}}>
       <MdpButton outline mdpXL  onClick={() => {
         addItems(0)
          } }
          >Ajouter
          </MdpButton>
       <MdpButton outline mdpXL onClick={() => {

            onRemoveSelected()
            } }
            >
              Supprimer
            </MdpButton>
            <MdpButton style={{marginLeft: '0px'}} outline mdpXL onClick={() => {

              setList()
              } }
              >
              Charger
              </MdpButton>
            <MdpButton style={{float: 'right'}}  outline mdpXL onClick={() => {

            } }
            >
                Enregistrer
          </MdpButton>
      </div>
           <AgGridReact 
                rowData={listOfProducts} 
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
  
</div>)


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



function ImageRenderer(params) {
  if (params.value === '(Select All)') {
    return params.value;
  }
  console.log("value "+params.value)
  return (
    '<span> <img style={{ boxShadow: "2px 1px rgba(0, 0, 255, .2)"}} alt="" height="50" width="40" src= "'+params.value+'"/> </span>'
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


            

  }


export default ProductManagement

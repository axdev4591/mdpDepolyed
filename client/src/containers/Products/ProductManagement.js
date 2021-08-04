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

  //Dialog box for delete confirmation
  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  })

  const deleteHandler = () => {

    console.log(JSON.stringify(delProduct))
    dispatch(deleteProduct(delProduct))
    setDelProduct(null)
    dispatch(listCategories())
    dispatch(listProducts('', 1))
    setList()
  
  }



    const setList = () => {

      var listOfProd = []
      products.map((produit) => {
        console.log("insde "+produit)
    
    
          categories.map((cat) => {
            if (cat._id == produit.category){
              produit["category"] = cat.name
              listOfProd.push(produit)
              console.log("insde 2"+listOfProd)
    
            }
          })
        })

      setListOfProducts(listOfProd)
    }


  
  return (
    <div className="Content">
    <div className="Card">
      <div className="product-header">
        <h4>Liste des produits</h4>
   
      </div>
    </div>
  
</div>)
            }




export default ProductManagement

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


const ProductsScreen = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState(null);
  const [category, setCategory] = useState('');
  const [stock, setStock] = useState('');
  const [description, setDescription] = useState('');
  const [slug, setSlug] = useState('');
  const [create, setCreate] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [deleteItem, setDeleteItem] = useState(false);
  const [delProduct,  setDelProduct] = useState(null)

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
  }, [successSave, successDelete])

  const openModal = (product) => {
    setModalVisible(true);
    setId(product._id);
    setName(product.name);
    setPrice(product.price);
    setDescription(product.description);
    setSlug(product.slug)
    setImageUrl(product.imageUrl);
    setCategory(product.category);
    setStock(product.stock);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveProduct({
        _id: id,
        name,
        price,
        imageUrl,
        category,
        stock,
        description,
        slug,
        create
      }, userInfo.token)
    )
    console.log("category: "+category)
  }

  //Dialog box for delete confirmation
  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  })

  const deleteHandler = () => {

    console.log(JSON.stringify(delProduct))

    dispatch(deleteProduct(delProduct))
    setDelProduct(null)
  
  }


  var listOfProducts = []
  products.map((produit) => {

      categories.map((cat) => {
        if (cat._id == produit.category){
          produit["category"] = cat.name
          listOfProducts.push(produit)
        }
      })
    })

    console.log(JSON.stringify(listOfProducts))
  
  return (
    <div className="Content">
    <div className="Card">
      <div className="product-header">
        <h4>Liste des produits</h4>
        <MdpButton outline mdpXL onClick={() => {
            setCreate(true)
            openModal({})
        } }
        >
         Ajouter
        </MdpButton>
      </div>
    {modalVisible && (
        <div className="form">
          <form  onSubmit={submitHandler}>
            <ul className="form-container">
              <li>
                <h2>Créer un produit</h2>
              </li>
              <li>
                {/* loadingSave && <div>Loading...</div> */}
                {/* errorSave && <div>{errorSave}</div> */}
              </li>

              <li>
                <label htmlFor="name">Nom</label>
                <input
                  type="text"
                  name="name"
                  value={name}
                  id="name"
                  onChange={(e) => setName(e.target.value)}
                ></input>
              </li>
              <li>
                <label htmlFor="price">Prix</label>
                <input
                  type="number"
                  name="price"
                  value={price}
                  id="price"
                  onChange={(e) => setPrice(e.target.value)}
                ></input>
              </li>
              <li>
                <label htmlFor="imageUrl">Image</label>
                <input
                  type="file"
                  name="imageUrl"
                  id="imageUrl"
                  onChange={(e) => setImageUrl(e.target.files[0])}
                ></input>
              </li>
              <li>
                <label htmlFor="category">Catégorie</label>
                <select name="categories" value={category} onChange={(e) => setCategory(e.target.value)}>
                    {categories.map((cat) => {
                        return <option key={cat._id} value={cat._id}>{cat.name}</option>
                    })}
                </select>
              </li>
              <li>
                <label htmlFor="stock">Quantité</label>
                <input
                  type="number"
                  name="stock"
                  value={stock}
                  id="stock"
                  onChange={(e) => setStock(e.target.value)}
                ></input>
              </li>
              <li>
                <label htmlFor="description">Description</label>
                <textarea style={{height: "100px"}}
                  name="description"
                  value={description}
                  id="description"
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </li>
              <li style={{flexDirection: "row"}}>
              <MdpButton outline mdpXL style={{marginRight: "72px" }}
                  onClick={(e) => {
                    e.preventDefault()
                    setModalVisible(false)
                    dispatch(listCategories())
                    dispatch(listProducts('', 1))
                  }}
                >
                  Annuler
                </MdpButton>
                <MdpButton type="submit" outline mdpXL style={{marginLeft: "82px" }}>
                  {create ? 'Enregistrer' : 'Sauvegarder'}
                </MdpButton>
              </li>
            </ul>
          </form>
        </div>
      )} 

      <div className="product-list">
        <table className="table">
          <thead className="thead">
            <tr>
              <th>Titre</th>
              <th>Item</th>
              <th>Description</th>
              <th>Prix</th> 
              <th>En stock</th> 
              <th>Catégorie</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {listOfProducts.map((product) => (
              <tr key={product._id}>
                <td>{product.name}</td>
                <td><img src={product.imageUrl} alt="" height="50" width="40"/> </td>
                <td>{product.description.length > 20 ? product.description.substring(0, 20) + "..." : product.description}</td>
                <td>{product.price}€ </td>
                <td>{product.stock} </td>
                <td>{product.category}</td>
                <td>{product.createdAt.split("T")[0]}</td>
                <td>
                  <MdpButton outline mdpS mdpEdit
                  onClick={() => {
                    setCreate(false)
                    openModal(product)
                  }}
                  >
                    Editer
                  </MdpButton>{' '}
                  <MdpButton
                    outline
                    mdpS
                    mdpDelete
                    onClick={() => { 
                      setDelProduct(product)
                      setOpenDialog(true)
                    }}
                  >
                    Supprimer
                  </MdpButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  
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
        <DialogTitle id="alert-dialog-slide-title">{"Suppression d'un produit"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Cette action est irreversible. Êtes-vous sur de vouloir de supprimer ce produit ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={
            (e) => { 
              e.preventDefault()
              setOpenDialog(false)
              setDeleteItem(false)
              setDelProduct(null)
              dispatch(listCategories())
              dispatch(listProducts(userInfo.token))
              }} color="primary">
            Non
          </Button>
          <Button onClick={
            (e) => {
              e.preventDefault()
              setOpenDialog(false)
              setDeleteItem(true)
              deleteHandler(e)
              dispatch(listCategories())
              dispatch(listProducts(userInfo.token))
              }} color="primary">
            Oui
          </Button>
        </DialogActions>
      </Dialog>
    </div>) }
    </div>)
            }


export default ProductsScreen

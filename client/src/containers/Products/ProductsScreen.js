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
    dispatch(listCategories())
    dispatch(listProducts('', 1))
    setList()
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
                { loadingSave && <div style={{color: "green"}}>Loading...</div> }
                { errorSave && <div style={{color: "red"}}>{errorSave}</div> }
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

       {openDialog && (
       <div style={{marginBottom: "8px"}} className="form">
       <div className="dial">
         <ul className="form-container">
           <li style={{textAlign: "center"}}>
             <h2>Suppression d'un produit</h2>
           </li>
           <li>
             { loadingDelete && <div style={{color: "green"}}>Loading...</div> }
             { errorDelete && <div style={{color: "red"}}>{errorDelete}</div> }
           </li>

           <li>

          <div style={{display: "flex"}}>

            <img style={{ boxShadow: "2px 1px rgba(0, 0, 255, .2)"}} src={delProduct.imageUrl} alt="" height="110" width="100"/>          
            
            <div className="ProductDetails">
                  <p className="ProductTitle">{delProduct.name}</p>
                  <p className="ProductPrice">{delProduct.price}€</p>
            </div>

          </div>

          <div className="ProductDescription">
              <h3 style={{marginTop: "17px"}}>Description</h3>
              <div className="BreadCrumb">
              <small>{delProduct.description}</small>
              </div>

              <h4 style={{marginTop: "18px"}}>Catégorie</h4>
              <div className="BreadCrumb">
              <small>      
                <p>{delProduct.category}</p>
              </small>
              </div>
              <h4 style={{marginTop: "18px"}}>NB</h4>
              <div className="BreadCrumb">
              <p style={{color: "red", fontSize: "12px"}}> Attention, la suppression est une action irreversible</p>
              </div>
            
          </div>
              
           </li>
           <li style={{flexDirection: "row"}}>
           <MdpButton outline mdpXLContact style={{marginRight: "72px" }}
               onClick={(e) => {
                 e.preventDefault()
                 setOpenDialog(false)
                 dispatch(listCategories())
                 dispatch(listProducts('', 1))
               }}
             >
               Annuler
             </MdpButton>
             <MdpButton 
              onClick={() => {
                deleteHandler()
                setOpenDialog(false)
              }}
             
             outline mdpXLContact style={{marginLeft: "82px" }}>
             <i className="fas fa-trash" style={{marginRight: "3px"}}></i>&nbsp;
                supprimer
             </MdpButton>
           </li>
         </ul>
       </div>
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

            {listOfProducts && listOfProducts.map((product) => (
              <tr key={product._id}>
                <td>{product.name}</td>
                <td><img style={{ boxShadow: "2px 1px rgba(0, 0, 255, .2)"}} src={product.imageUrl} alt="" height="50" width="40"/> </td>
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
                    window.scrollTo(0, 0);
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
                      window.scrollTo(0, 0);
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
  
</div>)
            }




export default ProductsScreen

/** <Dialog
        open={openDialog}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => {
         setOpenDialog(false)
        }}
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
          <MdpButton outline mdpXL onClick={
            (e) => { 
              e.preventDefault()
              setDeleteItem(false)
              setDelProduct(null)
              dispatch(listProducts('', 1))
              dispatch(listCategories())
              setList()

              }} color="primary">
            Non
          </MdpButton>
          <MdpButton outline mdpXL onClick={
            (e) => {
              e.preventDefault()
              setDeleteItem(true)
              deleteHandler()
              dispatch(listProducts('', 1))
              dispatch(listCategories())
              setList()
               }} color="primary">
            Oui
          </MdpButton>
        </DialogActions>
      </Dialog> */

import React, { useState ,useEffect} from "react";
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import {Navbar,SingleProduct,Products,Cart,Checkout,Page404} from "./componants";
import {commerce} from "./lib/Commerce"

function App() {
  const [products,setProducts] = useState([])
  const [filteredData,setFilteredData] = useState(products)
  const [categories,setCategories] = useState([])
  const [loading,setLoading] = useState(false)
  const [cart,setCart] = useState({})


  const fetchProducts = async()=>{
    setLoading(true)
    const {data} = await commerce.products.list()
    setProducts(data)
    setLoading(false)
  }


  const fetchCart= async(productId)=>{
    setLoading(true)
    const cart = await commerce.cart.retrieve(productId)
    setCart(cart)
    setLoading(false)

  }

  const fetchCategories = async()=>{
      const Categories = await commerce.categories.list()
      setCategories(Categories.data)

    }
    
    const handleAddtoCart = async(productId,quantity)=>{
      const cart = await commerce.cart.add(productId,quantity)
      setCart(cart)
      
    }
    const fetchProductsByCategories = async (name)=>{
      setLoading(true)
      const categories = await commerce.products.list({ category_slug: [name],})
      setProducts(categories.data)
      setLoading(false)

  }

  // Remove,Update,Empty cart
  const handleRemoveFromCart = async(productId)=>{
    setLoading(true)
    const removed = await commerce.cart.remove(productId);
    setCart(removed)
    setLoading(false)
  }
  const handleUpdateCartQty = async(productId,quantity)=>{
    const updatedCart = await commerce.cart.update(productId,{quantity})
    setCart(updatedCart)
  }
  const handleEmptyCart =async () => {
    const cart = await commerce.cart.empty()
    setCart(cart)
  }
  useEffect(() => {
    fetchProducts()
    fetchCart()
    fetchCategories()
    fetchProductsByCategories()
  }, []);

  return (
    <Router>
      <Navbar cart = {cart} categories = {categories} fetchProductsByCategories={fetchProductsByCategories} loading={loading} />
      <Routes>
          <Route  path ="/" element ={<Products products = {products} onAddToCart = {handleAddtoCart} loading ={loading} fetchProductsByCategories={fetchProductsByCategories} categories ={categories} fetchProducts ={fetchProducts}/>  } />
          <Route  path ="/Product/:id" element={<SingleProduct products = {products} onAddToCart = {handleAddtoCart} loading ={loading} />} />            
          <Route  path ="/cart" element={<Cart loading ={loading} products = {products} cart = {cart} removeFromCart = {handleRemoveFromCart} handleEmptyCart ={handleEmptyCart} updateCart = {handleUpdateCartQty}/>}/>           
          <Route  path ="/checkout" element={<Checkout cart = {cart}/>} />        
          <Route  path="*" element ={<Page404 />}/>
      </Routes>
    </Router>
  );
}

export default App;

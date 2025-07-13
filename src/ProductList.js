import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from './features/cart/cartSlice' 
import { updateProduct} from './features/products/productSlice' 
 // ← ajuste le chemin si nécessaire
import './productList.css'
const ProductList = () => {
  const products = useSelector(state => Object.values(state.products.items))
  const dispatch = useDispatch()

    const handleAdd = product => {
    if (product.stock > 0) {
      // 1) on ajoute au panier
      dispatch(addToCart(product))
      // 2) on met à jour le stock
      dispatch(updateProduct({
        ...product,
        stock: product.stock - 1
      }))
    }
  }
  return (
<div className="product-list">
  {products.map(p => (
    <div key={p.id} className="product-card" tabIndex={0}>
      
      {/* Entête noire */}
      <div className="product-header">
        <h3 className="product-title">{p.name}</h3>
      </div>
    <div className='content-card'>

      {/* Description */}
      <p className="product-desc">{p.description}</p>
      
      {/* Prix */}
      <div className="product-price">{p.price.toFixed(2)} €</div>
      
      {/* Stock */}
      <div className={`product-stock ${p.stock === 0 ? 'out' : ''}`}>
        {p.stock > 0
          ? `En stock : ${p.stock}`
          : 'Rupture de stock'}
      </div>
      
      {/* Bouton */}
      <button
        className="product-btn"
        onClick={() => handleAdd(p)}
        disabled={p.stock === 0}
      >
        Ajouter au panier
      </button>
    </div>
    </div>
  ))}
</div>


  )
}

export default ProductList

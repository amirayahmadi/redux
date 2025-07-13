import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, decrementQuantity, removeFromCart, clearCart } from './features/cart/cartSlice'
import {updateProduct}  from './features/products/productSlice'
import './cart.css'

const Cart = () => {
  const dispatch = useDispatch()
 
  // 1) Récupère les entrées du panier
  const cartItems = useSelector(state => Object.values(state.cart.items))
  // 2) Récupère le mapping id → product pour accéder au stock
  const products   = useSelector(state => state.products.items)

  // Calcul du total du panier
  const cartTotal = cartItems.reduce((sum, { product, quantity }) => sum + product.price * quantity, 0).toFixed(2)
 useEffect(() => {
    console.log('Panier mis à jour :', cartItems)
  }, [cartItems])

  // Handler d'incrément (bouton "+")
  const handleIncrement = product => {
    if (products[product.id].stock > 0) {
      dispatch(addToCart(product))
      dispatch(updateProduct({
        ...product,
        stock: products[product.id].stock - 1
      }))
    }
  }

  // Handler de décrément (bouton "–")
  const handleDecrement = productId => {
    const entry = cartItems.find(cart=> cart.product.id === productId)
    const prod  = products[productId]
    if (entry && prod) {
      dispatch(decrementQuantity(productId))
      dispatch(updateProduct({
        ...prod,
        stock: prod.stock + 1
      }))
    }
  }

  // Handler de suppression complète
  const handleRemove = productId => {
    const entry = cartItems.find(cart=> cart.product.id  === productId)
    const prod  = products[productId]
    if (entry && prod) {
      dispatch(removeFromCart(productId))
      dispatch(updateProduct({
        ...prod,
        stock: prod.stock + entry.quantity
      }))
    }
  }

  const clearCartWithStock = () => (dispatch, getState) => {
  const cartItems = Object.values(getState().cart.items)

  cartItems.forEach(({ product, quantity }) => {
    // récupère le produit courant pour connaître le stock actuel
    const prodInStore = getState().products.items[product.id]
    dispatch(updateProduct({
      id:    product.id,
      stock: prodInStore.stock + quantity
    }))
  })

  // enfin, on vide le panier
  dispatch(clearCart())
}
  return (
    <div className="cart">
  <h2>Panier</h2>

  {cartItems.length === 0 ? (
    <p>Le panier est vide</p>
  ) : (
    <>
      <table className="cart-table">
        <thead>
          <tr>
            <th>Article</th>
            <th>Prix unitaire</th>
            <th>Quantité</th>
            <th>Sous-total</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map(({ product, quantity }) => (
            <tr key={product.id}>
              <td>
                {/* miniature */}
                <div className="article">
                    <div className="thumbnail" />
                    <span className="name">{product.name}</span>
                </div>
              </td>
              <td className="unit-price">{product.price.toFixed(2)} €</td>
              <td className="qty">{quantity}</td>
              <td className="subtotal">
                {(product.price * quantity).toFixed(2)}  €
              </td>
              <td className="actions">
                <button onClick={() => handleRemove(product.id)}>🗑</button>
                <button onClick={() => handleDecrement(product.id)}>–</button>
                <button
                  onClick={() => handleIncrement(product)}
                  disabled={products[product.id].stock === 0}
                >
                  +
                </button>
              </td>
            </tr>
          ))}
        </tbody>

        <tfoot>
          <tr className="total-row">
            <td colSpan="3" />
            <td>Total :</td>
            <td className="total-value">
            <div className='total-value-content'>
                {cartTotal} €
            </div>
            </td>
          </tr>
        </tfoot>
      </table>

      {/*<button className="checkout-btn">Check out</button>*/}
      <button
        className="clear-cart-btn"
        onClick={() => dispatch(clearCartWithStock())}
      >
        Vider le panier
      </button>
    </>
  )}
</div>


  )
}

export default Cart

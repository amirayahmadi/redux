import { createSlice } from '@reduxjs/toolkit'

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [
      // Exemple de panier initial (facultatif)
       { product: { id: 'p1', name: 'Produit A', price: 10 }, quantity: 2 },
       { product: { id: 'p2', name: 'Produit B', price: 20 }, quantity: 1 }

    ]
  },
  reducers: {
    addToCart: (state, action) => {
      const newProd = action.payload
      // Cherche si le produit existe déjà dans le tableau
      const existing = state.items.find(item => item.product.id === newProd.id)
      if (existing) {
        // Incrémente la quantité
        existing.quantity += 1
      } else {
        // Ajoute un nouvel objet dans le tableau
        state.items.push({ product: newProd, quantity: 1 })
      }
    },
    decrementQuantity: (state, action) => {
      const id = action.payload
      const existing = state.items.find(item => item.product.id === id)
      if (!existing) return
      if (existing.quantity > 1) {
        existing.quantity -= 1
      } else {
        // Retire l’objet du tableau quand quantity tombe à 0
        state.items = state.items.filter(item => item.product.id !== id)
      }
    },
    removeFromCart: (state, action) => {
      const id = action.payload
      // On recrée un nouveau tableau SANS l’article à supprimer
      state.items = state.items.filter(item => item.product.id !== id)
    },
    
    clearCart: state => {
      state.items = {}
    }
  }
})

export const {  addToCart, decrementQuantity, removeFromCart, clearCart} = cartSlice.actions
export default cartSlice.reducer

import { createSlice } from '@reduxjs/toolkit'

const productSlice = createSlice({
  name: 'products',
  initialState: {
    // Exemple de produits initiaux
    items: {
      'p1': { id: 'p1', name: 'Produit A', description: 'Description de Produit A', price: 10  , stock : 5},
      'p2': { id: 'p2', name: 'Produit B', description: 'Description de Produit B', price: 20 , stock : 8},
      'p3': { id: 'p3', name: 'Produit C', description: 'Description de Produit C', price: 30 , stock : 11}

    }
  },
  reducers: {
    addProduct: (state, action) => {
      const product = action.payload
      state.items[product.id] = product
    },
    updateProduct: (state, action) => {
      const product = action.payload
      if (state.items[product.id]) {
        state.items[product.id] = { ...state.items[product.id], ...product }
      }
    },
    removeProduct: (state, action) => {
      const id = action.payload
      delete state.items[id]
    },
    clearProducts: (state) => {
      state.items = {}
    }
  }
})

export const { addProduct, updateProduct, removeProduct, clearProducts } = productSlice.actions
export default productSlice.reducer

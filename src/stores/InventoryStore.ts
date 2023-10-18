import { ref, onMounted } from 'vue'
import { defineStore } from 'pinia'
import { save, removeProduct, getAll } from '../service/InventoryService'

export const useInventoryStore = defineStore('inventoryStore', () => {
  const allProducts = ref()

  onMounted(async()=>{    
    await getAllProducts()
  })

  const saveProductDetails = async(product) => {   
    const response = save(product)
    await getAllProducts()

    console.log('________________', response);

    return true
  };


  const getAllProducts = async () => {
    allProducts.value = await getAll()
  }
  
  const deleteProduct = async (productId) => {
    return removeProduct(productId)
  }

  return { allProducts, saveProductDetails, getAllProducts, deleteProduct }
})

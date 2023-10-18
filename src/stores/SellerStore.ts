import { ref, onMounted } from 'vue'
import { defineStore } from 'pinia'
import { save, removeSeller, getAll } from '../service/SellerService'

export const useSellerStore = defineStore('sellerStore', () => {
  const allSellers = ref()

  onMounted(async()=>{    
    await getAllSellers()
  })

  const saveSellerDetails = (seller) => {   
    const response = save(seller)
    console.log('________________', response);

    return false
  };


  const getAllSellers = async () => {
    allSellers.value = await getAll()
  }
  
  const deleteSeller = async (sellerId) => {
    return removeSeller(sellerId)
  }

  return { allSellers, saveSellerDetails, getAllSellers, deleteSeller }
})

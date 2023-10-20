import { ref, onMounted } from 'vue'
import { defineStore } from 'pinia'
import { save, removeStock, getAll } from '../service/StockService'

export const useStockStore = defineStore('stockStore', () => {
  const allStocks = ref()

  onMounted(async () => {
    await getAllStocks()
  })

  const saveStockDetails = (stock) => {
    const response = save(stock)
    console.log('________________', response)

    return false
  }

  const getAllStocks = async () => {
    allStocks.value = await getAll()
  }

  const deleteStock = async (stockId) => {
    return removeStock(stockId)
  }

  return { allStocks, saveStockDetails, getAllStocks, deleteStock }
})

import axios from 'axios'

export async function save(stock) {
  try {
    const response = await axios.post('http://localhost:8001/api/stock', stock, {
      headers: {
        'Content-Type': 'application/json'
      }
    })

    console.log('Response:', response.data)
    return response.data
  } catch (error) {
    console.error('Error:', error)
    throw error
  }
}

export async function removeStock(stockId) {
  axios
    .delete(`http://localhost:8001/api/stock/${stockId}`)
    .then((response) => {
      console.log('stock deleted:', response.data)
    })
    .catch((error) => {
      console.error('Error deleting stock:', error)
    })
}

export async function getAll() {
  try {
    const response = await axios.get('http://localhost:8001/api/stock')
    return response.data.data
  } catch (error) {
    console.error('Error:', error)
    throw error
  }
}

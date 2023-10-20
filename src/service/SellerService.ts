import axios from 'axios'

export async function save(seller) {
  try {
    const response = await axios.post('http://localhost:8001/api/seller', seller, {
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

export async function removeSeller(sellerId) {
  axios
    .delete(`http://localhost:8001/api/seller/${sellerId}`)
    .then((response) => {
      console.log('Seller deleted:', response.data)
    })
    .catch((error) => {
      console.error('Error deleting seller:', error)
    })
}

export async function getAll() {
  try {
    const response = await axios.get('http://localhost:8001/api/seller')
    return response.data.data
  } catch (error) {
    console.error('Error:', error)
    throw error
  }
}

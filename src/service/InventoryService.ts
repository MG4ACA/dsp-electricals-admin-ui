import axios from 'axios'

export async function save(product) {
  try {
    const response = await axios.post('http://localhost:8001/api/product', product, {
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

export async function removeProduct(productId) {
  axios
    .delete(`http://localhost:8001/api/product/${productId}`)
    .then((response) => {
      console.log('Product deleted:', response.data)
    })
    .catch((error) => {
      console.error('Error deleting product:', error)
    })
}

export async function getAll() {
  try {
    const response = await axios.get('http://localhost:8001/api/product')
    return response.data.data
  } catch (error) {
    console.error('Error:', error)
    throw error
  }
}

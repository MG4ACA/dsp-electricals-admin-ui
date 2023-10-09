import { ref, onMounted } from 'vue'
import { defineStore } from 'pinia'

export const useLoginStore = defineStore('loginStore', () => {
  const isUserLogged = ref(false)
  const userName = ref()
  const password = ref()

  onMounted(()=>{
    const user = getAllUsers()
    userName.value = user.userName
    password.value = user.password
  })

  const validateUser = (user) => {
    if (user.userName === userName.value && user.password === password.value) {
      isUserLogged.value = true
    }
  }

  const getAllUsers = () => {
    return {userName: 'user', password: '1234'}
  }

  return { isUserLogged, validateUser }
})

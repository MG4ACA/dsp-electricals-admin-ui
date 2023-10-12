import { ref, onMounted } from 'vue'
import { defineStore } from 'pinia'
import { getAllUserss } from '../service/LoginService'

export const useLoginStore = defineStore('loginStore', () => {
  const isUserLogged = ref(false)
  const allUsers = ref([])
  const userName = ref()
  const password = ref()

  onMounted(async()=>{    
    allUsers.value = await getAllUsers()
    console.log('all users', allUsers.value);
  })

  const validateUser = (user) => {    
    isUserLogged.value = allUsers.value.some(obj => {
      return obj.username === user.username && obj.password === user.password;
    });
  };


  const getAllUsers = async () => {
     return getAllUserss()
  }

  return { isUserLogged, validateUser }
})

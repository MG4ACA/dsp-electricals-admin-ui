<template>
  <div class="card login__main-container">
    <!-- <section class="left-section">
      <Image src="/src/assets/images/8011901.jpg" alt="Image-not-found" />
    </section> -->

    <section class="flex flex-column md:flex-row right-section">
      <div class="w-full flex flex-column align-items-center justify-content-center gap-3 py-5">
        <Toast />
        <div>
          <label>LOGIN</label>
        </div>
        <div class="align-items-center gap-2">
          <label>Username</label>
          <InputText v-model="username" id="username" type="text" class="w-full" />
        </div>
        <div class="align-items-center gap-2">
          <label>Password</label>
          <InputText v-model="password" id="password" type="password" class="w-full" />
        </div>
        <Button label="Login" icon="pi pi-user" class="w-10rem" @click="validateUserLogin"></Button>
      </div>
    </section>
  </div>
</template>

<script setup>
import Image from 'primevue/image';
import { ref } from 'vue'
import {useLoginStore} from '../stores/login'
import { useToast } from "primevue/usetoast";


const toast = useToast();
const loginStore = useLoginStore()
const username = ref('')
const password = ref('')

const validateUserLogin = () => {
  const user = {'username': username.value, 'password': password.value}
  loginStore.validateUser(user)

  if (loginStore.isUserLogged) {
    console.log('log___________', loginStore.isUserLogged);
  } else {
    toast.add({ severity: 'error', summary: 'Wrong credentials', detail: 'Username Password does not match..!', life: 3000 });
  }
  clearInputFields()
}

const clearInputFields = () => {
  username.value = null
  password.value = null
}


</script>

<style lang="scss" scoped>
.login__main-container {
  display: flex;
  width: 400px;

  .right-section{
    box-shadow: rgba(17, 17, 26, 0.1) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 48px;
    width: 100%;
  }
}
</style>

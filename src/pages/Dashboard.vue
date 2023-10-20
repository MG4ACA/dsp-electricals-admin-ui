<template>
  <main class="dashboard-main-container">
    <section class="dashboard-header-container">
      <div class="dashboard-header-image-section h-full">
        <img src="../assets/images/logo.png" alt="logo" class="image-container" />
      </div>
    </section>
    <section class="dashboard-container flex">
      <section class="dashboard-sidebar-container">
        <div class="dashboard-sidebar-container-inner">
          <div
            v-for="(router, index) in routerArray"
            :key="index"
            class="dashboard-sidebar-container-router"
            :class="{ 'click-effect': indexNumber === index }"
            @click="setSubComponent(router.name, index)"
          >
            {{ router.name }}
          </div>
        </div>
        <div class="dashboard-sidebar-container-footer" @click="signOut">
          <div class="dashboard-sidebar-container-logout">
            LOGOUT <i class="pi pi-sign-out ml-4"></i>
          </div>
        </div>
      </section>
      <section class="dashboard-content-container">
        <section v-if="subComponentName === 'DASHBOARD'" class="dashboard-component-container">
          <div>this is dashboard</div>
        </section>
        <Inventory v-if="subComponentName === 'INVENTORY'"> </Inventory>
        <Order v-if="subComponentName === 'ORDER'"> </Order>
        <Invoices v-if="subComponentName === 'INVOICES'"></Invoices>
        <Reports v-if="subComponentName === 'REPORTS'"></Reports>
        <Stock v-if="subComponentName === 'STOCK'"></Stock>
        <Seller v-if="subComponentName === 'SUPPLIER'"></Seller>
      </section>
    </section>
  </main>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import Inventory from './Inventory.vue'
import Invoices from './Invoices.vue'
import Order from './Order.vue'
import Reports from './Reports.vue'
import Stock from './Stock.vue'
import Seller from './Seller.vue'

const routerArray = ref([])
const subComponentName = ref('ORDER')
const indexNumber = ref(1)

onMounted(() => {
  loadRouterArray()
})

const loadRouterArray = () => {
  routerArray.value = [
    { name: 'DASHBOARD' },
    { name: 'ORDER' },
    { name: 'INVENTORY' },
    { name: 'INVOICES' },
    { name: 'REPORTS' },
    { name: 'STOCK' },
    { name: 'SUPPLIER' }
  ]
}

const setSubComponent = (event, index) => {
  subComponentName.value = event
  indexNumber.value = index
}

const signOut = () => {}
</script>

<style lang="scss">
.dashboard-main-container {
  width: 100vw;
  height: 100vh;

  .dashboard-header-container {
    background: #444444;
    height: 11%;

    .dashboard-header-image-section {
      img {
        height: 70%;
        margin-top: 7px;
        margin-left: 25px;
      }
    }
  }

  .dashboard-container {
    height: 89%;
    background: #444444;

    .dashboard-content-container {
      background: rgb(123, 143, 208);
      width: 79.5%;
      height: 99%;
      border-radius: 5px;
    }

    .dashboard-sidebar-container {
      width: 20%;
      position: relative;

      .dashboard-sidebar-container-inner {
        margin: 1rem;
      }

      .dashboard-sidebar-container-router {
        color: white;
        font-weight: 700;
        padding: 0.25rem 0.5rem;
      }

      .dashboard-sidebar-container-router:hover {
        background: rgba(10, 243, 239, 0.5);
        cursor: pointer;
        border-radius: 5px;
      }
    }

    .dashboard-sidebar-container-footer {
      position: absolute;
      bottom: 0;
    }

    .dashboard-sidebar-container-logout {
      color: white;
      font-weight: 700;
      padding: 1.5rem;
    }
  }

  .click-effect {
    background: rgba(0, 209, 205);
    cursor: pointer;
    border-radius: 5px;
  }
}
</style>

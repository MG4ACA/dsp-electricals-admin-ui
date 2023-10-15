<template>
    <main class="dashboard-main-container">
        <section class="dashboard-header-container">hi</section>
        <section class="dashboard-container flex">
            <section class="dashboard-sidebar-container">
                <div class="dashboard-sidebar-container-inner">
                    <div v-for="(router, index) in routerArray" :key="index" class="dashboard-sidebar-container-router"
                        @click="setSubComponent(router.name)">
                        {{ router.name }}
                    </div>

                </div>
                <div class="dashboard-sidebar-container-footer">
                    <div class="dashboard-sidebar-container-router">
                        Hi
                    </div>
                </div>
            </section>
            <section class="dashboard-content-container">
                <section v-if="subComponentName === 'Dashboard'" class="dashboard-component-container">
                    <div>this is dashboard</div>
                </section>
                <inventory v-if="subComponentName === 'Inventory'">
                </inventory>
                <Order v-if="subComponentName === 'Order'">

                </Order>
                <invoices v-if="subComponentName === 'Invoices'"></invoices>
                <reports v-if="subComponentName === 'Reports'"></reports>
                <stock v-if="subComponentName === 'Stock'"></stock>
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

const routerArray=ref([])
const subComponentName=ref('Inventory')

onMounted(() => {
    loadRouterArray()
})

const loadRouterArray=() => {
    routerArray.value=[{ name: "Dashboard" }, { name: "Order" }, { name: "Inventory" }, { name: "Invoices" }, { name: "Reports" }, { name: "Stock" }]
}
const setSubComponent=(event) => {
    console.log('event log ________', event);
    subComponentName.value=event
    // switch (event) {
    //     case event === 'Dashboard':
    //     subComponentName.value = event
    //         break;
    //     case event === '':

    //         break;
    //     case event === '':

    //         break;
    //     case event === '':

    //         break;

    //     default:
    //         break;
    // }
}

</script>

<style lang="scss">
.dashboard-main-container {
    width: 100vw;
    height: 100vh;

    .dashboard-header-container {
        background: bisque;
        height: 15%;
    }

    .dashboard-container {
        height: 85%;

        .dashboard-content-container {
            background: rgb(123, 143, 208);
            width: 80%;
        }

        .dashboard-sidebar-container {
            background: rgb(164, 238, 79);
            width: 20%;

            .dashboard-sidebar-container-inner {
                margin: 1rem;
            }

            .dashboard-sidebar-container-router {
                padding: 0.25rem 0.5rem;

            }

            .dashboard-sidebar-container-router:hover {
                background: rgb(205, 205, 200);
                cursor: pointer;

            }


        }
    }


}
</style>

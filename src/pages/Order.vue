<template>
  <section class="inventory-content-container">
      <div class="card inventory-content-tabview-comp">
          <TabView>
              <TabPanel header="Manage">
                  <div class="inventory-content-manage-div">
                      <div class="formgrid grid">
                          <div class="field col-12 md:col-12">
                              <label for="searchProduct">Search Product</label>
                              <div class="card flex">
                                  <AutoComplete v-model="selectedProduct" optionLabel="name"
                                      :suggestions="filteredProduct" @complete="onSearch" @item-select="onSelectedProduct"
                                      style="width: 50%" />
                              </div>
                          </div>
                          <div class="field col-12 md:col-5">
                              <label for="productCode">Product Code</label>
                              <input id="productCode" type="text" v-model="productCode"
                                  class="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full">
                          </div>
                          <div class="field col-12 md:col-7">
                              <label for="productName">Product Name</label>
                              <input id="productName" type="text" v-model="productName"
                                  class="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full">
                          </div>
                          <div class="field col-12">
                              <label for="description">Description</label>
                              <textarea id="description" type="text" rows="4" v-model="description"
                                  class="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"></textarea>
                          </div>
                          <div class="form-button-set">
                              <Button :label="isUpdateProduct ? 'Update' : 'Submit'" @click="saveProductDetails" />
                              <Button label="Clear" @click="clearFields" />
                          </div>
                      </div>
                  </div>
              </TabPanel>
              <TabPanel header="Inventory">
                  <DataTable :value="products" paginator :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]"
                      tableStyle="min-width: 50rem">
                      <Column field="code" header="Code" style="width: 15%"></Column>
                      <Column field="name" header="Name" style="width: 25%"></Column>
                      <Column field="description" header="Description" style="width: 30%"></Column>
                      <Column field="createdDate" header="Created Date" style="width: 15%"></Column>
                      <Column field="createdDate" header="Created Date" style="width: 15%">
                          <template #body="{ data }">
                              <Button type="button" icon="pi pi-trash" @click="deleteProduct(data._id)" />
                          </template>
                      </Column>
                  </DataTable>
              </TabPanel>
          </TabView>
      </div>

  </section>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useInventoryStore } from '../stores/InventoryStore'
import { useToast } from "primevue/usetoast"
import { TOAST_MESSAGES } from '../utils/const'

const toast = useToast();
const inventoryStore=useInventoryStore()
const filteredProduct=ref()
const selectedProduct=ref();
const productName=ref();
const productCode=ref();
const description=ref();
const isUpdateProduct=ref(false);
const currentDate = ref(new Date());
const products = ref()
//  const products=ref([{
//     id: 1000,
//     code: 'HMD-001',
//     name: 'Bosch Hammer Drill',
//     description: 'Sample description',


// }, {
//     id: 2000,
//     code: 'SDS-002',
//     name: ' Stanley Screwdriver Set',
//     description: 'Sample description',

// }, {
//     id: 3000,
//     code: 'DDS-002',
//     name: ' Dewalt Screwdriver Set',
//     description: 'Sample description',

// },])


onMounted(async()=>{    
  await inventoryStore.getAllProducts()
  products.value  = await inventoryStore.allProducts
  console.log('producs', products.value);
})


const saveProductDetails=() => {
  const product={
      code: productCode.value,
      name: productName.value,
      description: description.value,
      addedDate: getFormattedDate(currentDate.value),
      state: true
  }

  const res = inventoryStore.saveProductDetails(product)
  console.log('01______________', res);

  if (res) {
      toast.add({ severity: 'success', summary: TOAST_MESSAGES.SUCCESS.TITLE, detail: 'Product saved successfully', life: 3000 });
  } else {
      toast.add({ severity: 'error', summary: TOAST_MESSAGES.ERROR.TITLE, detail: TOAST_MESSAGES.ERROR.DETAIL, life: 3000 });
  }
}

const getFormattedDate = (date) => {
const year = date.getFullYear();
const month = String(date.getMonth() + 1).padStart(2, '0');
const day = String(date.getDate()).padStart(2, '0');
return `${year}-${month}-${day}`;
};

const onSearch=(event) => {
  setTimeout(() => {
      if(!event.query.trim().length) {
          filteredProduct.value=[...filteredProduct.value];
      } else {
          filteredProduct.value=products.value.filter((product) => {
              return product.name.toLowerCase().includes(event.query.toLowerCase());
          });
      }
  }, 250);
}

const deleteProduct= async(productId) => {
  await inventoryStore.deleteProduct(productId)
}

const onSelectedProduct=() => {
  productCode.value=selectedProduct.value.code
  productName.value=selectedProduct.value.name
  description.value=selectedProduct.value.description
  isUpdateProduct.value=true
}

const clearFields=() => {
  productCode.value=''
  productName.value=''
  description.value=''
  selectedProduct.value=''
  isUpdateProduct.value=false
}
</script>

<style lang="scss">
.inventory-content-container {
  .p-highlight {
      border: 0;
  }

  .inventory-content-tabview-comp {
      .inventory-content-manage-div {
          padding: 1rem 2rem;
      }

      .p-autocomplete-input {
          width: 100%;
      }

      .p-tabview-panels {
          height: 77vh;
      }

      .form-button-set {
          .p-button {
              margin-right: 1rem;
          }
      }


  }

}
</style>
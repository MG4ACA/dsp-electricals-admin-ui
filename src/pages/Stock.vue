<template>
  <section class="stock-content-container">
    <div class="card stock-content-tabview-comp">
      <TabView>
        <TabPanel header="Manage">
          <div class="stock-content-manage-div">
            <div class="formgrid grid">
              <div class="field col-12 md:col-12 mb-6">
                <label for="searchStock">Search Stock</label>
                <div class="card flex">
                  <AutoComplete
                    v-model="selectedStock"
                    optionLabel="name"
                    :suggestions="filteredStock"
                    @complete="onSearch"
                    @item-select="onSelectedStock"
                    style="width: 50%"
                  />
                </div>
              </div>
              <div class="field col-12 md:col-6">
                <label for="stockCode">Company Name</label>
                <AutoComplete
                  v-model="selectedCompany"
                  optionLabel="company"
                  class="text-base text-color w-full"
                  :suggestions="filteredSellers"
                  @complete="onSearchSellers"
                  @item-select="onSelectedCompany"
                >
                  <template #option="slotProps">
                    <div class="flex align-options-center">
                      <div>{{ slotProps.option.company }}</div>
                      &nbsp;-&nbsp;
                      <div>{{ slotProps.option.name }}</div>
                    </div>
                  </template>
                </AutoComplete>
              </div>
              <div class="field col-12 md:col-6">
                <label for="stockCode">Product Name</label>
                <AutoComplete
                  v-model="selectedProduct"
                  optionLabel="name"
                  class="text-base text-color w-full"
                  :suggestions="filteredProducts"
                  @complete="onSearchProducts"
                  @item-select="onSelectedProduct"
                >
                  <template #option="slotProps">
                    <div class="flex align-options-center">
                      <div>{{ slotProps.option.code }}</div>
                      &nbsp;-&nbsp;
                      <div>{{ slotProps.option.name }}</div>
                    </div>
                  </template>
                </AutoComplete>
              </div>
              <div class="formgrid grid col-12">
                <div class="field col-12 md:col-4">
                  <div class="field">
                    <label for="companyName">Buying Price</label>
                    <input
                      id="companyName"
                      type="text"
                      v-model="buyingPrice"
                      class="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"
                    />
                  </div>
                  <div class="field">
                    <label for="companyName">Quantity</label>
                    <input
                      id="companyName"
                      type="text"
                      v-model="quantity"
                      class="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"
                    />
                  </div>
                </div>
                <div class="field col-12 md:col-8">
                  <label for="description">Description</label>
                  <textarea
                    id="description"
                    type="text"
                    rows="5"
                    v-model="description"
                    class="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"
                  ></textarea>
                </div>
              </div>
              <div class="form-button-set">
                <Button
                  class="btn-success"
                  :label="isUpdateStock ? 'Update' : 'Save'"
                  @click="saveStockDetails"
                />
                <Button class="btn-cancel" label="Clear" @click="clearFields" />
              </div>
            </div>
          </div>
        </TabPanel>
        <TabPanel header="Inventory">
          <DataTable
            :value="stocks"
            paginator
            :rows="5"
            :rowsPerPageOptions="[5, 10, 20, 50]"
            tableStyle="min-width: 50rem"
          >
            <Column field="companyName" header="Company Name" style="width: 20%"></Column>
            <Column field="productName" header="Product Name" style="width: 20%"></Column>
            <Column field="qty" header="Quantity" style="width: 10%"></Column>
            <Column field="price" header="Buying Price" style="width: 10%"></Column>
            <Column field="description" header="Description" style="width: 25%"></Column>
            <Column field="addedDate" header="Created Date" style="width: 15%"></Column>
            <Column style="width: 15%">
              <template #body="{ data }">
                <Button type="button" icon="pi pi-trash" @click="deleteStock(data._id)" />
              </template>
            </Column>
          </DataTable>
        </TabPanel>
      </TabView>
    </div>
  </section>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useInventoryStore } from '../stores/InventoryStore'
import { useStockStore } from '../stores/StockStore'
import { useToast } from 'primevue/usetoast'
import { useSellerStore } from '../stores/SellerStore'
import { TOAST_MESSAGES } from '../utils/const'

const toast = useToast()

const inventoryStore = useInventoryStore()
const stockStore = useStockStore()
const sellerStore = useSellerStore()

const filteredStock = ref()
const filteredSellers = ref()
const filteredProducts = ref()
const selectedStock = ref()
const selectedProduct = ref()
const selectedCompany = ref()
const stockName = ref()
const stockCode = ref()
const buyingPrice = ref()
const quantity = ref()
const description = ref()
const isUpdateStock = ref(false)
const currentDate = ref(new Date())
const stocks = ref()
const sellers = ref()
const products = ref()

onMounted(async () => {
  await inventoryStore.getAllProducts()
  await sellerStore.getAllSellers()
  await stockStore.getAllStocks()

  products.value = await inventoryStore.allProducts
  sellers.value = await sellerStore.allSellers
  stocks.value = await stockStore.allStocks

  console.log('_____________', products.value, sellers.value)
})

const saveStockDetails = () => {
  const stock = {
    companyId: selectedCompany.value._id,
    companyName: selectedCompany.value.company,
    productId: selectedProduct.value._id,
    productName: selectedProduct.value.name,
    price: buyingPrice.value,
    qty: quantity.value,
    description: description.value,
    addedDate: getFormattedDate(currentDate.value),
    state: true
  }
  console.log('01______________', stock)

  const res = stockStore.saveStockDetails(stock)

  if (res) {
    toast.add({
      severity: 'success',
      summary: TOAST_MESSAGES.SUCCESS.TITLE,
      detail: 'Stock saved successfully',
      life: 3000
    })
  } else {
    toast.add({
      severity: 'error',
      summary: TOAST_MESSAGES.ERROR.TITLE,
      detail: TOAST_MESSAGES.ERROR.DETAIL,
      life: 3000
    })
  }
}

const getFormattedDate = (date) => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

const onSearch = (event) => {
  console.log('stock', event)

  setTimeout(() => {
    if (!event.query.trim().length) {
      filteredStock.value = [...filteredStock.value]
    } else {
      filteredStock.value = stocks.value.filter((stock) => {
        return stock.name.toLowerCase().includes(event.query.toLowerCase())
      })
    }
  }, 250)
}

const onSearchProducts = (event) => {
  setTimeout(() => {
    if (!event.query.trim().length) {
      filteredProducts.value = [...filteredProducts.value]
    } else {
      filteredProducts.value = products.value.filter((product) => {
        return product.name.toLowerCase().includes(event.query.toLowerCase())
      })
    }
  }, 250)
}

const onSearchSellers = (event) => {
  setTimeout(() => {
    if (!event.query.trim().length) {
      filteredSellers.value = [...filteredSellers.value]
    } else {
      filteredSellers.value = sellers.value.filter((seller) => {
        return seller.company.toLowerCase().includes(event.query.toLowerCase())
      })
    }
  }, 250)
}

const deleteStock = async (stockId) => {
  await stockStore.deleteStock(stockId)
}

const onSelectedStock = () => {
  stockCode.value = selectedStock.value.code
  stockName.value = selectedStock.value.name
  description.value = selectedStock.value.description
  isUpdateStock.value = true
}

const onSelectedCompany = () => {
  console.log('company ___________', selectedCompany.value._id)
}

const onSelectedProduct = () => {}

const clearFields = () => {
  stockCode.value = ''
  stockName.value = ''
  description.value = ''
  selectedStock.value = ''
  isUpdateStock.value = false
}
</script>

<style lang="scss">
.stock-content-container {
  .p-highlight {
    border: 0;
  }

  .stock-content-tabview-comp {
    .stock-content-manage-div {
      padding: 1rem 2rem;
    }

    .p-autocomplete-input {
      width: 100%;
    }

    .p-tabview-panels {
      height: 80.5vh;
    }

    .form-button-set {
      .p-button {
        margin-right: 1rem;
      }
    }

    .formgrid label,
    .p-column-title {
      font-weight: 700;
    }
  }
}
</style>

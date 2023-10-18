<template>
    <section class="inventory-content-container">
        <div class="card inventory-content-tabview-comp">
            <TabView>
                <TabPanel header="Manage">
                    <div class="inventory-content-manage-div">
                        <div class="formgrid">
                            <div class="filed-set-container flex">
                                <div class="filed-set-container-inner flexcol-12 md:col-6">
                                    <Fieldset :toggleable="true" class="w-full grid">
                                        <template #legend>
                                            <div class="flex align-items-center primary-text-color">
                                                <span class="pi pi-user mr-2"></span>
                                                <span class="font-bold text-lg">Product Details</span>
                                            </div>
                                        </template>
                                        <div class="formgrid grid">
                                            <div class="field col-12 md:col-10">
                                                <label for="searchProduct">Search Product</label>
                                                <div class="card flex">
                                                    <AutoComplete v-model="selectedProduct" optionLabel="name"
                                                        :suggestions="filteredProduct" @complete="onSearch"
                                                        @item-select="onSelectedProduct" style="width: 100%" />
                                                </div>
                                            </div>
                                            <div class="field col-12 md:col-4">
                                                <label for="productCode">Product Code</label>
                                                <div class="p-chip">{{selectedProduct?.code}}</div>
                                            </div>
                                            <div class="field col-12 md:col-4">
                                                <label for="productName">Available Quantity</label>
                                                <div class="p-chip">{{selectedProduct?.code}}</div>
                                            </div>
                                            <div class="field col-12 md:col-4">
                                                <label for="productName">Unit Price</label>
                                                <div class="p-chip"> Rs 550.45 </div>
                                            </div>
                                        </div>
                                    </Fieldset>
                                </div>
                                <div class="filed-set-container-inner flex col-12 md:col-6">
                                    <Fieldset :toggleable="true" class="w-full grid">
                                        <template #legend>
                                            <div class="flex align-items-center primary-text-color">
                                                <span class="pi pi-user mr-2"></span>
                                                <span class="font-bold text-lg">Order Details</span>
                                            </div>
                                        </template>
                                        <div class="formgrid grid">
                                            <div class="field col-12 md:col-5">
                                                <label for="searchProduct">Product Price</label>
                                                <div class="card flex">
                                                    <AutoComplete v-model="selectedProduct" optionLabel="name"
                                                        :suggestions="filteredProduct" @complete="onSearch"
                                                        @item-select="onSelectedProduct" style="width: 100%" />
                                                </div>
                                            </div>
                                            <div class="field col-12 md:col-5">
                                                <label for="searchProduct">Product Quantity</label>
                                                <div class="card flex">
                                                    <AutoComplete v-model="selectedProduct" optionLabel="name"
                                                        :suggestions="filteredProduct" @complete="onSearch"
                                                        @item-select="onSelectedProduct" style="width: 100%" />
                                                </div>
                                            </div>
                                            <div class="field col-12 md:col-4">
                                                <label for="productName">Total Price</label>
                                                <div class="p-chip"> Rs 550.45 </div>
                                            </div>
                                        </div>
                                    </Fieldset>
                                </div>
                            </div>
                            <div class="form-button-set">
                                <Button class="btn-success" :label="isUpdateProduct ? 'Update' : 'ADD TO TABLE'" @click="saveProductDetails" />
                                <Button class="btn-cancel" label="CLEAR" @click="clearFields" />
                            </div>
                        </div>
                        <Divider align="center" type="solid">
                            <b>Added Products</b>
                        </Divider>
                        <div class="formgrid order-table-container">
                            <DataTable :value="products" scrollable scrollHeight="200px" tableStyle="min-width: 50rem">
                                <Column field="code" header="Code" style="width: 15%"></Column>
                                <Column field="name" header="Name" style="width: 25%"></Column>
                                <Column field="description" header="Description" style="width: 30%"></Column>
                                <Column field="createdDate" header="Created Date" style="width: 15%"></Column>
                                <Column field="createdDate" header="Created Date" style="width: 15%">
                                    <template #body="{ data }">
                                        <Button type="button" class="table-button" icon="pi pi-trash"
                                            @click="deleteProduct(data._id)" />
                                    </template>
                                </Column>
                            </DataTable>
                            <div class="submit-order-button-class mt-3">
                                <Button class="btn-success" :label="isUpdateProduct ? 'Update' : 'PLACE ORDER'" @click="saveProductDetails" />
                                <Button class="btn-cancel" label="CLEAR" @click="clearFields" />
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

const toast=useToast();
const inventoryStore=useInventoryStore()
const filteredProduct=ref()
const selectedProduct=ref();
const productName=ref();
const productCode=ref();
const description=ref();
const isUpdateProduct=ref(false);
const currentDate=ref(new Date());
const products=ref()


onMounted(async () => {
    await inventoryStore.getAllProducts()
    products.value=await inventoryStore.allProducts
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

    const res=inventoryStore.saveProductDetails(product)
    console.log('01______________', res);

    if(res) {
        toast.add({ severity: 'success', summary: TOAST_MESSAGES.SUCCESS.TITLE, detail: 'Product saved successfully', life: 3000 });
    } else {
        toast.add({ severity: 'error', summary: TOAST_MESSAGES.ERROR.TITLE, detail: TOAST_MESSAGES.ERROR.DETAIL, life: 3000 });
    }
}

const getFormattedDate=(date) => {
    const year=date.getFullYear();
    const month=String(date.getMonth()+1).padStart(2, '0');
    const day=String(date.getDate()).padStart(2, '0');
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

const deleteProduct=async (productId) => {
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
            padding: 0;
        }

        .p-autocomplete-input {
            width: 100%;
        }

        .p-tabview-panels {
            height: 80.5vh;
        }


    }

    .p-fieldset-legend a {
        padding: 0 0.5rem !important;
    }

    .filed-set-container-inner {
        margin-right: 1rem;
        margin-bottom: 0.5rem;
    }

    .p-fieldset-content {
        padding: 1rem 0 0 0;
    }

    .p-chip {
        border-radius: 5px;
        width: fit-content;
    }

    .order-table-container {
        .p-datatable .p-datatable-tbody>tr>td {
            padding: 0rem 1rem;
        }
    }

    .p-button {
        margin-right: 1rem;
    }

    .table-button {
        background: #ffffff;
        border: 0;
        padding: 0.75rem 1.25rem; 
        color: blue;
    }
    .table-button:hover {
        background: #ffffff;
        border: 0;
        padding: 0.75rem 1.25rem; 
        color: blue;
    }

    .table-button::before,table-button::after {
        background: #ffffff;
        border: 0;
        padding: 0.75rem 1.25rem; 
        color: blue;
    }

    .submit-order-button-class, .form-button-set{
        display: flex;
    justify-content: flex-end;
    }

    .p-divider-horizontal{
        margin: 0 0.75rem 0 0;
    }
    
}
</style>
<template>
    <section class="seller-content-container">
        <div class="card seller-content-tabview-comp">
            <TabView>
                <TabPanel header="Manage">
                    <div class="seller-content-manage-div">
                        <div class="formgrid grid">
                            <div class="field col-12 md:col-12 mb-6">
                                <label for="searchSeller">Search Seller</label>
                                <div class="card flex">
                                    <AutoComplete v-model="selectedSeller" optionLabel="name"
                                        :suggestions="filteredSeller" @complete="onSearch" @item-select="onSelectedSeller"
                                        style="width: 50%" />
                                </div>
                            </div>
                            <div class="field col-12 md:col-5">
                                <label for="companyName">Company Name</label>
                                <input id="companyName" type="text" v-model="companyName"
                                    class="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full">
                            </div>
                            <div class="field col-12 md:col-7">
                                <label for="sellerName">Seller Name</label>
                                <input id="sellerName" type="text" v-model="sellerName"
                                    class="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full">
                            </div>
                            <div class="field col-12 md:col-5">
                                <label for="address">Address</label>
                                <input id="address" type="text" v-model="address"
                                    class="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full">
                            </div>
                            <div class="field col-12 md:col-7">
                                <label for="contact">Contact Number</label>
                                <input id="contact" type="text" v-model="contact"
                                    class="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full">
                            </div>
                            <div class="field col-12">
                                <label for="description">Description</label>
                                <textarea id="description" type="text" rows="4" v-model="description"
                                    class="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"></textarea>
                            </div>
                            <div class="form-button-set">
                                <Button :label="isUpdateSeller ? 'Update' : 'Save'" @click="saveSellerDetails" />
                                <Button label="Clear" @click="clearFields" />
                            </div>
                        </div>
                    </div>
                </TabPanel>
                <TabPanel header="Seller">
                    <DataTable :value="sellers" paginator :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]"
                        tableStyle="min-width: 50rem">
                        <Column field="company" header="Company Name" style="width: 15%"></Column>
                        <Column field="name" header="Seller Name" style="width: 15%"></Column>
                        <Column field="address" header="Address" style="width: 15%"></Column>
                        <Column field="contact" header="Contact" style="width: 10%"></Column>
                        <Column field="description" header="Description" style="width: 25%"></Column>
                        <Column field="addedDate" header="Created Date" style="width: 15%"></Column>
                        <Column style="width: 15%">
                            <template #body="{ data }">
                                <Button type="button" icon="pi pi-trash" @click="deleteSeller(data._id)" />
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
import { useSellerStore } from '../stores/SellerStore'
import { useToast } from "primevue/usetoast"
import { TOAST_MESSAGES } from '../utils/const'

const toast = useToast();
const sellerStore=useSellerStore()
const filteredSeller=ref()
const selectedSeller=ref();
const sellerName=ref();
const companyName=ref();
const contact=ref();
const address=ref();
const description=ref();
const isUpdateSeller=ref(false);
const currentDate = ref(new Date());
const sellers = ref()

onMounted(async()=>{    
    await sellerStore.getAllSellers()
    sellers.value  = await sellerStore.allSellers
    console.log('sellers', sellers.value);
  })


const saveSellerDetails=() => {
    const seller={
        company: companyName.value,
        name: sellerName.value,
        address: address.value,
        contact: contact.value,
        description: description.value,
        addedDate: getFormattedDate(currentDate.value),
        state: true
    }

    const res = sellerStore.saveSellerDetails(seller)
    console.log('01______________', res);

    if (res) {
        toast.add({ severity: 'success', summary: TOAST_MESSAGES.SUCCESS.TITLE, detail: 'Seller saved successfully', life: 3000 });
    } else {
        toast.add({ severity: 'error', summary: TOAST_MESSAGES.ERROR.TITLE, detail: TOAST_MESSAGES.ERROR.DETAIL, life: 3000 });
    }
    sellerStore.getAllSellers()
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
            filteredSeller.value=[...filteredSeller.value];
        } else {
            filteredSeller.value=sellers.value.filter((seller) => {
                return seller.name.toLowerCase().includes(event.query.toLowerCase());
            });
        }
    }, 250);
}

const deleteSeller= async(sellerId) => {
    await sellerStore.deleteSeller(sellerId)
}

const onSelectedSeller=() => {
    companyName.value=selectedSeller.value.company
    sellerName.value=selectedSeller.value.name
    address.value=selectedSeller.value.address
    contact.value=selectedSeller.value.contact
    description.value=selectedSeller.value.description
    isUpdateSeller.value=true
}

const clearFields=() => {
    companyName.value=''
    sellerName.value=''
    description.value=''
    address.value=''
    contact.value=''
    selectedSeller.value=''
    isUpdateSeller.value=false
}
</script>

<style lang="scss">
.seller-content-container {
    .p-highlight {
        border: 0;
    }

    .seller-content-tabview-comp {
        .seller-content-manage-div {
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

        .formgrid label, .p-column-title{
            font-weight: 700;
        }
    }

}</style>
<template>
  <div class="invoice-form">
    <div class="go-back">
      <router-link to="#" @click="goBack">
        <img src="../assets/icon-arrow-left.svg" alt="arrow-left" class="go-back-image" />
        Go Back
      </router-link>
    </div>
    <h1>{{ editing ? 'Edit Invoice' : 'New Invoice' }}</h1>
    <h3 v-if="editing" id="header-id">{{ route.params.id }}</h3>
    <form @submit.prevent="submitForm">
      <h2>Bill From</h2>
      <div class="bill-from">
        <label for="bill-from-street" id="bill-from-street-label">Street Address</label>
        <input v-model="invoice.senderAddress.street" type="text" id="bill-from-street" required />
        <label for="bill-from-country" id="bill-from-country-label">Country</label>
        <input
          v-model="invoice.senderAddress.country"
          type="text"
          id="bill-from-country"
          required
        />
        <label for="bill-from-city" id="bill-from-city-label">City</label>
        <input v-model="invoice.senderAddress.city" type="text" id="bill-from-city" required />
        <label for="bill-from-post-code" id="bill-from-post-code-label">Post Code</label>
        <input
          v-model="invoice.senderAddress.postCode"
          type="text"
          id="bill-from-post-code"
          required
        />
      </div>
      <h2>Bill To</h2>
      <div class="bill-to">
        <label for="bill-to-name" id="bill-to-name-label">Client's Name</label>
        <input v-model="invoice.clientName" type="text" id="bill-to-name" required />
        <label for="bill-to-email" id="bill-to-email-label">Client's Email</label>
        <input v-model="invoice.clientEmail" type="email" id="bill-to-email" required />
        <label for="bill-to-address" id="bill-to-address-label">Street Address</label>
        <input v-model="invoice.clientAddress.street" type="text" id="bill-to-address" required />
        <label for="bill-to-country" id="bill-to-country-label">Country</label>
        <input v-model="invoice.clientAddress.country" type="text" id="bill-to-country" required />
        <label for="bill-to-city" id="bill-to-city-label">City</label>
        <input v-model="invoice.clientAddress.city" type="text" id="bill-to-city" required />
        <label for="bill-to-post-code" id="bill-to-post-code-label">Post Code</label>
        <input
          v-model="invoice.clientAddress.postCode"
          type="text"
          id="bill-to-post-code"
          required
        />

        <label for="due-date" id="due-date-label">Payment Due Date</label>
        <input
          v-model="invoice.paymentDue"
          type="date"
          id="due-date"
          :min="formatDate(new Date())"
          required
        />

        <label for="invoice-details" id="invoice-details-label">Invoice Description</label>
        <input v-model="invoice.description" type="text" id="invoice-details" required />
      </div>
      <h2>Items</h2>
      <div class="items-form">
        <div class="item-labels" v-if="invoice.items.length > 0">
          <p id="item-name-label">Item Name</p>
          <p id="item-quantity-label">Qty.</p>
          <p id="item-price-label">Price</p>
          <p id="item-total-price-label">Total Price</p>
        </div>
        <div v-for="(item, index) in invoice.items" :key="index">
          <div class="item-row">
            <input v-model="item.name" type="text" :id="'item-name-' + index" required />
            <input
              v-model="item.quantity"
              type="number"
              min="1"
              :id="'item-quantity-' + index"
              @input="calculateTotal(index)"
              required
            />
            <input
              v-model="item.price"
              type="number"
              min="0.01"
              step="0.01"
              :id="'item-price-' + index"
              @input="calculateTotal(index)"
              required
            />
            <input v-model="item.total" type="number" :id="'item-total-price-' + index" readonly />
            <span id="remove-button" @click="removeItem(index)">
              <img id="remove-button-icon" src="@/assets/icon-delete.svg" alt="Delete Icon" />
            </span>
          </div>
        </div>
        <button @click="addItem" type="button" class="add-new-item-buttom" id="add-item-button">
          + Add New Item
        </button>
      </div>
      <div class="buttons-form">
        <button class="light-black button" type="button" @click="goBack">Discard</button>
        <button class="grey button" type="button" @click="saveAsDraft">Save as Draft</button>
        <button class="purple button" type="submit">Save & Send</button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { Invoice, Item } from '@/invoiceInterface'
import { useRouter, useRoute } from 'vue-router'
import type { Router, RouteLocationNormalized } from 'vue-router'

const router: Router = useRouter()
const route: RouteLocationNormalized = useRoute()
const invoices = ref<Invoice[]>([])
const editing: boolean = route.name === 'edit'

const invoice = ref<Invoice>({
  id: '',
  createdAt: '',
  paymentDue: '',
  description: '',
  clientName: '',
  clientEmail: '',
  status: '',
  senderAddress: {
    street: '',
    city: '',
    postCode: '',
    country: ''
  },
  clientAddress: {
    street: '',
    city: '',
    postCode: '',
    country: ''
  },
  items: [],
  total: 0
})

onMounted(() => {
  invoices.value = JSON.parse(localStorage.getItem('invoices') || '[]')

  if (editing) {
    const invoiceId: string | string[] = route.params.id
    const selectedInvoice: Invoice | undefined = invoices.value.find(
      (invoice) => invoice.id === invoiceId
    )
    
    if (selectedInvoice) {
      invoice.value = { ...selectedInvoice }
    } else {
      router.push({ name: 'home' })
    }
  }
})

const calculateTotal = (index: number): void => {
  const item: Item = invoice.value.items[index]
  if (validateNumbers(item)) {
    item.total = parseFloat((item.quantity * item.price).toFixed(2))
  }
}

const validateNumbers = (item: Item): boolean => {
  if (item.price < 0 || item.quantity < 0) {
    item.price = 0
    item.quantity = 0
    return false
  } else {
    return true
  }
}

const saveAsDraft = (): void => {
  if (invoice.value.items.length > 0) {
    checkItems()
  }
  invoice.value.total = calculateInvoiceTotal()
  if (editing) {
    editInvoiceValues()
  } else {
    invoice.value.status = 'draft'
  }
  saveInvoiceToLocalStorage()
}

const submitForm = (): void => {
  if (invoice.value.items.length < 1) {
    addItem()
    return
  }
  invoice.value.status = 'pending'
  invoice.value.total = calculateInvoiceTotal()
  if (editing) {
    editInvoiceValues()
  }
  saveInvoiceToLocalStorage()
}

const checkItems = (): void => {
  let index: number = 0
  invoice.value.items.forEach((item) => {
    if (item.name == '') {
      invoice.value.items.splice(index, 1)
    }
    index++
  })
}

const editInvoiceValues = (): void => {
  const invoiceIndex: number = invoices.value.findIndex((inv) => inv.id === invoice.value.id)
  invoices.value.splice(invoiceIndex, 1, { ...invoice.value })
}

function calculateInvoiceTotal(): number {
  let total: number = 0
  invoice.value.items.forEach((item) => {
    total += item.total
  })
  return total
}
function setInfo(): void {
  invoice.value.id = generateInvoiceId()
  invoice.value.createdAt = formatDate(new Date())
  checkSelectedDate()
}

function generateInvoiceId(): string {
  const lastInvoiceIndex: number = invoices.value.length - 1
  let newInvoiceId: string = ''
  if (lastInvoiceIndex > -1) {
    const lastInvoiceId: number = parseInt(invoices.value[lastInvoiceIndex].id, 10) + 1
    newInvoiceId = lastInvoiceId.toString()
  } else {
    newInvoiceId = '1'
  }

  return newInvoiceId.padStart(4, '0')
}

const checkSelectedDate = (): void => {
  //https://blog.enterprisedna.co/compare-two-dates-in-javascript
  const paymentDate: Date = new Date(invoice.value.paymentDue)
  if (paymentDate.getTime() < new Date().getTime()) {
    invoice.value.paymentDue = formatDate(new Date())
  }
}

function formatDate(date: Date): string {
  const day: string = String(date.getDate()).padStart(2, '0')
  const month: string = String(date.getMonth() + 1).padStart(2, '0')
  const year: string = String(date.getFullYear())
  return `${year}-${month}-${day}`
}

function saveInvoiceToLocalStorage(): void {
  if (!editing) {
    setInfo()
    invoices.value.push(invoice.value)
  }
  localStorage.setItem('invoices', JSON.stringify(invoices.value))
  goBack()
}

const addItem = (): void => {
  invoice.value.items.push({
    name: '',
    quantity: 0,
    price: 0.0,
    total: 0.0
  })
}

const removeItem = (index: number): void => {
  invoice.value.items.splice(index, 1)
}

const goBack = (): void => {
  if (editing) {
    router.push(`/invoice/${route.params.id}`)
  } else {
    router.push('/')
  }
}
</script>

<style scoped>
.buttons-form {
  border-radius: 0.4rem;
  display: flex;
  padding: 0.5rem;
  margin-top: 1.4rem;
}

.invoice-form {
  padding: 0 0.6rem;
  align-items: center;
}

h3 {
  margin-top: 0.5rem;
  margin-bottom: 1.5rem;
}

.bill-from {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-areas:
    'bill-from-street-label bill-from-street-label'
    'bill-from-street bill-from-street'
    'bill-from-city-label bill-from-post-code-label'
    'bill-from-city bill-from-post-code'
    'bill-from-country-label bill-from-country-label'
    'bill-from-country bill-from-country';
  gap: 0.5rem;
  margin-bottom: 2rem;
}

.bill-to {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-areas:
    'bill-to-name-label bill-to-name-label'
    'bill-to-name bill-to-name'
    'bill-to-email-label bill-to-email-label'
    'bill-to-email bill-to-email'
    'bill-to-address-label bill-to-address-label'
    'bill-to-address bill-to-address'
    'bill-to-city-label bill-to-post-code-label'
    'bill-to-city bill-to-post-code'
    'bill-to-country-label bill-to-country-label'
    'bill-to-country bill-to-country'
    'due-date-label due-date-label'
    'due-date due-date'
    'invoice-details-label invoice-details-label'
    'invoice-details invoice-details';
  gap: 0.5rem;
  margin-bottom: 2rem;
}

.item-labels {
  display: grid;
  grid-template-columns: 40% 10% 20% 30%;
  grid-template-areas: 'item-name-label item-quantity-label item-price-label item-total-price-label item-total-price-label';
  gap: 0.5rem;
}

.item-row {
  display: grid;
  grid-template-columns: 40% 10% 20% 20% 10%;
  grid-template-areas: 'itemName itemQuantity itemPrice itemTotalPrice remove-button';
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  align-items: center;
}

#remove-button {
  grid-area: remove-button;
  cursor: pointer;
}

#remove-button-icon,
#remove-button {
  width: 1.2rem;
  height: 1.2rem;
}

@media (width >= 768px) {
  .bill-from {
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-areas:
      'bill-from-street-label bill-from-street-label bill-from-street-label'
      'bill-from-street bill-from-street bill-from-street'
      'bill-from-country-label bill-from-city-label bill-from-post-code-label'
      'bill-from-country bill-from-city bill-from-post-code';
  }

  .bill-to {
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-areas:
      'bill-to-name-label bill-to-name-label bill-to-name-label'
      'bill-to-name bill-to-name bill-to-name'
      'bill-to-email-label bill-to-email-label bill-to-email-label'
      'bill-to-email bill-to-email bill-to-email'
      'bill-to-address-label bill-to-address-label bill-to-address-label'
      'bill-to-address bill-to-address bill-to-address'
      'bill-to-country-label bill-to-city-label bill-to-post-code-label'
      'bill-to-country bill-to-city bill-to-post-code'
      'due-date-label due-date-label due-date-label'
      'due-date due-date due-date'
      'invoice-details-label invoice-details-label invoice-details-label'
      'invoice-details invoice-details invoice-details';
  }

  #remove-button,
  #remove-button-icon {
    width: 1.9rem;
    height: 1.9rem;
  }
}

#item-name-label {
  grid-area: item-name-label;
}

#item-quantity-label {
  grid-area: item-quantity-label;
}

#item-price-label {
  grid-area: item-price-label;
}

#item-total-price-label {
  grid-area: item-total-price-label;
}

#add-item-button {
  width: 100%;
}

.item-row input[type='text'] {
  grid-area: itemName;
}

.item-row input[type='number']:nth-child(2) {
  grid-area: itemQuantity;
}

.item-row input[type='number']:nth-child(3) {
  grid-area: itemPrice;
}

.item-row input[type='number']:nth-child(4) {
  grid-area: itemTotalPrice;
}

#bill-from-street-label {
  grid-area: bill-from-street-label;
}

#bill-from-street {
  grid-area: bill-from-street;
}

#bill-from-country-label {
  grid-area: bill-from-country-label;
}

#bill-from-country {
  grid-area: bill-from-country;
}

#bill-from-city-label {
  grid-area: bill-from-city-label;
}

#bill-from-city {
  grid-area: bill-from-city;
}

#bill-from-post-code-label {
  grid-area: bill-from-post-code-label;
}

#bill-from-post-code {
  grid-area: bill-from-post-code;
}

#bill-to-name-label {
  grid-area: bill-to-name-label;
}

#bill-to-name {
  grid-area: bill-to-name;
}

#bill-to-email-label {
  grid-area: bill-to-email-label;
}

#bill-to-email {
  grid-area: bill-to-email;
}

#bill-to-address-label {
  grid-area: bill-to-address-label;
}

#bill-to-address {
  grid-area: bill-to-address;
}

#bill-to-country-label {
  grid-area: bill-to-country-label;
}

#bill-to-country {
  grid-area: bill-to-country;
}

#bill-to-city-label {
  grid-area: bill-to-city-label;
}

#bill-to-city {
  grid-area: bill-to-city;
}

#bill-to-post-code-label {
  grid-area: bill-to-post-code-label;
}

#bill-to-post-code {
  grid-area: bill-to-post-code;
}

#due-date-label {
  grid-area: due-date-label;
}

#due-date {
  grid-area: due-date;
}

#invoice-details-label {
  grid-area: invoice-details-label;
}

#invoice-details {
  grid-area: invoice-details;
}
</style>

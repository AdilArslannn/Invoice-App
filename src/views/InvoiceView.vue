<template>
  <div class="go-back">
    <router-link to="#" @click="router.push('/')">
      <img src="../assets/icon-arrow-left.svg" alt="arrow-left" class="go-back-image" />
      Go Back
    </router-link>
  </div>
  <div class="invoice-view" v-if="selectedInvoice">
    <div class="status-header">
      <p>Status</p>
      <div :class="['status', selectedInvoice.status]">{{ selectedInvoice.status }}</div>
    </div>
    <div class="buttons">
      <button
        v-if="selectedInvoice.status === 'draft'"
        class="grey button"
        @click="router.push(`/edit/${invoiceId}`)"
      >
        Edit
      </button>
      <button class="red button" @click="deleteInvoice">Delete</button>
      <button v-if="selectedInvoice.status === 'pending'" class="purple button" @click="markAsPaid">
        Mark as Paid
      </button>
    </div>
    <div class="invoice-details">
      <div class="top">
        <div class="top-first">
          <p>
            #<b>{{ selectedInvoice.id }}</b>
          </p>
          <p>{{ selectedInvoice.description }}</p>
        </div>
        <div class="top-second">
          <p>{{ selectedInvoice.senderAddress.street }}</p>
          <p>{{ selectedInvoice.senderAddress.city }}</p>
          <p>{{ selectedInvoice.senderAddress.postCode }}</p>
          <p>{{ selectedInvoice.senderAddress.country }}</p>
        </div>
      </div>
      <div class="bottom">
        <div class="bottom-first-all">
          <div class="bottom-first">
            <div class="left">
              <div>
                <p class="detail-title">Invoice Date</p>
                <p id="invoice-date">
                  <b>{{ selectedInvoice.createdAt }}</b>
                </p>
              </div>
              <div>
                <p class="detail-title">Payment Due</p>
                <p>
                  <b>{{ selectedInvoice.paymentDue }}</b>
                </p>
              </div>
            </div>
            <div class="right">
              <p class="detail-title">Bill To</p>
              <p>
                <b>{{ selectedInvoice.clientName }}</b>
              </p>
              <p>{{ selectedInvoice.clientAddress.street }}</p>
              <p>{{ selectedInvoice.clientAddress.city }}</p>
              <p>{{ selectedInvoice.clientAddress.postCode }}</p>
              <p>{{ selectedInvoice.clientAddress.country }}</p>
            </div>
          </div>
          <div class="invoice-email">
            <p class="detail-title">Sent to</p>
            <p>
              <b>{{ selectedInvoice.clientEmail }}</b>
            </p>
          </div>
        </div>
        <div class="bottom-second">
          <div class="items">
            <div class="desktop-version">
              <p id="name-label">Item Name</p>
              <p id="quantity-label">QTY.</p>
              <p id="price-label">Price</p>
              <p id="total-label">Total</p>
            </div>
            <div class="items-details" v-for="(item, index) in selectedInvoice.items" :key="index">
              <div class="item-details">
                <div class="item-name-div">
                  <p class="item-name-and-price item-name">
                    <b>{{ item.name }}</b>
                  </p>
                </div>
                <div class="item-quantity-and-price">
                  <p class="item-quantity">
                    <b class="quantity-and-price">{{ item.quantity }}</b>
                  </p>
                  <p class="mobile-version">x</p>
                  <p class="item-price">
                    <b class="quantity-and-price">$ {{ item.price }}</b>
                  </p>
                </div>
              </div>
              <div class="item-total">
                <p class="item-name-and-price">
                  $ <b class="important">{{ item.total }}</b>
                </p>
              </div>
            </div>
            <div class="invoice-total">
              <p class="invoice-grand-total">Amount Due</p>
              <p class="invoice-grand-total" id="invoice-total">
                $ <b class="invoice-grand-total">{{ selectedInvoice.total }}</b>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <p>Invoice not found</p>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { Router, RouteLocationNormalized } from 'vue-router'
import type { Invoice } from '@/invoiceInterface'

const router: Router = useRouter()
const route: RouteLocationNormalized = useRoute()
const invoiceId: string | string[] = route.params.id
const invoices = ref<Invoice[]>([])

function markAsPaid(): void {
  const index: number = invoices.value.findIndex((invoice) => invoice.id === invoiceId)
  invoices.value[index].status = 'paid'
  updateInvoicesStorage()
}

function deleteInvoice(): void {
  const index: number = invoices.value.findIndex((invoice) => invoice.id === invoiceId)
  invoices.value.splice(index, 1)
  updateInvoicesStorage()
  router.push({ name: 'home' })
}

onMounted(() => {
  invoices.value = JSON.parse(localStorage.getItem('invoices') || '[]')
})

// Find the selected invoice based on the route parameter (invoiceId)
const selectedInvoice = computed(() => {
  return invoices.value.find((invoice) => invoice.id === invoiceId) || null
})

function updateInvoicesStorage(): void {
  localStorage.setItem('invoices', JSON.stringify(invoices.value))
}
</script>

<style scoped>
.desktop-version {
  display: none;
  padding: 1.5rem;
  padding-bottom: 0;
}

.go-back {
  margin-left: 0.6rem;
}

.item-name-and-price {
  font-size: 1.2rem;
}

.invoice-view {
  display: grid;
  grid-template-areas:
    'status-header'
    'invoice-details'
    'buttons';
  margin: 0 0.6rem;
  gap: 0.625rem;
}

.buttons {
  display: flex;
  justify-content: space-around;
  border-radius: 0.625rem;
  padding: 0.938rem;
  grid-area: buttons;
}

.status-header {
  display: flex;
  justify-content: space-between;
  border-radius: 0.625rem;
  padding: 1.25rem;
  margin-bottom: 5%;
  grid-area: status-header;
}

.invoice-details {
  border-radius: 0.625rem;
  padding: 1.25rem;
  grid-area: invoice-details;
}

.top-first,
.top-second,
.bottom-first {
  margin-bottom: 1.875rem;
}

p {
  margin: 0.438rem 0;
}

.detail-title {
  padding-bottom: 0.438rem;
}

.bottom-first {
  display: flex;
  flex-direction: row;
}

.left {
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.right {
  width: 50%;
}

.items {
  display: flex;
  flex-direction: column;
  border-radius: 0.625rem;
  margin-top: 10%;
}

.items-details {
  padding: 0.5rem 1.5rem;
  display: flex;
  justify-content: space-between;
  border-bottom: 0.063rem solid #252945;
}

.item-quantity-and-price {
  display: flex;
  justify-content: space-around;
  justify-content: flex-start;
  gap: 0.2rem;
}

.item-total {
  display: flex;
  align-items: center;
}

.invoice-total {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 0 0 0.625rem 0.625rem;
  padding: 1.5rem;
}

#invoice-date {
  margin-bottom: 1.25rem;
}

#invoice-total {
  font-size: xx-large;
}

@media (width >= 768px) {
  .mobile-version {
    display: none;
  }

  .invoice-view {
    display: grid;
    grid-template-columns: 50% 50%;
    grid-template-areas:
      'status-header buttons'
      'invoice-details invoice-details';
    margin: 0 5%;
    gap: 0;
  }

  .buttons {
    justify-content: flex-end;
    border-radius: 0 0.625rem 0.625rem 0;
    padding: 1.3rem;
    margin-bottom: 1.9rem;
  }

  .status-header {
    justify-content: flex-start;
    border-radius: 0.625rem 0 0 0.625rem;
    padding: 1.3rem;
    margin-bottom: 1.9rem;
    gap: 2rem;
    align-items: center;
  }

  .invoice-details {
    padding: 2.5rem;
  }

  .button {
    flex-grow: 0;
    margin: 0 0.5rem;
  }

  .top {
    display: flex;
    justify-content: space-between;
  }

  .bottom-first-all {
    display: flex;
    flex-direction: row;
  }

  .invoice-email {
    width: 50%;
    margin-left: 10%;
  }

  .bottom-first {
    width: 50%;
  }

  .items {
    margin-top: 1rem;
  }

  .go-back {
    margin-left: 5%;
  }

  .desktop-version {
    display: inline;
    display: flex;
    align-items: flex-end;
  }

  #name-label {
    width: 40%;
  }

  #quantity-label {
    width: 10%;
    display: flex;
    justify-content: center;
  }

  #price-label {
    width: 25%;
    display: flex;
    justify-content: flex-end;
  }

  #total-label {
    width: 25%;
    display: flex;
    justify-content: flex-end;
  }

  .item-details {
    display: flex;
    width: 75%;
  }

  .item-total {
    width: 25%;
    justify-content: flex-end;
  }

  .item-name-div {
    width: 53.33%;
  }

  .item-quantity-and-price {
    width: 46.67%;
    display: flex;
    justify-content: center;
    gap: 0;
  }

  .item-quantity {
    width: 28.57%;
    display: flex;
    justify-content: center;
  }

  .item-price {
    width: 71.43%;
    display: flex;
    justify-content: flex-end;
  }
}
</style>

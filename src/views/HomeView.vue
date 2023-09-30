<template>
  <div class="home flex-column">
    <div class="home-header flex-row">
      <div class="left flex-column">
        <h1>Invoices</h1>
        <span v-if="invoices.length > 0">{{ invoices.length }} invoices</span>
        <span v-else>No invoices</span>
      </div>
      <div class="right">
        <div class="filter flex-column">
          <p>Filter by Status:</p>
          <select name="filter" v-model="selectedStatus">
            <option value="draft">Draft</option>
            <option value="pending">Pending</option>
            <option value="paid">Paid</option>
            <option value="sortByValue">Sort by Value</option>
            <option value="none">None</option>
          </select>
        </div>
        <div class="new-invoice-button">
          <button class="purple" @click="router.push('/create')">+ New Invoice</button>
        </div>
      </div>
    </div>
    <div class="invoice-list flex-column" v-if="invoices.length > 0 && filteredInvoices.length > 0">
      <RouterLink :to="`/invoice/${invoice.id}`"
        v-for="invoice in filteredInvoices"
        :key="invoice.id"
        class="invoice-item"
      >
        <p>
          #<b class="text-white">{{ invoice.id }}</b>
        </p>
        <div class="middle flex-space-between">
          <p>Due {{ invoice.paymentDue }}</p>
          <p>{{ invoice.clientName }}</p>
        </div>
        <div class="bottom flex-space-between">
          <p>
            <b>$ {{ invoice.total }}</b>
          </p>
          <div :class="['status', invoice.status]">{{ invoice.status }}</div>
        </div>
        <img class="arrow-right" src="../assets/icon-arrow-right.svg" alt="arrow-right" />
      </RouterLink>
    </div>
    <div class="no-invoice flex-column" v-else>
      <img src="@/assets/illustration-empty.svg" />
      <div class="no-invoices" v-if="invoices.length < 1">
        <h3>There is nothing here</h3>
        <p>Create a new invoice by clicking the New Invoice button and get started</p>
      </div>
      <div class="no-invoices-filtered" v-else>
        <h3>There is no invoice that is {{ selectedStatus }}</h3>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import type { Invoice } from '@/invoiceInterface'
import router from '@/router'
import _ from 'lodash' //gives false error. (It works just fine)

const invoices = ref<Invoice[]>([])
const selectedStatus = ref<string>('none')

const filteredInvoices = computed(() => {
  if (selectedStatus.value === 'none') {
    return invoices.value
  } else if (selectedStatus.value === 'sortByValue') {
    return sortByValue()
  } else {
    return invoices.value.filter((invoice) => invoice.status === selectedStatus.value)
  }
})

/*
function sortByDate():Invoice[]{
  const sortedInvoice:Invoice[] = _.cloneDeep(invoices.value)
  return sortedInvoice.sort((a, b)=> (a.d))
}
*/

function sortByValue(): Invoice[] {
  /*
  deep clone because i guess shallow copy doesn't really work with multiple objects like 
  we discussed in the stand-up
  */
  const sortedInvoice: Invoice[] = _.cloneDeep(invoices.value)

  return sortedInvoice.sort((a, b) => (a.total > b.total ? -1 : a.total < b.total ? 1 : 0))
  //https://flaviocopes.com/how-to-sort-array-of-objects-by-property-javascript/
}

onMounted(() => {
  invoices.value = JSON.parse(localStorage.getItem('invoices') || '[]')
})
</script>

<style scoped>
.arrow-right {
  display: none;
}

.home {
  align-items: center;
  margin: 0 0.3rem;
}

.home-header {
  justify-content: space-between;
  margin-top: 5%;
  width: 90%;
}

.left {
  justify-content: center;
  align-items: flex-start;
  gap: 0.6rem;
}

.right {
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
}

.filter {
  align-self: center;
}

.filter select {
  text-align: center;
}

.invoice-list {
  margin-top: 10%;
  width: 90%;
  gap: 0.6rem;
}

.invoice-item {
  transition: 0.3s;
  border-radius: 0.6rem;
  padding: 0.9rem;
  cursor: pointer;
}

.middle {
  margin: 0.9rem 0;
}

.bottom {
  align-items: center;
}

.no-invoice {
  align-items: center;
  text-align: center;
  margin-top: 30%;
}

@media (width >= 768px) {
  .home {
    margin: 0 13%;
  }

  .home-header {
    margin: 3rem 0;
  }

  .right {
    flex-direction: row;
    gap: 3rem;
    justify-content: flex-end;
  }

  .invoice-list {
    margin-top: 0;
  }

  .invoice-item {
    display: grid;
    align-items: center;
    grid-template-columns: 25% 35% 37% 3%;
    grid-template-areas: 'id due name amount status rigt-arrow';
    justify-content: center;
    gap: 0.3rem;
    padding: 1.3rem;
  }

  .middle {
    justify-content: flex-start;
    gap: 10%;
    margin: 0;
  }

  .arrow-right {
    display: inline;
    justify-self: center;
  }

  .no-invoice {
    margin-top: 10%;
  }

  h1 {
    font-size: 3rem;
  }

  span {
    font-size: 1.1rem;
  }
}

.invoice-item:nth-child(1) {
  grid-area: id;
}

.invoice-item:nth-child(2) {
  grid-area: due;
}

.invoice-item:nth-child(3) {
  grid-area: name;
}

.invoice-item:nth-child(4) {
  grid-area: amount;
}

.invoice-item:nth-child(5) {
  grid-area: status;
}

.invoice-item:nth-child(6) {
  grid-area: rigt-arrow;
}
</style>

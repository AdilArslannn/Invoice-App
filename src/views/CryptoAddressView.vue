<template>
  <div class="crypto-addresses flex-column">
    <div class="header flex-row">
      <h1>Crypto Addresses</h1>
      <button @click="generateAddresses" class="generate-button">Generate Addresses</button>
    </div>
    <div v-if="addresses.length > 0" class="address-list">
      <p v-for="(address, index) in addresses" :key="index">
        {{ address }}
      </p>
    </div>
    <div v-else class="no-addresses">
      <h3>No addresses generated yet</h3>
      <p>Click the "Generate Addresses" button to generate new addresses.</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const addresses = ref([]);

// Generates 64,000 random crypto-like addresses
const generateAddresses = () => {
  addresses.value = Array.from({ length: 64000 }, () => `0x${randomString(40)}`);
};

// Helper function to generate a random string
const randomString = (length) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  return Array.from({ length }, () => chars.charAt(Math.floor(Math.random() * chars.length))).join('');
};
</script>

<style scoped>
.crypto-addresses {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
}

.header {
  justify-content: space-between;
  width: 100%;
}

.generate-button {
  padding: 10px 20px;
  background-color: #6200ea;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.generate-button:hover {
  background-color: #3700b3;
}

.address-list {
  margin-top: 20px;
  max-height: 400px;
  overflow-y: scroll;
  width: 100%;
  text-align: left;
}

.address-list p {
  font-family: monospace;
  margin: 5px 0;
}

.no-addresses {
  text-align: center;
  margin-top: 20px;
}

.no-addresses h3 {
  font-size: 1.5rem;
  margin-bottom: 10px;
}

.no-addresses p {
  font-size: 1rem;
}
</style>

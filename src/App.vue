<template>
  <KeepAlive>
    <Header @switchTheme="onSwitchTheme" />
  </KeepAlive>

  <RouterView />

  <link v-bind:href="isDarkTheme ? '/styles/dark.css' : '/styles/light.css'" rel="stylesheet" />
  <button class="purple" @click="router.push('/addresses')">Test crypto addresses individual elements</button>
  <button class="purple" @click="router.push('/addresses-1')">Test crypto addresses in one element</button>
</template>

<script setup lang="ts">
import router from '@/router'
import Header from './components/Header/HeaderIndex.vue'
import { ref } from 'vue'

const isDarkTheme = ref<boolean>(true)

const onSwitchTheme = (value: boolean): void => {
  isDarkTheme.value = value
}
</script>

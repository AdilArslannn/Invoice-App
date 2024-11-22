<template>
  <KeepAlive>
    <Header @switchTheme="onSwitchTheme" />
  </KeepAlive>

  <RouterView />

  <link v-bind:href="isDarkTheme ? '/styles/dark.css' : '/styles/light.css'" rel="stylesheet" />
</template>

<script setup lang="ts">
import Header from './components/Header/HeaderIndex.vue'
import { ref } from 'vue'

const isDarkTheme = ref<boolean>(true)

const onSwitchTheme = (value: boolean): void => {
  isDarkTheme.value = value
}
</script>

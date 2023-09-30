<template>
  <div class="header">
    <div class="logo">
      <img alt="Invoice app icon" class="logo-img" src="./icons/AppIcon.png" />
    </div>
    <div class="user">
      <span @click="toggleTheme">
        <img v-if="isDarkTheme" src="../../assets/icon-moon.svg" alt="Light theme icon" />
        <img v-else src="../../assets/icon-sun.svg" alt="Dark theme icon" />
      </span>
      <img alt="User profile icon" class="user-img" src="./icons/User.png" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

const emit = defineEmits(['switchTheme'])
const isDarkTheme = ref<boolean>(JSON.parse(localStorage.getItem('isDarkTheme') || 'true'))

const toggleTheme = (): void => {
  isDarkTheme.value = !isDarkTheme.value
  localStorage.setItem('isDarkTheme', JSON.stringify(isDarkTheme.value))
  emitTheme()
}
onMounted(() => {
  emitTheme()
})
const emitTheme = (): void => {
  emit('switchTheme', isDarkTheme.value)
}
</script>

<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.625rem;
  box-sizing: border-box;
  border-radius: 0.625rem;
}

.logo-img {
  padding-left: 0.625rem;
  width: 3.125rem;
  height: 3.125rem;
}

.user-img {
  padding-right: 0.625rem;
  border-left: 0.125rem solid #fff;
  padding-left: 0.625rem;
  width: 2.5rem;
  height: 2.5rem;
}

.user {
  display: flex;
  align-items: center;
  gap: 3rem;
}

span {
  cursor: pointer;
}

@media (width >= 768px) {
  .logo-img {
    width: 5rem;
    height: 5rem;
  }

  .user-img {
    width: 3.125rem;
    height: 3.125rem;
  }
}
</style>

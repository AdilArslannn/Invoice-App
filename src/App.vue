<template>
  <KeepAlive>
    <Header @switchTheme="onSwitchTheme" />
  </KeepAlive>

  <RouterView />

  <link v-bind:href="isDarkTheme ? '/styles/dark.css' : '/styles/light.css'" rel="stylesheet" />
</template>

<script setup lang="ts">
import Header from './components/Header/HeaderIndex.vue';
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const isDarkTheme = ref<boolean>(true);
const route = useRoute(); // Access the current route
const router = useRouter(); // Access the router for redirection

// Handle theme switching
const onSwitchTheme = (value: boolean): void => {
  isDarkTheme.value = value;
};

// Watch for changes in the route
watch(route, async (newRoute) => {
  if (newRoute.name === 'edit') { // Check if the route is `/edit/:id`
    const id = newRoute.params.id;

    try {
      // Call Netlify function or server to validate the route and get status
      const response = await fetch(`/edit/${id}`);
      
      // Handle custom status codes
      if (response.status === 403) {
        console.error('Access forbidden!');
        router.push('/'); // Redirect to the home page or elsewhere
      } else if (response.status === 404) {
        console.error('Resource not found!');
        router.push('/not-found'); // Redirect to a custom 404 page
      } else if (!response.ok) {
        console.error(`Unexpected error occurred: ${response.status}`);
        router.push('/error'); // Redirect to a general error page
      }
    } catch (error) {
      console.error('Failed to fetch route data', error);
      router.push('/error'); // Redirect to a fallback error page
    }
  }
});
</script>

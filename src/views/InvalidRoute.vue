<template>
  <div class="wrong-route flex-column">
    <img src="@/assets/illustration-empty.svg" />
    <h3>Nothing to see here</h3>
    <p>Lets get back to the Home Page by clicking the button below</p>
    <button class="purple home-button" @click="$router.push('/')">Home Page</button>
  </div>
</template>

<style>
.wrong-route {
  align-items: center;
  text-align: center;
  padding: 15%;
}

.home-button {
  margin: 1rem;
}
</style>

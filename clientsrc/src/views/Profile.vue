<template>
  <div class="about text-center">
    <h1>Welcome {{ profile.name }}</h1>
    <img class="rounded" :src="profile.picture" alt="" />
    <p>{{ profile.email }}</p>
    <h2> my favs: </h2>
    <joke v-for="joke in jokes" :jokesData="joke" :key="joke._id"></joke>
  </div>
</template>

<script>
import Joke from "../components/Joke"
export default {
  name: "Profile",
  computed: {
    profile() {
      return this.$store.state.profile;
    }
  },
  jokes(){
      return this.$store.state.jokes
    },
    methods: {},
     components: { Joke }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>

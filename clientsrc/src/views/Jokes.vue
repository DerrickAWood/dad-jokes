<template>
  <div class="jokes">
    <h1>THIS IS THE JOKES PAGES</h1>
    <CreateJoke v-if="$auth.isAuthenticated" />
    <small class="text-danger" v-else>You must log in to create a joke.</small>
  </div>
</template>


<script>
import CreateJoke from "../components/CreateJoke";
export default {
  name: "jokes",
  data() {
    return {};
  },
  mounted() {
    console.log(this.$auth);
    this.$store.dispatch("getJokes");
  },
  computed: {},
  methods: {},
  components: { CreateJoke }
};
</script>


<style scoped>
</style>
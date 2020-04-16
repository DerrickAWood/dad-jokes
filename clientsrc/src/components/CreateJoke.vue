<template>
  <div class="create-joke">
    <div class="form-group">
      <label for>Setup</label>
      <input
        type="text"
        class="form-control"
        placeholder="Why did the orange lose the race?"
        v-model="newJoke.setup"
      />
    </div>
    <div class="form-group">
      <label for>Punchline</label>
      <input
        type="text"
        class="form-control"
        placeholder="Because it ran out of juice!"
        v-model="newJoke.punchline"
      />
    </div>
    <button type="button" class="btn btn-primary" @click="addJoke()">Add Joke</button>
  </div>
</template>


<script>
export default {
  name: "create-joke",
  data() {
    return {
      newJoke: {}
    };
  },
  mounted() {},
  computed: {},
  methods: {
    addJoke() {
      this.$store.dispatch("addJoke", this.newJoke);
      this.newJoke = {};
    }
  },
  components: {}
};
</script>


<style scoped>
</style>
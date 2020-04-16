<template>
  <div class="joke col-3">
    <h3> {{jokesData.setup}}</h3>
    <h5> {{jokesData.punchline}}</h5>
    <button class="btn btn-danger" @click="deleteJoke()">DELETE</button>
  </div>
</template>


<script>
export default {
  name: "joke",
  props: ["jokesData"],
  data() {
    return {
    };
  },
  mounted() {},
  computed: {},
  methods: {
    deleteJoke(){
      this.$store.dispatch("deleteJoke", this.jokesData._id)
    }
    },
  components: {}
};
</script>


<style scoped>
</style>
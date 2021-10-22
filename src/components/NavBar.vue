<template>
  <div class="nav">
    <ul>
      <li><a @click="Home">Home</a></li>
      <li><a @click="Bubble">Bubble sort</a></li>
      <li><a @click="Merge">Merge sort</a></li>
      <li><a @click="AStar">A*</a></li>
    </ul>
    <ul class="right">
      <li><a href="https://github.com/JoeyDeSmet/algorithm_visualizer">GitHub</a></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "NavBar",
  methods: {
    Home() {
      this.$emit("page-change", "Home");
    },
    Bubble() {
      this.$emit("page-change", "Bubble");
    },
    Merge() {
      this.$emit("page-change", "Merge");
    },
    AStar() {
      this.$emit("page-change", "AStar");
    },
  },
};
</script>

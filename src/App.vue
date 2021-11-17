<template>
  <NavBar @page-change="this.ChangePage" />
  <!-- <Home v-if="this.active_page == 'Home'" /> -->
  <mine-sweeper></mine-sweeper>
  <!-- <Test /> -->
  <BubbleSort v-if="this.active_page == 'Bubble'" />
  <MergeSort v-if="this.active_page == 'Merge'" />
  <AStar v-if="this.active_page == 'AStar'" />
</template>

<script>
import BubbleSort from "./components/bubble_sort.vue";
// import Home from "./components/home.vue";
import NavBar from "./components/NavBar.vue";
import MergeSort from "./components/MergeSort.vue";
import AStar from "./components/AStar.vue";
import MineSweeper from "./components/MineSweeper.vue";
// import Test from "./components/test.vue";

export default {
  name: "App",
  components: {
    NavBar,
    //Home,
    BubbleSort,
    MergeSort,
    AStar,
    MineSweeper,
    // Test,
  },

  data() {
    return {
      active_page: "Home",
    };
  },

  methods: {
    ChangePage(name) {
      this.active_page = name;
    },
  },
};
</script>

<style>
.home {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.graph {
  display: flex;
  justify-content: center;
}

.tile {
  margin: 0;
}

.nav {
  display: flex;

  background: linear-gradient(-90deg, #b0e0e6, #4ca3dd);
  height: 60px;

  -webkit-box-shadow: 0px 2px 15px -12px rgba(0, 0, 0, 0.57);
  -moz-box-shadow: 0px 2px 15px -12px rgba(0, 0, 0, 0.57);
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.57);

  margin-bottom: 0px;
}

.nav ul {
  display: table;
  list-style-type: none;
  padding: 0;
  align-self: center;
}

.right {
  justify-self: right;
  margin-left: auto;
}

.nav ul li {
  display: table-cell;
  padding: 10px;
  height: 100%;
  width: fit-content;
}

.nav ul li a {
  vertical-align: middle;
  text-decoration: none;
  color: white;
  font-weight: 200;
  font-size: large;
  cursor: pointer;
}

.options {
  display: table;
  border-spacing: 10px;
  bottom: 0;
  position: fixed;
}

.options div {
  display: table-cell;
}

.button {
  background-color: #4ca3dd;
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  cursor: pointer;
  transition-duration: 0.4s;
}

.disabledbutton {
  background-color: #b0e0e6;
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  cursor: not-allowed;
  transition-duration: 0;
}

.button:hover {
  background-color: #1c72e9;
}

label {
  margin: 10px;
}
</style>

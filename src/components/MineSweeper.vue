<template>
  <svg width="100%" :style="{ height: this.rows * 30 + 'px' }">
    <g v-for="(rows, y) in this.tiles" :key="rows">
      <g v-for="(cols, x) in rows" :key="cols">
        <rect
          :x="x * 30"
          :y="y * 30"
          width="30"
          height="30"
          stroke="#000"
          stroke-opacity="0.2"
          :fill="Color(x, y)"
          :xPos="x"
          :yPos="y"
          @click="Click(x, y)"
        />
      </g>
    </g>
  </svg>
</template>

<script>
export default {
  data() {
    return {
      rows: 16,
      cols: 16,
      tiles: new Array(16).fill().map(() =>
        new Array(16).fill().map(() => {
          return { bomb: false, hidden: true, value: 0 };
        })
      ),
    };
  },

  methods: {

    Click(x, y) {
      this.tiles[y][x].hidden = false;
    },

    Color(x, y) {
      if (this.tiles[y][x].hidden) return '#15404e'
      return '#fefefe'
    }
  },
};
</script>

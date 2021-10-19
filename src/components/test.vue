<template>
  <div class="test">
    <svg width="100%" height="1080px">
      <g v-for="(rows, y) in this.tiles" :key="rows" witdh="100%" height="30px">
        <rect
          v-for="(tile, x) in rows"
          :key="tile"
          :x="x * 30"
          :y="y * 30"
          width="30"
          height="30"
          stroke="#000"
          stroke-opacity="0.2"
          fill="#ffffff"
        />
      </g>
    </svg>
  </div>
</template>

<script>
export default {
  name: "Test",
  data() {
    return {
      tiles: new Array(20).fill(0).map(() => new Array(20).fill(0)),
    };
  },

  methods: {},
};
</script>

<template>
  <svg width="100%" height="1080">
    <rect
      v-for="(tile, i) in tiles"
      :key="tile"
      :x="tiles[i].x"
      :y="tiles[i].y"
      :fill="tiles[i].isWall ? '#333333' : '#ffffff'"
      width="30"
      height="30"
      stroke="#000"
      stroke-opacity="0.2"
      @click="click"
      @mouseover="hover"
      @mouseup="mouseUp"
      @mousedown="this.mouseDown = true"
      :index="i"
    />
  </svg>
</template>

<script>
export default {
  name: "AStar",

  data() {
    return {
      tiles: [],
      mouseVisitedTiles: [],
      mouseDown: false
    };
  },

  methods: {
    fillArray() {
      for (var i = 0; i < 75; i++) {
        for (var j = 0; j < 50; j++) {
          this.tiles.push({
            x: i * 30,
            y: j * 30,
            isWall: false,
          });
        }
      }
    },

    click(event) {
      let index = event.target.attributes.index.value;

      this.tiles[index].isWall = !this.tiles[index].isWall;

      console.log(index)
    },

    hover(event) {
      console.log("hover -> mouseDown: " + this.mouseDown)
      if (this.mouseDown) {
        let index = event.target.attributes.index.value;
        if (this.mouseVisitedTiles.includes(index)) return;
        this.tiles[index].isWall = !this.tiles[index].isWall;
        this.mouseVisitedTiles.push(index)
      }
    },

    mouseUp() {
      this.mouseDown = false
      this.mouseVisitedTiles = []
    }
  },

  beforeMount() {
    this.fillArray();
    console.log("Before mount");
  },
};
</script>

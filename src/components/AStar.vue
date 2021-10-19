<template>
  <svg
    width="100%"
    height="1080"
    @mouseleave="mouseleaveSVG"
    @mousedown="mouseDown"
    @mouseup="mouseUp"
  >
    <g v-for="(rows, y) in this.tiles" :key="rows">
      <rect
        v-for="(tile, x) in rows"
        :key="tile"
        :x="x * 30"
        :y="y * 30"
        width="30"
        height="30"
        stroke="#000"
        stroke-opacity="0.2"
        :fill="color(tile)"
        :xPos="x"
        :yPos="y"
        @click="click"
      />
    </g>
  </svg>

  <div class="options">
    <div>
      <button :class="'button'" @click="clear">Clear</button>
    </div>

    <div>
      <button :class="'button'" @click="calculateCost(11, 57)">Run!</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "AStar",

  data() {
    return {
      rows: 25,
      cols: 63,
      tiles: new Array(25).fill().map(() =>
        new Array(63).fill().map(() => {
          return {
            wall: false,
            end: false,
            start: false,
            visited: false,
            closed: false,
            G: 0 /*Distance from startNode*/,
            H: 0 /*Distance from endNode*/,
            F: 0,
          };
        })
      ),
      mouseVisitedTiles: [],
      mouseDownProp: false,
      movingStartPos: false,
      movingEndPos: false,
    };
  },

  methods: {
    run() {

      // Path found
    },

    calculateCost(xPos, yPos) {
      let startAndEndPos = this.getStartAndEndPos();

      let Gcost = Math.sqrt(
        Math.pow(startAndEndPos.start.x - xPos, 2) +
          Math.pow(startAndEndPos.start.y - yPos, 2)
      );
      let Hcost = Math.sqrt(
        Math.pow(startAndEndPos.end.x - xPos, 2) +
          Math.pow(startAndEndPos.end.y - yPos, 2)
      );
      let Fcost = Gcost + Hcost;

      console.log(Gcost + " " + Hcost + " " + Fcost)

      return { Gcost: Gcost, Hcost: Hcost, Fcost: Fcost };
    },

    claculateNeighbors(tile) {
      let up = { x: tile.x, y: tile.y + 1 };
      let rightUp = { x: tile.x + 1, y: tile.y + 1 };
      let right = { x: tile.x + 1, y: tile.y };
      let rightDown = { x: tile.x + 1, y: tile.y - 1 };
      let down = { x: tile.x, y: tile.y - 1 };
      let leftDown = { x: tile.x - 1, y: tile.y - 1 };
      let left = { x: tile.x - 1, y: tile.y };
      let leftUp = { x: tile.x - 1, y: tile.y + 1 };

      return [up, rightUp, right, rightDown, down, leftDown, left, leftUp];
    },

    isTraversable(tile) {
      if (this.tiles[tile.y][tile.x].wall) return false;
      return true;
    },

    checkInBounds(tile) {
      if (tile.x < 0 || tile.x > this.cols || tile.y < 0 || tile.y > this.rows)
        return false;
      return true;
    },

    getStartAndEndPos() {
      let startNodePos = { x: 0, y: 0 };
      let endNodePos = { x: 0, y: 0 };

      for (var y = 0; y < this.tiles.length; y++) {
        for (var x = 0; x < this.tiles[y].length; x++) {
          if (this.tiles[y][x].start) startNodePos = { x: x, y: y };
          if (this.tiles[y][x].end) endNodePos = { x: x, y: y };
        }
      }

      return { start: startNodePos, end: endNodePos };
    },

    click(event) {
      let pos = this.getPosFromEvent(event);
      let tile = this.tiles[pos.y][pos.x];
      if (!tile.start && !tile.end) tile.wall = !tile.wall;
    },

    color(tile) {
      if (tile.visited) return "#90ee90";
      if (tile.wall) return "#333333";
      if (tile.start) return "#00ff00";
      if (tile.end) return "#ff0000";
      else return "#ffffff";
    },

    getPosFromEvent(event) {
      let y = event.target.attributes.yPos.value;
      let x = event.target.attributes.xPos.value;

      return { x: x, y: y };
    },

    clear() {
      this.tiles.forEach((array) => {
        array.forEach((tile) => {
          tile.wall = false;
        });
      });
    },
  },

  beforeMount() {
    this.tiles[11][5].start = true;
    this.tiles[11][57].end = true;
  },
};
</script>

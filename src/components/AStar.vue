<template>
  <svg
    width="100%"
    @mouseleave="mouseleaveSVG"
    @mousedown="mouseDown"
    @mouseup="mouseUp"
    :style="{ height: this.rows * 30 + 'px' }"
  >
    <g v-for="(rows, y) in this.tiles" :key="rows">
      <g v-for="(tile, x) in rows" :key="tile">
        <rect
          :x="x * 30"
          :y="y * 30"
          rx="5"
          width="30"
          height="30"
          stroke="#000"
          stroke-opacity="0.2"
          :fill="color(tile)"
          :xPos="x"
          :yPos="y"
          @mousedown="click"
          @mouseover="hover"
        ></rect>
      </g>
    </g>
  </svg>

  <div class="options">
    <div>
      <button :class="'button'" @click="clear">Clear</button>
    </div>

    <div>
      <button :class="'button'" @click="aStar">run</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "AStar",
  data() {
    return {
      cols: 26,
      rows: 64,
      tiles: new Array(25).fill().map(() =>
        new Array(63).fill().map(() => {
          return {
            wall: false,
            end: false,
            start: false,
            visited: false,
            mark: false,

            f: 0,
            g: 0,
            h: 0,
            parent: null,
            pos: { x: 0, y: 0 },
            closed: false,
          };
        })
      ),
      mouseDownProp: false,
    };
  },

  methods: {
    async aStar() {
      this.initGrid();

      var start = this.getStartTile();
      var end = this.getEndTile();

      var OpenList = [];
      OpenList.push(start);

      while (OpenList.length > 0) {
        var lowInd = 0;
        for (var i = 0; i < OpenList.length; i++) {
          if (OpenList[i].f < OpenList[lowInd].f) {
            lowInd = i;
          }
        }

        var currentNode = OpenList[lowInd];

        if (
          currentNode.pos.y === end.pos.y &&
          currentNode.pos.x === end.pos.x
        ) {
          //* Path found
          var curr = currentNode;

          console.log(OpenList);

          while (curr.parent != null) {
            curr.mark = true;
            curr = curr.parent;
            await this.sleep(10);
          }

          return;
        }

        var indexToRemove = OpenList.findIndex(
          (tile) =>
            tile.pos.x === currentNode.pos.x && tile.pos.y === currentNode.pos.y
        );
        OpenList.splice(indexToRemove, 1);
        currentNode.closed = true;

        console.log(OpenList.length)

        var neighbors = this.getNeighbors(currentNode);

        for (var n = 0; n < neighbors.length; n++) {
          var neighbor = this.tiles[neighbors[n].pos.y][neighbors[n].pos.x];

          if (
            neighbor.closed ||
            neighbor.wall
          ) {
            continue;
          }

          var gscore =
            currentNode.g +
            this.calculateDistance(currentNode.pos, neighbor.pos);
          var gScoreIsBest = false;

          if (!OpenList.some(e => { return e.pos.x === neighbor.pos.x && e.pos.y === neighbor.pos.y})
          ) {
            gScoreIsBest = true;
            neighbor.h = this.calculateDistance(neighbor.pos, end.pos);
            OpenList.push(neighbor);
          } else if (gscore < neighbor.g) {
            gScoreIsBest = true;
          }

          if (gScoreIsBest) {
            neighbor.parent = currentNode;
            neighbor.g = gscore;
            neighbor.f = neighbor.g + neighbor.h;
            neighbor.visited = true;
          }
        }

        await this.sleep(0);
      }

      console.log("No Result was found");
    },

    getStartTile() {
      for (var y = 0; y < this.tiles.length; y++) {
        for (var x = 0; x < this.tiles[y].length; x++) {
          if (this.tiles[y][x].start) {
            return this.tiles[y][x];
          }
        }
      }
      return null;
    },

    getEndTile() {
      for (var y = 0; y < this.tiles.length; y++) {
        for (var x = 0; x < this.tiles[y].length; x++) {
          if (this.tiles[y][x].end) {
            return this.tiles[y][x];
          }
        }
      }
      return null;
    },

    getNeighbors(tile) {
      let positions = [
      { x: tile.pos.x, y: tile.pos.y + 1 },
      { x: tile.pos.x + 1, y: tile.pos.y + 1 },
      { x: tile.pos.x + 1, y: tile.pos.y },
      { x: tile.pos.x + 1, y: tile.pos.y - 1 },
      { x: tile.pos.x, y: tile.pos.y - 1 },
      { x: tile.pos.x - 1, y: tile.pos.y - 1 },
      { x: tile.pos.x - 1, y: tile.pos.y },
      { x: tile.pos.x - 1, y: tile.pos.y + 1 },
      ]

      var ret = [];

      positions.forEach(position => {
        if (this.checkInBounds(position)) {
          ret.push(this.tiles[position.y][position.x]);
        }
      })
      
      return ret;
    },

    checkInBounds(tile) {
      if (
        tile.x < 0 ||
        tile.x >= this.tiles[0].length ||
        tile.y < 0 ||
        tile.y >= this.tiles.length
      )
        return false;
      return true;
    },

    calculateDistance(tile, tileTwo) {
      return (
        Math.round(
          Math.sqrt(
            Math.pow(tile.x - tileTwo.x, 2) + Math.pow(tile.y - tileTwo.y, 2)
          ).toPrecision(2) * 100
        ) / 100
      );
    },

    initGrid() {
      for (var y = 0; y < this.tiles.length; y++) {
        for (var x = 0; x < this.tiles[0].length; x++) {
          this.tiles[y][x].pos = { x: x, y: y };
          this.tiles[y][x].parent = null;
        }
      }
    },

    sleep(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    },

    // Not algorithm related
    click(event) {
      let pos = this.getPosFromEvent(event);
      let tile = this.tiles[pos.y][pos.x];
      if (!tile.start && !tile.end) tile.wall = !tile.wall;
    },

    color(tile) {
      if (tile.visited && !tile.mark && !tile.start && !tile.end)
        return "#90ee90";
      if (tile.mark && !tile.start && !tile.end) return "#ff8822";
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
          tile.visited = false;
          tile.mark = false;
          tile.closed = false;
        });
      });
    },

    mouseDown() {
      this.mouseDownProp = true;
    },

    mouseUp() {
      this.mouseDownProp = false;
    },

    mouseLeaveSVG() {
      this.mouseDownProp = false;
    },

    hover(event) {
      if (this.mouseDownProp) {
        let pos = this.getPosFromEvent(event);
        let tile = this.tiles[pos.y][pos.x];
        tile.wall = !tile.wall;
      }
    },
  },

  beforeMount() {
    this.tiles[11][5].start = true;
    this.tiles[11][57].end = true;
  },
};
</script>

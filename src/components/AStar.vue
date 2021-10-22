<template>
  <svg
    width="100%"
    @mouseleave="mouseleaveSVG"
    @mousedown="mouseDown"
    @mouseup="mouseUp"
    :style="{height: this.rows * 30 +'px'}"
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
        >
        </rect>
      </g>
    </g>
  </svg>

  <div class="options">
    <div>
      <button :class="'button'" @click="clear">Clear</button>
    </div>

    <div>
      <button :class="'button'" @click="run">Run!</button>
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
            mark: false,
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
    async run() {
      let startAndEndPos = this.getStartAndEndPos();
      var currentTile = startAndEndPos.start;
      let currentCheapest = this.calculateCost(currentTile, currentTile, {Gcost:0});

      let openTiles = [];

      let visited = [];
      visited.push({tile:startAndEndPos.start, cost: currentCheapest});
      
      let cheaperFound = false;

      while (
        currentTile.x != startAndEndPos.end.x ||
        currentTile.y != startAndEndPos.end.y || 
        openTiles.length == 0
      ) {
        let neighbors = this.claculateNeighbors(currentTile);

        // Adding open tiles
        neighbors.forEach((tile) => {
          if (
            !openTiles.some(
              (e) => e.tile.x === tile.x && e.tile.y === tile.y
            ) &&
            !visited.some((e) => e.tile.x === tile.x && e.tile.y === tile.y) &&
            this.checkInBounds(tile) &&
            !this.tiles[tile.y][tile.x].wall
          ) {
            let cost = this.calculateCost(currentTile ,tile, currentCheapest);
            openTiles.push({ tile, cost });
          }
        });

        // Find cheapest in openTiles
        cheaperFound = false;
        openTiles.forEach((tile) => {
          if (tile.cost.Fcost < currentCheapest.Fcost) {
            cheaperFound = true;
            currentCheapest = tile.cost;
            currentTile = tile.tile;
          } else if (tile.cost.Fcost >= currentCheapest.Fcost) {
            if (tile.cost.Hcost < currentCheapest.Hcost) {
              cheaperFound = true;
              currentCheapest = tile.cost;
              currentTile = tile.tile;
            }
          }
        });

        // If no tiles where cheaper find cheapest in openTiles
        if (!cheaperFound) {
          let cheapest = null;
          openTiles.forEach((tile) => {
            if (cheapest == null) {
              cheapest = tile.cost;
              currentTile = tile.tile;
            } else {
              if (tile.cost.Fcost < cheapest.Fcost) {
                currentTile = tile.tile;
                cheapest = tile.cost;
              } else if (tile.cost.Fcost == cheapest.Fcost) {
                if (tile.cost.Hcost < cheapest.Hcost) {
                  currentTile = tile.tile;
                  cheapest = tile.cost;
                }
              }
            }
          });
          currentCheapest = cheapest;
        }

        // Removing currentCheapest from open list
        let index = openTiles.findIndex(
          (e) => e.tile.x === currentTile.x && e.tile.y === currentTile.y
        );
        openTiles.splice(index, 1);

        // Adding currentCheapest to visited tiles
        visited.push({tile: currentTile, cost: currentCheapest});
        this.tiles[currentTile.y][currentTile.x].visited = true;

        await this.sleep(0);
      }

      console.log(visited);

      currentTile = startAndEndPos.end;
      let cheapestRoute = null;
      let secondVisit = [];
      secondVisit.push(currentTile);

      while (currentTile.x != startAndEndPos.start.x ||
        currentTile.y != startAndEndPos.start.y) {

          let neighbors = this.claculateNeighbors(currentTile);

          neighbors.forEach(element => {
            // Check if tile is in visited
            if (visited.some(e => e.tile.x === element.x && e.tile.y === element.y) &&
                !secondVisit.some(e => e.x === element.x && e.y === element.y)) {

              let visitedElement = visited[visited.findIndex(e => e.tile.x === element.x && e.tile.y === element.y)];

              if (cheapestRoute == null) {
                cheapestRoute = visitedElement.cost;
                currentTile = visitedElement.tile;
              } else {
                if (visitedElement.cost.Gcost < cheapestRoute.Gcost) {
                  cheapestRoute = visitedElement.cost;
                  currentTile = visitedElement.tile;
                }
              }
            }
          });

          this.tiles[currentTile.y][currentTile.x].mark = true;
          await this.sleep(10);
        }
      

      
    },

    calculateCost(currentTile, tile, prevCost) {
      let startAndEndPos = this.getStartAndEndPos();

      let Gcost = this.calculateDistance(currentTile, tile) + prevCost.Gcost;
      let Hcost = this.calculateDistance(startAndEndPos.end, tile);
      let Fcost = Gcost + Hcost;

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
      if (tile.x < 0 || tile.x >= this.cols || tile.y < 0 || tile.y >= this.rows)
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

    calculateDistance(tile, tileTwo) {
      return (
        Math.round(
          Math.sqrt(
            Math.pow(tile.x - tileTwo.x, 2) + Math.pow(tile.y - tileTwo.y, 2)
          ).toPrecision(5) * 100
        ) / 100
      );
    },

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
        });
      });
    },

    sleep(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
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

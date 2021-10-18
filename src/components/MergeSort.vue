<template>
  <div class="mergeSort">
    <div class="graph">
      <p>{{ this.toSortArray }}</p>
    </div>

    <div class="options">
      <div>
        <label for="number" :style="{ 'background-color': 'white' }"
          >Elements in array</label
        >
        <select
          id="number"
          v-model="number"
          :disabled="sorting"
          @change="updateArray"
        >
          <option>100</option>
          <option>1000</option>
          <option>10000</option>
          <option>25000</option>
          <option>50000</option>
        </select>
      </div>

      <div>
        <button
          :disabled="sorting"
          :class="sorting ? 'disabledbutton' : 'button'"
          @click="Sort"
        >
          Sort!
        </button>
      </div>

      <div>
        <button
          :disabled="sorting"
          :class="sorting ? 'disabledbutton' : 'button'"
          @click="shuffle(this.toSortArray)"
        >
          Shuffle
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MergeSort",
  data() {
    return {
      number: 100,
      toSortArray: [],
      sorting: false,
    };
  },

  methods: {
    async mergeSort(array) {
      if (array.length == 1) {
        return array;
      }

      var middle = Math.floor(array.length / 2);
      var restLenght = array.length - middle;

      var arrayOne = [];
      var arrayTwo = [];

      for (var i = 0; i < middle; i++) {
        arrayOne[i] = array[i];
      }

      for (var j = 0; j < restLenght; j++) {
        arrayTwo[j] = array[middle + j];
      }

      arrayOne = await this.mergeSort(arrayOne);
      arrayTwo = await this.mergeSort(arrayTwo);

      return await this.merge(arrayOne, arrayTwo);
    },

    async merge(arrayOne, arrayTwo) {
      let arrayThree = [];

      while (arrayOne[0] != null && arrayTwo[0] != null) {
        if (arrayOne[0] > arrayTwo[0]) {
          arrayThree.push(arrayTwo[0]);
          arrayTwo.splice(0, 1);
        } else {
          arrayThree.push(arrayOne[0]);
          arrayOne.splice(0, 1);
        }
      }

      while (arrayOne[0] != null) {
        arrayThree.push(arrayOne[0]);
        arrayOne.splice(0, 1);
      }

      while (arrayTwo[0] != null) {
        arrayThree.push(arrayTwo[0]);
        arrayTwo.splice(0, 1);
      }

      return arrayThree;
    },

    async Sort() {
      this.toSortArray = await this.mergeSort(this.toSortArray);
    },

    shuffle(array) {
      for (var i = 0; i < array.length; i++) {
        array[i] = Math.floor(Math.random() * 50 + 1);
      }
    },

    updateArray() {
      this.toSortArray = [];
      console.log(this.number);
      this.createArray();
    },

    createArray() {
      for (var i = 0; i < this.number; i++) {
        this.toSortArray.push(Math.floor(Math.random() * 50) + 1);
      }
    },
  },

  beforeMount() {
    this.createArray();
  },
};
</script>

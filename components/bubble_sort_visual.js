app.component('bubblesort', {
    data() {
        return {
            number: 25,
            toSortArray: [],
            sorting: false,
            selected: {
                index: 0
            }
        }
    },
    methods: {
        async sort(array) {
            this.sorting = true

            for(var i = 0; i < array.length; i++){
                let swaped = false

                for(var j = 0; j < array.length - 1 - i; j++) {
                    await sleep(100)
                    this.selected.index = j + 1

                    if (array[j] > array[j + 1]) {
                        swaped = true
                        let temp = array[j]
                        array[j] = array[j + 1]
                        array[j + 1] = temp
                    }

                    if (!this.sorting) {
                        this.selected.index = 0
                        return
                    }
                    await sleep(100)
                }
                if (!swaped) break;

            }

            this.sorting = false
        },

        stop() {
            this.sorting = false
        },

        shuffle(array) {
            for (var i = 0; i < array.length; i++) {
                array[i] = Math.floor((Math.random() * 50) + 1)
            }
        },

        createArray() {
            for (var i = 0; i < this.number; i++) {
                this.toSortArray.push(Math.floor(Math.random() * 50) + 1)
            }
        }
    },
    beforeMount() {
        this.createArray()
    },
    template:
    /*html*/
    `
    <div class="bubble">
        <div class="graph">

            <div v-for="(elments, index) in toSortArray" 
            :style="index == selected.index ? 

            { height: 10 * toSortArray[index] + 'px', width: 50 + 'px', 'background-color' : 'red', 
            'border-width' : 0.5 + 'px', 'border-color' : 'black', 'border-style' : 'solid'}

            : { height: 10 * toSortArray[index] + 'px', width: 50 + 'px', 'background-color' : '#4e4e4e', 
            'border-width' : 0.5 + 'px', 'border-color' : 'black', 'border-style' : 'solid'}"></div>

        </div>
        <div class="options">
            <div>
                <label for="number">Elements in array</label>
                <select id="number" v-model="number" :disabled="sorting">
                    <option>25</option>
                    <option>20</option>
                    <option>15</option>
                    <option>10</option>
                    <option>5</option>
                </select>
            </div>
                
            <div>
                <button :disabled="sorting" :class="(sorting)? 'disabledbutton' : 'button'"
                @click="sort(this.toSortArray)">Sort!</button>
            </div>
            
            <div>
                <button :disabled="!sorting" :class="(!sorting)? 'disabledbutton' : 'button'"
                @click="stop">Stop</button>
            </div>

            <div>
                <button :disabled="sorting" :class="(sorting)? 'disabledbutton' : 'button'"
                @click="shuffle(this.toSortArray)">Shuffle</button>
            </div>

        </div>
    </div>
    `,
})

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}
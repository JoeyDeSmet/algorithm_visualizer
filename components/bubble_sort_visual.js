app.component('bubble-sort', {
    template:
    /*html*/
    `
    <div class="bubble">
        <div class="graph">
            <div v-if="!sorting" v-for="(elments, index) in array" v-bind:style="{ height: 10 * array[index] + 'px', width: 50 + 'px' ,'background-color': '#4e4e4e' }"></div>
            <div v-else v-for="(elments, index) in toSortArray" v-bind:style="{ height: 10 * array[index] + 'px', width: 50 + 'px' ,'background-color': '#4e4e4e' }"></div>
        </div>

        <div class="options">
            <div>
                <label for="number">Elements in array</label>
                <select id="number" v-model="number">
                    <option>25</option>
                    <option>20</option>
                    <option>15</option>
                    <option>10</option>
                    <option>5</option>
                </select>
            </div>
                
            <div>
                <button class="button"
                @click="startSort">Sort!</button>
            </div>
            
            <div>
                <button class="button"
                @click="shuffle">Shuffle</button>
            </div>
        </div>
    </div>
    `,
    data() {
        return {
            number: 25,
            toSortArray: [],
            sorting: false
        }
    },
    methods: {
        startSort() {
            if (this.sorting) return
            this.sorting = true
            this.toString = sort(this.toSortArray)
        },
        shuffle() {
            this.sorting = false
        }
    },
    computed: {
        array() {
            let tmp = []
            for (var i = 0; i < this.number; i++) {
                tmp.push(Math.floor(Math.random() * 50))
            }
            this.toSortArray = tmp
            return tmp
        }
    }
})
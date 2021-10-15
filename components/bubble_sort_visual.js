app.component('bubble-sort', {
    template:
    /*html*/
    `
    <div class="bubble">
        <div class="graph">
            <div v-if="!sorting" v-for="(elments, index) in array" :style="{ height: 10 * array[index] + 'px', width: 50 + 'px' ,'background-color': '#4e4e4e' }"></div>
            <div v-else v-for="(elments, index) in toSortArray" 
            :style="index == selected.index ? { height: 10 * array[index] + 'px', width: 50 + 'px', 'background-color' : 'red'}
            : { height: 10 * array[index] + 'px', width: 50 + 'px', 'background-color' : '#4e4e4e'}">
            </div>
        </div>

        <div class="options">
            <div>
                <label for="number">Elements in array</label>
                <select id="number" v-model="number" v-if="!sorting">
                    <option>25</option>
                    <option>20</option>
                    <option>15</option>
                    <option>10</option>
                    <option>5</option>
                </select>
                <select id="number" v-model="number" v-else disabled>
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
                @click="stop">Stop</button>
            </div>
        </div>
    </div>
    `,
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
        async startSort() {
            if (this.sorting) return
            this.sorting = true
            await sort(this.toSortArray, this.selected)
            this.sorting = false
        },
        stop() {
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
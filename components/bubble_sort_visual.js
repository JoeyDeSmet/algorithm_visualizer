app.component('bubble-sort', {
    template:
    /*html*/
    `<div class="bubble">
        <div class="options">
            <div>
                <label for="number">Elements in array</label>
                <select id="number">
                    <option>25</option>
                    <option>20</option>
                    <option>15</option>
                    <option>10</option>
                    <option>5</option>
                </select>
            </div>
                
            <div>
                <button class="button"
                @click="sort">Sort!</button>
            </div>
            
            <div>
                <button class="button">Shuffle</button>
            </div>
        </div>
        <div class="graph">

        </div>
    </div>
    `,
    data() {
        return {
            number: null,
        }
    },
    methods: {
        sort() {
            // Visualize sorting
        },
    }
})
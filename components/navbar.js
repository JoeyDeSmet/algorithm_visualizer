app.component('nav-bar', {
    template: 
    /*html*/
    `<div class="nav">
        <ul>
            <li><a @click="Home">Home</a></li>
            <li><a @click="Bubble">Bubble sort</a></li>
        </ul>
    </div>`,
    methods: {
        Home() {
            this.$emit('page-change',  "Home")
        },
        Bubble() {
            this.$emit('page-change', "Bubble")
        }
    }
})
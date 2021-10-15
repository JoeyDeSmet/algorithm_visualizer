const app = Vue.createApp({
    data() {
        return {
            active_page: "Home"
        }
    },
    methods: {
        ChangePage(name) {
            this.active_page = name
        }
    }
})
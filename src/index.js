const app = Vue.createApp({
    data() {
        return {
            active_page: "Home",
            count: 0
        }
    },
    methods: {
        ChangePage(name) {
            this.active_page = name
        },
    },
})

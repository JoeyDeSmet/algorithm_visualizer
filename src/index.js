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


function loadScript(url)
{
    var loader = document.getElementsByTagName('body')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    loader.appendChild(script);
}

// algorithm scrips
// loadScript('../src/algorithms/bubbleSort.js')
loadScript('../src/algorithms/mergeSort.js')

// Does not work
// // Component scripts
// loadScript('../components/home.js')
// loadScript('../components/navbar.js')
// loadScript('../components/bubble_sort_visual.js')

//app.mount("#app")
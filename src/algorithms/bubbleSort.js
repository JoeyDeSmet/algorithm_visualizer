var sorting = false

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

async function sort(array, selected) {
    for(var i = 0; i < array.length; i++){
        let swaped = false
        for(var j = 0; j < array.length - 1 - i; j++) {
            await sleep(100)
            selected.index = j + 1
            if (array[j] > array[j + 1]) {
                swaped = true
                let temp = array[j]
                array[j] = array[j + 1]
                array[j + 1] = temp
            }
            if (!app._instance.ctx.$refs.bubbleRef.$data.sorting) return
            await sleep(100)
        }
        if (!swaped) break;
    }
}
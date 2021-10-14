function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

async function sort(array) {
    let copy = array

    for(var i = 0; i < copy.length; i++){
        let swaped = false
        for(var j = 0; j < copy.length - 1 - i; j++) {
            // Return pointer
            console.log(j)
            await sleep(500)
            if (copy[j] > copy[j + 1]) {
                // Return two that swap
                console.log(`${copy[j]} > ${copy[j + 1]} `)
                swaped = true
                let temp = copy[j]
                copy[j] = copy[j + 1]
                copy[j + 1] = temp
            }
            await sleep(500)
        }
        if (!swaped) break;
    }

    return copy
}
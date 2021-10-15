// I don't know how to visualize this 😨 

function mergeSort(array) {
    if (array.length == 1) {
        return array
    }
        
    var middle = Math.floor(array.length / 2)
    var restLenght = array.length - middle

    var arrayOne = []
    var arrayTwo = []

    for (var i = 0; i < middle; i++) {
        //console.log(i)
        arrayOne[i] = array[i]
    }

    for (var i = 0; i < restLenght; i++) {
        arrayTwo[i] = array[middle + i]
    }

    arrayOne = mergeSort(arrayOne)
    arrayTwo = mergeSort(arrayTwo)

    return merge(arrayOne, arrayTwo)
}

function merge(arrayOne, arrayTwo) {
    arrayThree = []

    while (arrayOne[0] != null && arrayTwo[0] != null) {
        if (arrayOne[0] > arrayTwo[0]) {
            arrayThree.push(arrayTwo[0])
            arrayTwo.splice(0, 1)
        }
        else {
            arrayThree.push(arrayOne[0])
            arrayOne.splice(0, 1)
        }
    }

    while (arrayOne[0] != null) {
        arrayThree.push(arrayOne[0])
        arrayOne.splice(0, 1)
    }

    while (arrayTwo[0] != null) {
        arrayThree.push(arrayTwo[0])
        arrayTwo.splice(0, 1)
    }

    return arrayThree
}
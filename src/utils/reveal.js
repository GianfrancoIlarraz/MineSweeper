export const revealed = (arr, x, y, newNonMinesCount) => {
    if (arr[x][y].revealed) {
        return arr;
    }

    //Stack of all the cells which we would like to reveal
    let flipped = []
    flipped.push(arr[x][y])
    while (flipped.length !== 0) {
        let single = flipped.pop()

        if (!single.revealed) {
            newNonMinesCount--
            single.revealed = true
        }

        if (single.value !== 0) {
            break
        }

        //top left
        if (
            single.x > 0 &&
            single.y > 0 &&
            arr[single.x - 1][single.y - 1].value === 0 &&
            !arr[single.x - 1][single.y - 1].revealed
        ) {
            flipped.push(arr[single.x - 1][single.y - 1])
        }
        //bottom right
        if (
            single.x < arr.length - 1 &&
            single.y < arr.length - 1 &&
            arr[single.x + 1][single.y + 1].value === 0 &&
            !arr[single.x + 1][single.y + 1].revealed
        ) {
            flipped.push(arr[single.x + 1][single.y + 1])
        }
        //bottom left
        if (
            single.x < arr.length - 1 &&
            single.y > 0 &&
            arr[single.x + 1][single.y - 1].value === 0 &&
            !arr[single.x + 1][single.y - 1].revealed
        ) {
            flipped.push(arr[single.x + 1][single.y - 1])
        }
        //top right
        if (
            single.x > 0 &&
            single.y < arr.length - 1 &&
            arr[single.x - 1][single.y + 1].value === 0 &&
            !arr[single.x - 1][single.y + 1].revealed
        ) {
            flipped.push(arr[single.x - 1][single.y + 1])
        }
        // Single ones
        //Top
        if (
            single.x > 0 &&
            arr[single.x - 1][single.y].value === 0 &&
            !arr[single.x - 1][single.y].revealed
        ) {
            flipped.push(arr[single.x - 1][single.y])
        }
        //Bottom
        if (
            single.x < arr.length - 1 &&
            arr[single.x + 1][single.y].value === 0 &&
            !arr[single.x + 1][single.y].revealed
        ) {
            flipped.push(arr[single.x + 1][single.y])
        }
        //Left
        if (
            single.y > 0 &&
            arr[single.x][single.y - 1].value === 0 &&
            !arr[single.x][single.y - 1].revealed
        ) {
            flipped.push(arr[single.x][single.y - 1])
        }
        //Right
        if (
            single.y < arr[0].length - 1 &&
            arr[single.x][single.y + 1].value === 0 &&
            !arr[single.x][single.y + 1].revealed
        ) {
            flipped.push(arr[single.x][single.y + 1])
        }

        //Start Revealing
        if (
            single.x > 0 &&
            single.y > 0 &&
            !arr[single.x - 1][single.y - 1].revealed
        ) {
            //Top Left Reveal

            arr[single.x - 1][single.y - 1].revealed = true;
            newNonMinesCount--;
        }

        if (single.y > 0 && !arr[single.x][single.y - 1].revealed) {
            // Left Reveal
            arr[single.x][single.y - 1].revealed = true;
            newNonMinesCount--;
        }

        if (
            single.x < arr.length - 1 &&
            single.y > 0 &&
            !arr[single.x + 1][single.y - 1].revealed
        ) {
            //Bottom Left Reveal
            arr[single.x + 1][single.y - 1].revealed = true;
            newNonMinesCount--;
        }

        if (single.x > 0 && !arr[single.x - 1][single.y].revealed) {
            //Top Reveal
            arr[single.x - 1][single.y].revealed = true;
            newNonMinesCount--;
        }

        if (single.x < arr.length - 1 && !arr[single.x + 1][single.y].revealed) {
            // Bottom Reveal
            arr[single.x + 1][single.y].revealed = true;
            newNonMinesCount--;
        }

        if (
            single.x > 0 &&
            single.y < arr[0].length - 1 &&
            !arr[single.x - 1][single.y + 1].revealed
        ) {
            // Top Right Reveal
            arr[single.x - 1][single.y + 1].revealed = true;
            newNonMinesCount--;
        }

        if (single.y < arr[0].length - 1 && !arr[single.x][single.y + 1].revealed) {
            //Right Reveal
            arr[single.x][single.y + 1].revealed = true;
            newNonMinesCount--;
        }

        if (
            single.x < arr.length - 1 &&
            single.y < arr[0].length - 1 &&
            !arr[single.x + 1][single.y + 1].revealed
        ) {
            // Bottom Right Reveal
            arr[single.x + 1][single.y + 1].revealed = true;
            newNonMinesCount--;
        }
    }

    return { arr, newNonMinesCount };
};
const getPosition = (locator, min, max, bottom, top) => {
    for (let i = 0; i < locator.length; i++) {
        const diff = (max + 1 - min) / 2;
        if (locator[i] === bottom) {
            max -= diff;
        } else if (locator[i] === top) {
            min += diff;
        }
    }

    return min;
};

module.exports = (input) => {
    const lines = input.trim().split('\n');
    const seatsNumber = 128 * 8;
    const seats = new Array(seatsNumber);

    let highestID = 0;
    lines.forEach((boardingPass) => {
        const row = getPosition(boardingPass.substring(0, 7), 0, 127, 'F', 'B');
        const column = getPosition(boardingPass.substring(7, 10), 0, 7, 'L', 'R');
        const id = row * 8 + column;
        if (id > highestID) {
            highestID = id;
        }

        seats[id] = true;
    });

    let mySeatId = 0;
    for (let i = 1; i < seatsNumber - 1; i++) {
        if (!seats[i] && seats[i - 1] && seats[i + 1]) {
            mySeatId = i;
            break;
        }
    }

    console.log('Part 1: ', highestID);
    console.log('Part 2: ', mySeatId);
};

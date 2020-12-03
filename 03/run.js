const TREE = '#';

module.exports = (input) => {
    const start = process.hrtime();
    const lines = input.trim().split('\n');
    const width = lines[0].length;
    const height = lines.length;

    const slide = (slopeX, slopeY) => {
        let x = 0;
        let y = 0;
        let count = 0;

        do {
            x += slopeX;
            if (x >= width) {
                x -= width;
            }
            y += slopeY;

            if (lines[y][x] === TREE) {
                count++;
            }

        } while (y < height - slopeY);

        return count;
    };

    console.log('Part 1: ', slide(3, 1));
    console.log('Part 2: ', slide(1, 1) * slide(3, 1) * slide(5, 1) * slide(7, 1) * slide(1, 2));
    let time = process.hrtime(start);
    console.log('Time: ', (1000 * time[0] + Math.floor(time[1] / 1000000)) + 'ms');
};

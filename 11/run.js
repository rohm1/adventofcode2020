const EMPTY = 'L';
const OCCUPIED = '#';

module.exports = (input) => {
    const map = input.trim().split('\n').map(line => [...line]);

    const isVisibleOccupiedSeatInDirection = (map, y, x, yDir, xDir, length) => {
        for (let i = y + yDir, j = x + xDir, l = 0; l < length && i >= 0 && i < map.length && j >= 0 && j < map[0].length; i += yDir, j += xDir, l++) {
            if (map[i][j] === OCCUPIED) {
                return 1;
            }

            if (map[i][j] === EMPTY) {
                break;
            }
        }

        return 0;
    };

    const conways = (map, length, maxOccupied) => {
        let crtConfig;
        let newConfig = map.map(line => line.slice());
        let same;
        do {
            crtConfig = newConfig.map(line => line.slice());
            same = true;

            for (let i = 0; i < crtConfig.length; i++) {
                for (let j = 0; j < crtConfig[0].length; j++) {
                    const occupied = isVisibleOccupiedSeatInDirection(crtConfig, i, j, -1, -1, length)
                                   + isVisibleOccupiedSeatInDirection(crtConfig, i, j, 0, -1, length)
                                   + isVisibleOccupiedSeatInDirection(crtConfig, i, j, 1, -1, length)
                                   + isVisibleOccupiedSeatInDirection(crtConfig, i, j, 1, 0, length)
                                   + isVisibleOccupiedSeatInDirection(crtConfig, i, j, 1, 1, length)
                                   + isVisibleOccupiedSeatInDirection(crtConfig, i, j, 0, 1, length)
                                   + isVisibleOccupiedSeatInDirection(crtConfig, i, j, -1, 1, length)
                                   + isVisibleOccupiedSeatInDirection(crtConfig, i, j, -1, 0, length);

                    if (crtConfig[i][j] === EMPTY && occupied === 0) {
                        newConfig[i][j] = OCCUPIED;
                        same = false;
                    } else if (crtConfig[i][j] === OCCUPIED && occupied >= maxOccupied) {
                        newConfig[i][j] = EMPTY;
                        same = false;
                    }
                }
            }
        } while (!same);

        return newConfig.join('').match(new RegExp(OCCUPIED, 'g')).length;
    };

    console.log('Part 1: ', conways(map, 1, 4));
    console.log('Part 2: ', conways(map, 2 * map.length, 5));
};

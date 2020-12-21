const rotate = (originalData) => {
    const data = [];
    for (let i = 0; i < originalData[0].length; i++) {
        let l = '';
        for (let j = 0; j < originalData.length; j++) {
            l += originalData[j][i];
        }
        data[i] = l;
    }
    return data;
};

const flip = (originalData) => {
    const data = [];
    for (let i = 0; i < originalData.length; i++) {
        data[i] = originalData[i].split('').reverse().join('');
    }
    return data;
};

const flipTop = (originalData) => {
    const data = [];
    for (let i = 0; i < originalData.length; i++) {
        data[i] = originalData[originalData.length - 1 - i];
    }
    return data;
};

const transform = (data, callback, defaultValue) => {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 2; j++) {
            for (let k = 0; k < 2; k++) {
                const result = callback(data);
                if (result !== undefined) {
                    return result;
                }
                data = flipTop(data);
            }
            data = flip(data);
        }
        data = rotate(data);
    }
    return defaultValue;
}

class Tile {
    constructor(id, data) {
        this.id = id;
        this.data = data.map((line) => line.join(''));
        this.edges = [
            [...this.top()].join(''),
            [...this.top()].reverse().join(''),
            [...this.bottom()].join(''),
            [...this.bottom()].reverse().join(''),
            [...this.left()].join(''),
            [...this.left()].reverse().join(''),
            [...this.right()].join(''),
            [...this.right()].reverse().join(''),
        ];
        this.matches = new Set();
    }

    match(tile) {
        this.edges.forEach((edge) => {
            if (tile.edges.indexOf(edge) > -1) {
                this.matches.add(tile.id);
                tile.matches.add(this.id);
            }
        })
    }

    top() {
        return this.data[0];
    }

    bottom() {
        return this.data[this.data.length - 1];
    }

    left() {
        let l = '';
        for (let i = 0; i < this.data.length; i++) {
            l += this.data[i][0];
        }
        return l;
    }

    right() {
        let r = '';
        for (let i = 0; i < this.data.length; i++) {
            r += this.data[i][this.data[i].length - 1];
        }
        return r;
    }

    matchEdge(tile, right) {
        return transform(tile.data, (data) => {
            tile.data = data;
            if (right && this.right() === tile.left() || !right && this.bottom() === tile.top()) {
                return true;
            }
        }, false);
    }
}

module.exports = (input) => {
    const lines = input.trim().split('\n');
    lines.push('');

    const tiles = new Map();
    let id;
    let data = [];
    lines.forEach((line) => {
        let match;
        if (!line) {
            const t = new Tile(id, data);
            tiles.forEach((tile) => {
                tile.match(t);
            });
            tiles.set(id, t);
            data = [];
        } else if (match = line.match(/Tile (\d+):/)) {
            id = parseInt(match[1], 10);
        } else {
            data.push([...line]);
        }
    });

    let corners = [];

    // part 1
    let sum = 1;
    tiles.forEach((tile) => {
        if (tile.matches.size === 2) {
            corners.push(tile.id);
            sum *= tile.id;
        }
    });

    // position first tile
    const firstTile = tiles.get(corners[corners.length - 1]);
    let firstTileNeighbours = Array.from(firstTile.matches);
    transform(firstTile.data, (data) => {
        firstTile.data = data;
        if (firstTile.matchEdge(tiles.get(firstTileNeighbours[0]), true) && firstTile.matchEdge(tiles.get(firstTileNeighbours[1]), false)
            || firstTile.matchEdge(tiles.get(firstTileNeighbours[0]), false) && firstTile.matchEdge(tiles.get(firstTileNeighbours[1]), true)
        ) {
            return true;
        }
    });

    // order tiles in image array
    const image = [[corners.pop()]];
    const placed = new Set();
    placed.add(firstTile.id);
    let i = 0;
    let j = 0;
    do {
        const crtTile = tiles.get(image[i][j]);
        crtTile.matches.forEach((matchingTile) => {
            if (!placed.has(matchingTile)) {
                if (crtTile.matchEdge(tiles.get(matchingTile), true)) {
                    crtTile.matches.delete(matchingTile);
                    tiles.get(matchingTile).matches.delete(crtTile.id);
                    image[i][j + 1] = matchingTile;
                    j++;

                    placed.add(matchingTile);
                    if ((i === 0 && corners.indexOf(matchingTile) > -1)
                        || (i > 0 && j === image[0].length - 1)
                    ) {
                        j = 0;
                        i++;
                    }

                    corners = corners.filter((c) => c !== matchingTile);

                    if (j === 0 && corners.length) {
                        image[i] = [];
                        const previousLineFirstTile = tiles.get(image[i - 1][0]);
                        previousLineFirstTile.matches.forEach((lastMatchingTile) => {
                            previousLineFirstTile.matchEdge(tiles.get(lastMatchingTile), false);
                            placed.add(lastMatchingTile);
                            previousLineFirstTile.matches.delete(lastMatchingTile);
                            tiles.get(lastMatchingTile).matches.delete(previousLineFirstTile.id);
                            image[i][j] = lastMatchingTile;
                            corners = corners.filter((c) => c !== lastMatchingTile);
                        });
                    }
                }
            }
        });
    } while (corners.length);

    // reconstruct pixels
    let pixels = new Array((firstTile.data.length - 2) * image.length).fill('.')
        .map(() => new Array((firstTile.data[0].length - 2) * image[0].length).fill('.'));

    for (let i = 0; i < image.length; i++) {
        for (let j = 0; j < image[i].length; j++) {
            const data = tiles.get(image[i][j]).data;
            for (let ii = 1; ii < data.length - 1; ii++) {
                for (let jj = 1; jj < data[ii].length - 1; jj++) {
                    pixels[i * (data.length - 2) + ii - 1][j * (data[ii].length - 2) + jj - 1] = data[ii][jj];
                }
            }
        }
    }

    pixels = pixels.map(line => line.join(''));

    // count monsters
    const count = transform(pixels, (pixels) => {
        let count = 0;
        for (let ii = 0; ii < pixels.length - 1; ii++) {
            for (let jj = 0; jj < pixels.length; jj++) {
                if (pixels[ii][jj + 18] === '#'
                    && pixels[ii + 1][jj] === '#' && pixels[ii + 1][jj + 5] === '#' && pixels[ii + 1][jj + 6] === '#' && pixels[ii + 1][jj + 11] === '#' && pixels[ii + 1][jj + 12] === '#' && pixels[ii + 1][jj + 17] === '#' && pixels[ii + 1][jj + 18] === '#' && pixels[ii + 1][jj + 19] === '#'
                    && pixels[ii + 2][jj + 1] === '#' && pixels[ii + 2][jj + 4] === '#' && pixels[ii + 2][jj + 7] === '#' && pixels[ii + 2][jj + 10] === '#' && pixels[ii + 2][jj + 13] === '#' && pixels[ii + 2][jj + 16] === '#'
                ) {
                    count++;
                }
            }
        }

        return count || undefined;
    });

    console.log('Part 1: ', sum);
    console.log('Part 2: ', [...pixels.join('')].filter(c => c === '#').length - count * 15);
};

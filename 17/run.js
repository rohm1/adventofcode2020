const ACTIVE = '#';

module.exports = (input) => {
    const lines = input.trim().split('\n');

    const mapSet = (map, coords, v) => {
        map.set(coords.join('_'), v);
    };

    const mapHas = (map, coords) => {
        return map.has(coords.join('_'));
    };

    const countActiveNeighboursRecursive = (map, originalCoord, coord, neighbour) => {
        let count = 0;
        for (let i = coord[0] - 1; i < coord[0] + 2; i++) {
            const n = [...neighbour];
            n.push(i);

            if (coord.length > 1) {
                count += countActiveNeighboursRecursive(map, originalCoord, coord.slice(1), n);
            } else {
                for (let j = 0; j < originalCoord.length; j++) {
                    if (originalCoord[j] !== n[j]) {
                        if (mapHas(map, n)) {
                            count++;
                        }
                        break;
                    }
                }
            }
        }

        return count;
    };

    const searchRecursive = (bounds, coord, crtGen, newGen) => {
        for (let i = bounds[0] - 1; i < bounds[1] + 2; i++) {
            const c = [...coord];
            c.push(i);

            if (bounds.length > 2) {
                searchRecursive(bounds.slice(2), c, crtGen, newGen);
            } else {
                const activeNeighbours = countActiveNeighboursRecursive(crtGen, c, c, []);
                if ((activeNeighbours >= 2 && activeNeighbours <= 3 && mapHas(crtGen, c))
                    || (activeNeighbours === 3 && !mapHas(crtGen, c))
                ) {
                    mapSet(newGen, c, ACTIVE);
                }
            }
        }
    };

    const run = (dimensions, cycles) => {
        const grid = new Map();
        lines.forEach((line, lineNr) => {
            [...line].forEach((c, i) => {
                if (c === ACTIVE) {
                    const coords = [i, lines.length - 1 - lineNr];
                    for (let i = coords.length; i < dimensions; i++) {
                        coords.push(0);
                    }
                    mapSet(grid, coords, c);
                }
            });
        });

        let crtGen = new Map(grid);
        for (let i = 0; i < cycles; i++) {
            const newGen = new Map();
            const bounds = [];
            for (let j = 0; j < dimensions; j++) {
                bounds[2 * j] = 10000000;
                bounds[2 * j + 1] = -10000000;
            }

            for (let position of crtGen.keys()) {
                position.split('_').map(n => parseInt(n, 10)).forEach((n, j) => {
                    if (n < bounds[2 * j]) {
                        bounds[2 * j] = n;
                    }
                    if (n > bounds[2 * j + 1]) {
                        bounds[2 * j + 1] = n;
                    }
                });
            }

            searchRecursive(bounds, [], crtGen, newGen);

            crtGen = newGen;
        }

        return crtGen;
    };

    console.log('Part 1: ', run(3, 6).size);
    console.log('Part 2: ', run(4, 6).size);
};

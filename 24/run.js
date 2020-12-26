module.exports = (input) => {
    const lines = input.trim().split('\n');

    const directions = new Map();
    directions.set('e', {x: 1, y: 0});
    directions.set('se', {x: 0, y: -1});
    directions.set('sw', {x: -1, y: -1});
    directions.set('w', {x: -1, y: 0});
    directions.set('nw', {x: 0, y: 1});
    directions.set('ne', {x: 1, y: 1});

    const map = new Set();
    lines.forEach((line) => {
        let x = 0;
        let y = 0;
        for (let i = 0; i < line.length; i++) {
            let d = line[i];
            if (!directions.has(d)) {
                i++;
                d += line[i];
            }
            x += directions.get(d).x;
            y += directions.get(d).y;
        }
        const pos = x + '_' + y;
        if (!map.has(pos)) {
            map.add(pos);
        } else {
            map.delete(pos);
        }
    });

    console.log('Part 1: ', map.size);

    let crtGen = new Set(map);
    for (let day = 0; day < 100; day++) {
        let minX = 10000000;
        let maxX = -10000000;
        let minY = 10000000;
        let maxY = -10000000;
        crtGen.forEach((pos) => {
            let [x, y] = pos.split('_');
            x = parseInt(x, 10);
            y = parseInt(y, 10);
            if (x < minX) { minX = x; }
            if (x > maxX) { maxX = x; }
            if (y < minY) { minY = y; }
            if (y > maxY) { maxY = y; }
        });

        const newGen = new Set();
        for (let x = minX - 1; x < maxX + 2; x++) {
            for (let y = minY - 1; y < maxY + 2; y++) {
                let pos = x + '_' + y;
                let neighbours = 0;
                directions.forEach((dir) => {
                    if (crtGen.has((x + dir.x) + '_' + (y + dir.y))) {
                        neighbours++;
                    }
                });

                if ((crtGen.has(pos) && (neighbours === 1 || neighbours === 2))
                    || (!crtGen.has(pos) && neighbours === 2)
                ) {
                    newGen.add(pos);
                }
            }
        }

        crtGen = new Set(newGen);
    }

    console.log('Part 2: ', crtGen.size);
};

const SUM = 2020;

module.exports = (input) => {
    const numbers = input.split('\n');

    const map = {};
    const map2 = {};

    const check = (n) => {
        if (map[n]) {
            console.log('Part 1: ', n * map[n]);
        }

        if (map2[n]) {
            console.log('Part 2: ', n * map2[n].n * map[map2[n].k]);
            process.exit(0);
        }
    };

    numbers.forEach((n) => {
        Object.keys(map).forEach((k) => {
            map2[k - n] = {k, n};
        });
        map[SUM - n] = n;
        check(n);
    });
};

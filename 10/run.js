module.exports = (input) => {
    const joltages = input.trim().split('\n').map((x) => {
        return parseInt(x, 10);
    }).sort((a, b) => {
        return a < b ? -1 : 1;
    });
    joltages.unshift(0);
    joltages.push(joltages[joltages.length - 1] + 3);

    let differences = {1: 0, 2: 0, 3: 0};
    for (let i = 0; i < joltages.length - 1; i++) {
        differences[joltages[i + 1] - joltages[i]]++;
    }

    let neighbours = (new Array(joltages[joltages.length - 1])).fill(1);
    for (let i = 0; i < joltages.length; i++) {
        let inRange = 0;
        for (let j = i + 1; j < i + 4 && j < joltages.length; j++) {
            if (joltages[j] - joltages[i] < 4) {
                inRange++;
            } else {
                break;
            }
        }
        neighbours[joltages[i]] = inRange;
    }

    const branches = (new Array(joltages[joltages.length - 1])).fill(0);
    branches[0] = 1;
    for (let i = 0; i < neighbours.length - 2; i++) {
        for (let j = 0; j < neighbours[i]; j++) {
            branches[i + j + 1] += branches[i];
        }
    }

    console.log('Part 1: ', differences[1] * differences[3]);
    console.log('Part 2: ', branches[branches.length - 1]);
};

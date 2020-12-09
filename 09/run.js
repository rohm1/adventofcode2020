const HEADER_LENGTH = 25;

module.exports = (input) => {
    const lines = input.trim().split('\n').map((x) => {
        return parseInt(x, 10);
    });

    let part1Index;
    for (let i = HEADER_LENGTH; i < lines.length; i++) {
        let found = false;
        for (let j = i - HEADER_LENGTH; !found && j < i; j++) {
            for (let k = j + 1; k < i; k++) {
                if (lines[j] + lines[k] === lines[i]) {
                    found = true;
                    break;
                }
            }
        }

        if (!found) {
            part1Index = i;
            break;
        }
    }

    let part2Range;
    for (let i = 0; i < part1Index - 1; i++) {
        let sum = 0;
        let j = -1;
        do {
            j++;
            sum += lines[i + j];
        } while (sum < lines[part1Index]);

        if (sum === lines[part1Index]) {
            part2Range = lines.slice(i, i + j + 1);
            break;
        }
    }

    console.log('Part 1: ', lines[part1Index]);
    console.log('Part 2: ', Math.min(...part2Range) + Math.max(...part2Range));
};

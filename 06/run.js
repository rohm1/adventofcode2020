module.exports = (input) => {
    const lines = input.trim().split('\n');
    lines[lines.length] = '';

    let count1 = 0;
    let count2 = 0;
    let groupData = [];

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();

        if (!line) {
            count1 += new Set(''.concat(...groupData)).size;
            count2 += groupData
                .splice(1)
                .reduce((accumulator, currentValue) => accumulator.filter((x) => currentValue.includes(x)), [...groupData[0]])
                .length;
            groupData = [];
            continue;
        }

        groupData.push(line);
    }

    console.log('Part 1: ', count1);
    console.log('Part 2: ', count2);
};

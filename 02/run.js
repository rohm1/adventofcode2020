module.exports = (input) => {
    const lines = input.split('\n');

    let validCount1 = 0;
    let validCount2 = 0;
    lines.forEach((line) => {
        line = line.trim();
        if (!line.length) {
            return;
        }

        const dashPosition = line.indexOf('-');
        const periodPosition = line.indexOf(':');
        const min = parseInt(line.substring(0, dashPosition), 10);
        const max = parseInt(line.substring(dashPosition + 1, periodPosition - 2), 10);
        const character = line.substring(periodPosition - 1, periodPosition);
        const password = line.substring(periodPosition + 2);

        let occurrences = 0;
        for (let i = 0; i < password.length; i++) {
            if (password[i] === character) {
                occurrences++;
            }
        }

        if (occurrences >= min && occurrences <= max) {
            validCount1++;
        }

        if (password[min - 1] !== password[max - 1] && (password[min - 1] === character || password[max - 1] === character)) {
            validCount2++;
        }
    });

    console.log('Part 1: ', validCount1);
    console.log('Part 2: ', validCount2);
};

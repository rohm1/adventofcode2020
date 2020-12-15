module.exports = (input) => {
    const lines = input.trim().split('\n');

    const run = (iter) => {
        const history = new Map();
        let lastNumber;
        const initialNumbers = lines[0].split(',');
        initialNumbers.forEach((n, i) => {
            n = parseInt(n, 10);
            history.set(n, i + 1);
            lastNumber = n;
        });

        let lastSeen;
        for (let i = initialNumbers.length; i < iter; i++) {
            if (history.has(lastNumber)) {
                lastSeen = history.get(lastNumber);
                history.set(lastNumber, i);
                lastNumber = i - lastSeen;
            } else {
                history.set(lastNumber, i);
                lastNumber = 0;
            }
        }

        return lastNumber;
    };

    console.log('Part 1: ', run(2020));
    console.log('Part 2: ', run(30000000));
};

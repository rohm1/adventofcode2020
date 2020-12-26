const MOD = 20201227;

const transformOnce = (value, subjectNumber) => {
    value *= subjectNumber;
    return value % MOD;
}

const transform = (subjectNumber, loopSize) => {
    let value = 1;
    for (let i = 0; i < loopSize; i++) {
        value = transformOnce(value, subjectNumber);
    }

    return value;
};

const getLoopSize = (publicKey) => {
    let value = 1;
    let i = 0;
    while (true) {
        if (value === publicKey) {
            return i;
        }
        value = transformOnce(value, 7);
        i++;
    }
};

module.exports = (input) => {
    const lines = input.trim().split('\n').map(Number);

    const cardLoopSize = getLoopSize(lines[0]);
    const doorLoopSize = getLoopSize(lines[1]);

    console.log('Part 1: ', transform(lines[1], cardLoopSize), transform(lines[0], doorLoopSize));
};

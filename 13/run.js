// from https://rosettacode.org/wiki/Chinese_remainder_theorem#C
// added bigint support
const mul_inv = (a, b) => {
    let b0 = b, t, q;
    let x0 = 0n, x1 = 1n;
    if (b === 1n) return 1n;
    while (a > 1n) {
        q = a / b;
        t = b;
        b = a % b;
        a = t;
        t = x0;
        x0 = x1 - q * x0;
        x1 = t;
    }
    if (x1 < 0n) x1 += b0;
    return x1;
};

const chinese_remainder = (n, a) => {
    let prod = 1n;
    let sum = 0n
    const len = n.length;

    for (let i = 0; i < len; i++) {
        prod *= BigInt(n[i]);
    }

    for (let i = 0; i < len; i++) {
        const ni = BigInt(n[i]);
        const p = prod / ni;
        sum += BigInt(a[i]) * mul_inv(p, ni) * p;
    }

    return sum % prod;
};

module.exports = (input) => {
    const lines = input.trim().split('\n');

    const n = [];
    const a = [];
    const earliest = parseInt(lines[0], 10);
    let busId = 0;
    let bestTime = 100000000;
    lines[1].split(',').forEach((crtId, i) => {
        if (crtId !== 'x') {
            const id = parseInt(crtId, 10);
            const diff = id - earliest % id;
            if (diff < bestTime) {
                busId = id;
                bestTime = diff;
            }
            n.push(id);
            a.push(id - i >= 0 ? id -i : id - i%id);
        }
    });

    console.log('Part 1: ', busId * bestTime);
    console.log('Part 2: ', chinese_remainder(n, a));
};

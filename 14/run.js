const BITS = 36;
const FLOAT = 'X';

const dec2bin = (n) => {
    const bits = [];
    for (let i = 0; i < BITS; i++) {
        const d = Math.pow(2, BITS - i - 1);
        const q = Math.floor(n / d);
        bits[i] = q;
        n -= q * d;
    }
    return bits;
};

const bin2dec = (bits) => {
    let n = 0n;
    for (let i = 0; i < BITS; i++) {
        n += BigInt(Math.pow(2, BITS - i - 1)) * BigInt(bits[i]);
    }
    return n;
};

module.exports = (input) => {
    const lines = input.trim().split('\n');

    const mem1 = {};
    const mem2 = {};
    let mask;
    lines.forEach((line) => {
        if (line.indexOf('mask') === 0) {
            mask = line.substring(7);
        } else {
            const m = line.match(/^mem\[(\d+)\] = (\d+)$/);
            const value = parseInt(m[2], 10);
            const bits = dec2bin(value);
            mem1[m[1]] = bin2dec(bits.map((b, i) => {
                return mask[i] === FLOAT ? b : mask[i];
            }));

            const address = dec2bin(m[1]).map((b, i) => {
                return mask[i] === '0' ? b : (mask[i] === FLOAT ? FLOAT : 1);
            });
            const combinations = Math.pow(2, address.filter(b => b === FLOAT).length);
            for (let i = 0; i < combinations; i++) {
                const addr = [...address];
                const b = dec2bin(i);
                let k = 0;
                for (let j = 0; j < BITS; j++) {
                    if (addr[j] === FLOAT) {
                        addr[j] = b[BITS - 1 - k];
                        k++;
                    }
                }
                mem2[bin2dec(addr)] = BigInt(value);
            }
        }
    });

    console.log('Part 1: ', Object.values(mem1).reduce((s, n) => s + n, 0n));
    console.log('Part 2: ', Object.values(mem2).reduce((s, n) => s + n, 0n));
};

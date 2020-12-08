module.exports = (input) => {
    const lines = input.trim().split('\n');

    const run = (program) => {
        let accumulator = 0;
        let ip = 0;
        let ended = false;
        const visited = {};
        do {
            const [inst, arg] = program[ip].split(' ');
            const argInt = parseInt(arg, 10);
            let jmp = inst === 'jmp' ? argInt : 1;
            if (visited[ip + jmp]) {
                break;
            } else if (inst === 'acc') {
                accumulator += argInt;
            }

            visited[ip] = true;
            ip += jmp;

            if (!program[ip]) {
                ended = true;
                break;
            }

        } while (true);

        return {accumulator, ended};
    }

    console.log('Part 1: ', run(lines).accumulator);

    let found = false;
    const substitutions = {jmp: 'nop', nop: 'jmp'};
    for (let x in substitutions) {
        if (substitutions.hasOwnProperty(x)) {
            for (let i = 0; i < lines.length; i++) {
                if (lines[i].substr(0, 3) === x) {
                    let p = [...lines];
                    p[i] = p[i].replace(x, substitutions[x]);
                    const res = run(p);
                    if (res.ended) {
                        console.log('Part 2: ', res.accumulator);
                        found = true;
                        break;
                    }
                }
            }
        }

        if (found) {
            break;
        }
    }
};

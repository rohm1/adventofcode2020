module.exports = (input) => {
    const lines = input.trim().split('\n');

    const evaluateExpression = (expr, mode) => {
        if (mode === 2 && [...expr].filter(x => x === '+' || x === '*').length > 1) {
            let match;
            while (match = expr.match(/([0-9]+ \+ [0-9]+)/)) {
                expr = expr.replace(match[1], evaluateExpression(match[1], mode));
            }
        }

        const parts = expr.replace('(', '').replace(')', '').split(' ');
        let result = parseInt(parts[0], 10);
        let operator;
        for (let i = 1; i < parts.length; i++) {
            if (parts[i] === '+' || parts[i] === '*') {
                operator = parts[i];
            } else if (operator === '+') {
                result += parseInt(parts[i], 10);
            } else {
                result *= parseInt(parts[i], 10);
            }
        }

        return result;
    };

    const run = (mode) => {
        let sum = 0;
        lines.forEach((line) => {
            let match;
            while (match = line.match(/(\([0-9 *+]+\))/)) {
                line = line.replace(match[1], evaluateExpression(match[1], mode));
            }

            sum += evaluateExpression(line, mode);
        });

        return sum;
    };


    console.log('Part 1: ', run(1));
    console.log('Part 2: ', run(2));
};

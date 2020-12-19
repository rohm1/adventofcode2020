const OPTIMIZED_RULE = new RegExp('^[ab|() +]+$');

module.exports = (input) => {
    const lines = input.trim().split('\n');

    const run = (lines) => {
        const rules = new Map();
        const rulesOptimized = new Map();
        let rule0Regexp;

        const optimizeRules = () => {
            while (!rulesOptimized.has('0')) {
                rules.forEach((rule, i) => {
                    const parts = rule.split(' ');
                    parts.forEach((part, j) => {
                        let repeat = part.indexOf('+') > -1;
                        if (repeat) {
                            part = part.substring(0, part.length - 1);
                        }

                        if (rulesOptimized.has(part)) {
                            if (repeat || rulesOptimized.get(part).indexOf('|') > -1) {
                                parts[j] = '(' + rulesOptimized.get(part) + ')';
                            } else {
                                parts[j] = rulesOptimized.get(part);
                            }

                            if (repeat) {
                                parts[j] += '+';
                            }
                        }
                    });
                    rules.set(i, parts.join(' '));
                    if (rules.get(i).match(OPTIMIZED_RULE)) {
                        rulesOptimized.set(i, rules.get(i));
                        rules.delete(i);
                    }
                });
            }

            rule0Regexp = new RegExp('^' + rulesOptimized.get('0').replace(/ /g, '') + '$');
        };

        let validMessages = 0;
        lines.forEach((line) => {
            if (!line) {
                optimizeRules();
            } else if (line.indexOf(':') > 0) {
                const parts = line.split(':');
                const rule = parts[1].trim().replace(/"/g, '');
                if (rule.match(OPTIMIZED_RULE)) {
                    rulesOptimized.set(parts[0], rule);
                } else {
                    rules.set(parts[0], rule);
                }
            } else if (line.match(rule0Regexp)) {
                validMessages++;
            }
        });

        return validMessages;
    }

    console.log('Part 1: ', run([...lines]));

    console.log('Part 2: ', run([...lines].map((line) => {
        switch (line) {
            case '8: 42': return '8: 42+';
            case '11: 42 31': return '11: 42 31 | 42 42 31 31 | 42 42 42 31 31 31 | 42 42 42 42 31 31 31 31 | 42 42 42 42 42 31 31 31 31 31';
            default: return line;
        }
    })));
};

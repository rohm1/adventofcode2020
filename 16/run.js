module.exports = (input) => {
    const lines = input.trim().split('\n');

    const rules = new Map();
    let myTicket;
    const nearbyTickets = [];
    for (let i = 0; i < lines.length; i++) {
        if (lines[i].match(/\w+:[\dor -]+$/)) {
            const l = lines[i].split(':');
            const validationRules = [];
            l[1].split('or').forEach((r) => {
                const rr = r.trim().split('-');
                validationRules.push({min: parseInt(rr[0], 10), max: parseInt(rr[1], 10)});
            });
            rules.set(l[0], validationRules);
        } else if (lines[i] === 'your ticket:') {
            i++;
            myTicket = lines[i].split(',').map((n) => parseInt(n, 10));
        } else if (lines[i] === 'nearby tickets:') {
            for (let j = i + 1; j < lines.length; j++) {
                nearbyTickets.push(lines[j].split(',').map((n) => parseInt(n, 10)));
            }
            break;
        }
    }

    let validNearbyTickets = [];

    // part 1
    let invalidRate = 0;
    nearbyTickets.forEach((nearbyTicket) => {
        let ticketValid = true;
        nearbyTicket.forEach((n) => {
            let valid = false;
            rules.forEach((validationRules) => {
                if (!valid) {
                    let ruleValid = false;
                    for (let i = 0; i < validationRules.length; i++) {
                        if (n >= validationRules[i].min && n <= validationRules[i].max) {
                            ruleValid = true;
                            break;
                        }
                    }
                    valid = valid || ruleValid;
                }
            });

            if (!valid) {
                invalidRate += n;
                ticketValid = false;
            }
        });

        if (ticketValid) {
            validNearbyTickets.push(nearbyTicket);
        }
    });

    // part 2
    const rulesColumnsMap = {};
    rules.forEach((validationRules, ruleName) => {
        rulesColumnsMap[ruleName] = new Array(myTicket.length).fill(0);
    });

    validNearbyTickets.forEach((nearbyTicket) => {
        nearbyTicket.forEach((n, column) => {
            rules.forEach((validationRules, ruleName) => {
                for (let i = 0; i < validationRules.length; i++) {
                    if (n >= validationRules[i].min && n <= validationRules[i].max) {
                        rulesColumnsMap[ruleName][column]++;
                        break;
                    }
                }
            });
        });
    });

    const columnsMapping = {};
    Object.keys(rulesColumnsMap).map((ruleName) => {
        return [ruleName, rulesColumnsMap[ruleName].filter(n => n === validNearbyTickets.length).length];
    }).sort((a, b) => {
        return a[1] > b[1] ? 1 : -1;
    }).forEach((r) => {
        console.log(r);
        for (let i = 0; i < rulesColumnsMap[r[0]].length; i++) {
            if (rulesColumnsMap[r[0]][i] === validNearbyTickets.length && !columnsMapping[i]) {
                columnsMapping[i] = r[0];
                break;
            }
        }
    });

    let departureMult = 1;
    Object.keys(columnsMapping).forEach((column) => {
        if (columnsMapping[column].indexOf('departure') === 0) {
            departureMult *= myTicket[column];
        }
    });

    console.log('Part 1: ', invalidRate);
    console.log('Part 2: ', departureMult);
};

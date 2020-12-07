const SEARCH_COLOR = 'shiny gold';

module.exports = (input) => {
    const lines = input.trim().split('\n');
    const rules = {};
    const containingBagsForBagColor = {};

    lines.forEach((line) => {
        const match = line.match(/^([a-z ]+) bags contain (((\d+) ([a-z ]+) bags?)(, )?((\d+) ([a-z ]+) bags?)?(, )?((\d+) ([a-z ]+) bags?)?(, )?((\d+) ([a-z ]+) bags?)?|no other bags)\./);
        rules[match[1]] = {};
        for (let i = 5; i < match.length; i += 4) {
            if (match[i] !== undefined) {
                rules[match[1]][match[i]] = parseInt(match[i - 1], 10);
                containingBagsForBagColor[match[i]] = containingBagsForBagColor[match[i]] || [];
                containingBagsForBagColor[match[i]].push(match[1]);
            }
        }
    });

    const searchContainingBags = (color) => {
        const directContainingBags = containingBagsForBagColor[color] || [];
        return directContainingBags.reduce((containingBags, currentValue) => {
            return containingBags.concat(searchContainingBags(currentValue));
        }, directContainingBags);
    };

    const searchContainedBags = (color) => {
        const containedBags = rules[color] || {};
        return Object.entries(containedBags).reduce((cnt, [containedBagColor, containedBagCount]) => {
            return cnt + containedBagCount + containedBagCount * searchContainedBags(containedBagColor);
        }, 0);
    };

    console.log('Part 1: ', (new Set(searchContainingBags(SEARCH_COLOR))).size);
    console.log('Part 2: ', searchContainedBags(SEARCH_COLOR));
};

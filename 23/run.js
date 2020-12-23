module.exports = (input) => {
    const cups = input.trim().split('').map(x => parseInt(x, 10));

    const play = (cups, moves, startingNumber) => {
        let crtNumber = startingNumber;

        for (let i = 0; i < moves; i++) {
            crtNumber = cups.get(crtNumber);
            let cut = [cups.get(crtNumber)];
            cut.push(cups.get(cut[0]));
            cut.push(cups.get(cut[1]));
            cups.set(crtNumber, cups.get(cut[2]));

            let destination;
            let k = 0;
            while (true) {
                k++;
                destination = crtNumber - k;
                if (destination < 1) {
                    if (!cut.includes(cups.size)) { destination = cups.size; }
                    else if (!cut.includes(cups.size - 1)) { destination = cups.size - 1; }
                    else if (!cut.includes(cups.size - 2)) { destination = cups.size - 2; }
                    else { destination = cups.size - 3; }
                    k = -(destination - crtNumber) - 1;
                } else if (!cut.includes(destination)) {
                    break;
                }
            }

            const destinationNumberNext = cups.get(destination);
            cups.set(destination, cut[0]);
            cups.set(cut[2], destinationNumberNext);
        }

        return cups;
    };

    const createList = (baseElements, size) => {
        const list = new Map();
        for (let i = 0; i < size; i++) {
            list.set(baseElements[i] || i + 1, baseElements[i + 1] || i + 2);
        }

        list.set(baseElements[size - 1] || size, baseElements[0]);
        return list;
    };

    const list1 = play(createList(cups, cups.length), 100, cups[cups.length - 1]);
    let result1 = '';
    let crtNumber = 1;
    while (list1.get(crtNumber) !== 1) {
        result1 += list1.get(crtNumber);
        crtNumber = list1.get(crtNumber);
    }
    console.log('Part 1:', result1);

    const list2 = play(createList(cups, 1000000), 10000000, 1000000);
    console.log('Part 2:', list2.get(1) * list2.get(list2.get(1)));
};

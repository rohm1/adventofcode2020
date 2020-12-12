module.exports = (input) => {
    const lines = input.trim().split('\n');

    const direction = {north: 0, east: 1};
    const position1 = {north: 0, east: 0};
    lines.forEach((line) => {
        const d = line[0];
        const l = parseInt(line.substr(1), 10);
        switch (d) {
            case 'N': position1.north += l; break;
            case 'S': position1.north -= l; break;
            case 'E': position1.east += l; break;
            case 'W': position1.east -= l; break;
            case 'F':
                position1.north += direction.north * l;
                position1.east += direction.east * l;
                break;
            case 'R':
            case 'L':
                const n = d === 'R' ? -1 :  1;
                for (let i = 0; i < (l / 90) % 4; i++) {
                         if (direction.north ===  0 && direction.east ===  1) {direction.north =  n; direction.east =  0;}
                    else if (direction.north === -1 && direction.east ===  0) {direction.north =  0; direction.east =  n;}
                    else if (direction.north ===  0 && direction.east === -1) {direction.north = -n; direction.east =  0;}
                    else if (direction.north ===  1 && direction.east ===  0) {direction.north =  0; direction.east = -n;}
                }
                break;
        }
    });

    console.log('Part 1: ', Math.abs(position1.north) + Math.abs(position1.east));

    const waypoint = {north: 1, east: 10};
    const position2 = {north: 0, east: 0};
    lines.forEach((line) => {
        const d = line[0];
        const l = parseInt(line.substr(1), 10);
        switch (d) {
            case 'N': waypoint.north += l; break;
            case 'S': waypoint.north -= l; break;
            case 'E': waypoint.east += l; break;
            case 'W': waypoint.east -= l; break;
            case 'F':
                let northDiff = waypoint.north - position2.north;
                let eastDiff = waypoint.east - position2.east;
                position2.north += northDiff * l;
                waypoint.north = position2.north + northDiff;
                position2.east += eastDiff * l;
                waypoint.east = position2.east + eastDiff;
                break;
            case 'R':
            case 'L':
                const nMult = d === 'R' ? -1 :  1;
                const eMult = d === 'R' ?  1 : -1;
                for (let i = 0; i < (l / 90) % 4; i++) {
                    let northDiff = waypoint.north - position2.north;
                    let eastDiff = waypoint.east - position2.east;
                    waypoint.north = position2.north + nMult * eastDiff; waypoint.east = position2.east + eMult * northDiff;
                }
                break;
        }
    });

    console.log('Part 2: ', Math.abs(position2.north) + Math.abs(position2.east));
};

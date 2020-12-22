module.exports = (input) => {
    const lines = input.trim().split('\n');

    const player1 = [];
    const player2 = [];
    let p = 1;
    lines.forEach((line) => {
        if (line.indexOf('Player') === 0) {
            p = parseInt(line.replace('Player ', '').replace(':', ''), 10);
        } else if (line) {
            const n = parseInt(line, 10);
            p === 1 ? player1.push(n) : player2.push(n);
        }
    });

   const play = (recursive, player1, player2) => {
       const p1Decks = new Set();
       const p2Decks = new Set();
       while(player1.length && player2.length) {
           const p1RoundKey = player1.join('_');
           const p2RoundKey = player2.join('_');
           if (recursive && (p1Decks.has(p1RoundKey) || p2Decks.has(p2RoundKey))) {
               return [1, player1];
           }

           p1Decks.add(p1RoundKey);
           p2Decks.add(p2RoundKey);

           const p1 = player1.shift();
           const p2 = player2.shift();

           let winner = p1 > p2 ? 1 : 2;
           if (recursive && player1.length >= p1 && player2.length >= p2) {
               winner = play(recursive, player1.slice(0, p1), player2.slice(0, p2))[0];
           }

           if (winner === 1) {
               player1.push(p1);
               player1.push(p2);
           } else {
               player2.push(p2);
               player2.push(p1);
           }
       }

       return player1.length ? [1, player1] : [2, player2];
   };

    const sum = (cards) => {
        return cards.reduce((a, c, i) => a + (cards.length - i) * c, 0);
    };

    console.log('Part 1: ', sum(play(false, [...player1], [...player2])[1]));
    console.log('Part 2: ', sum(play(true, [...player1], [...player2])[1]));
};

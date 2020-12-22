module.exports = (input) => {
    const lines = input.trim().split('\n');

    const ingredientsOccurrences = new Map();
    const ingredientsAllergensMapping = new Map();
    const allergens = new Map()
    lines.forEach((line) => {
        const parts = line.split('(');
        const foodAllergens = parts[1].replace(')', '')
            .replace('contains', '')
            .split(',')
            .map((a) => a.trim());
        parts[0].trim().split(' ').forEach((i) => {
            i = i.trim();
            ingredientsAllergensMapping.set(i, null);
            foodAllergens.forEach((a) => {
                if (!allergens.has(a)) {
                    allergens.set(a, new Map());
                }
                const m = allergens.get(a);
                m.set(i, (m.get(i) || 0) + 1);
            });
            ingredientsOccurrences.set(i, (ingredientsOccurrences.get(i) || 0) + 1);
        });
    });

    let found;
    do {
        found = false;
        allergens.forEach((ingredientsList, a) => {
            if (ingredientsList.size > 1) {
                const ingredientsListArray = Array.from(ingredientsList);
                const bigger = Math.max(...ingredientsListArray.map(b => b[1]));
                const matching = ingredientsListArray.filter(b => b[1] === bigger);
                if (matching.length === 1) {
                    ingredientsAllergensMapping.set(matching[0][0], a);
                    allergens.delete(a);
                    allergens.forEach((ingredientsList) => {
                        ingredientsList.delete(matching[0][0]);
                    });
                    found = true;
                }
            }
        });

        if (!found && allergens.size === 1) {
            allergens.forEach((ingredientsList, a) => {
                ingredientsAllergensMapping.set(Array.from(ingredientsList)[0][0], a);
                allergens.delete(a);
                found = true;
            });
        }

    } while (found);

    let count = 0;
    ingredientsAllergensMapping.forEach((a, i) => {
        if (!a) {
            count += ingredientsOccurrences.get(i);
        }
    });

    let dangerousIngredientList = Array.from(ingredientsAllergensMapping).filter(a => !!a[1])
        .sort((a, b) => a[1] < b[1] ? -1 : 1)
        .map(a => a[0])
        .join(',');

    console.log('Part 1: ', count);
    console.log('Part 2: ', dangerousIngredientList);
};

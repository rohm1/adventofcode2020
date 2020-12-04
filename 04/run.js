module.exports = (input) => {
    const lines = input.trim().split('\n');
    lines[lines.length] = '';

    let valid1 = 0;
    let valid2 = 0;
    let passportData = '';

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();

        if (!line) {
            let crtPassportFields = 0;
            let crtPassportValidFields = 0;
            let crtPassportHasCid = false;

            passportData.trim().split(' ').forEach((data) => {
                const [field, value] = data.split(':');
                crtPassportFields++;
                let fieldValid = false;

                switch (field) {
                    case 'byr':
                        fieldValid = value >= 1920 && value <= 2002;
                        break;

                    case 'iyr':
                        fieldValid = value >= 2010 && value <= 2020;
                        break;

                    case 'eyr':
                        fieldValid = value >= 2020 && value <= 2030;
                        break;

                    case 'hgt':
                        const height = value.substr(0, value.length - 2);
                        const unit = value.substr(value.length - 2);
                        if (unit === 'cm') {
                            fieldValid = height >= 150 && height <= 193;
                        } else if (unit === 'in') {
                            fieldValid = height >= 59 && height <= 76;
                        }
                        break;

                    case 'hcl':
                        let validChars = 0;
                        for (let k = 0; k < value.length; k++) {
                            if ((k === 0 && value[k] === '#')
                                || (value[k] >= 0 && value[k] <= 9)
                                || value[k] === 'a' || value[k] === 'b' || value[k] === 'c' || value[k] === 'd' || value[k] === 'e' || value[k] === 'f'
                            ) {
                                validChars++;
                            }
                        }
                        fieldValid = validChars === 7;
                        break;

                    case 'ecl':
                        fieldValid = value === 'amb' || value === 'blu' || value === 'brn' || value === 'gry' || value === 'grn' || value === 'hzl' || value === 'oth';
                        break;

                    case 'pid':
                        let validDigits = 0;
                        for (let k = 0; k < value.length; k++) {
                            if (value[k] >= 0 && value[k] <= 9) {
                                validDigits++;
                            }
                        }
                        fieldValid = validDigits === 9;
                        break;

                    case 'cid':
                        crtPassportHasCid = true;
                        fieldValid = true;
                        break;
                }

                if (fieldValid) {
                    crtPassportValidFields++;
                }
            });

            if (crtPassportFields === 8 || crtPassportFields === 7 && !crtPassportHasCid) {
                valid1++;
            }

            if (crtPassportValidFields === 8 || crtPassportValidFields === 7 && !crtPassportHasCid) {
                valid2++;
            }

            passportData = '';
            continue;
        }

        passportData += ' ' + line;
    }

    console.log('Part 1: ', valid1);
    console.log('Part 2: ', valid2);
};

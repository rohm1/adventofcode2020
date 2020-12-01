#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define TARGET_SUM 2020

// https://stackoverflow.com/q/3893937
void BubbleSort(int a[], int array_size)
{
    int i, j, temp;
    for (i = 0; i < (array_size - 1); ++i)
    {
        for (j = 0; j < array_size - 1 - i; ++j )
        {
            if (a[j] > a[j+1])
            {
                temp = a[j+1];
                a[j+1] = a[j];
                a[j] = temp;
            }
        }
    }
}

int main(int argc, char* argv[])
{
    int i;
    int size = 0;

    FILE* input = fopen("input.txt", "r");
    char* line = (char*) malloc(10 * sizeof(char));
    while (fgets(line, 10, input) != NULL) {
        if (strlen(line) < 2) {
            continue;
        }

        size++;
    }
    free(line);

    int * numbers = malloc(size * sizeof(int));

    fseek(input, 0, SEEK_SET);
    line = (char*) malloc(10 * sizeof(char));
    int number;
    i = 0;
    while (fgets(line, 10, input) != NULL) {
        if (strlen(line) < 2) {
            continue;
        }

        sscanf(line, "%d", &number);
        numbers[i++] = number;
    }
    fclose(input);
    free(line);

    BubbleSort(numbers, size);

    int part1Solved = 0;
    for (i = 0; !part1Solved && i < size; i++) {
        int j;
        int search = TARGET_SUM - numbers[i];
        for (j = 0; j < size; j++) {
            if (numbers[j] == search) {
                printf("Part 1: %d\n", numbers[i] * (TARGET_SUM - numbers[i]));
                part1Solved = 1;
                break;
            }
        }
    }

    int part2Solved = 0;
    for (i = 0; !part2Solved && i < size; i++) {
        int left = i + 1;
        int right = size - 1;
        while (left < right) {
            int sum = numbers[i] + numbers[left] + numbers[right];
            if (sum == TARGET_SUM) {
                printf("Part 2: %d\n", numbers[i] * numbers[left] * numbers[right]);
                part2Solved = 1;
                break;
            }
            if (sum < TARGET_SUM) {
                left += 1;
            } else {
                right -= 1;
            }
        }
    }

    free(numbers);

    return 0;
}

const { workoutCalculator } = require('../workoutReader');

describe('workoutCalculator', () => {
    
    // verifys the script reads valid csv files and that function returns correct data structure
    test('reads valid CSV file and returns correct data structure', async () => {
        const result = await workoutCalculator('./data/workouts.csv');
        expect(result).toHaveProperty('totalWorkouts');
        expect(result).toHaveProperty('totalMinutes');
        expect(typeof result.totalWorkouts).toBe('number');
        expect(typeof result.totalMinutes).toBe('number');
    });

    // handling for missing file
    test('returns null when CSV file is missing', async () => {
        const result = await workoutCalculator('./data/nonexistent.csv');
        expect(result).toBeNull();
    });

});
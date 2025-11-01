const { healthMetricsCounter } = require('../healthReader');

describe('healthMetricsCounter', () => {
    
    // verify scripts can read valid JSON files
    test('reads valid JSON file and returns number of entries', async () => {
        const result = await healthMetricsCounter('./data/health-metrics.json');
        
        // verify functions return expected data structure 
        // healthData.length (a number), so the expected data structure is just a number
        expect(typeof result).toBe('number');  
    });

    // handling for missing file 
    test('throws error when JSON file is missing', async () => {
        await expect(healthMetricsCounter('./data/nonexistent.json'))
        .rejects
        .toThrow('Unable to read health data');
    });

});
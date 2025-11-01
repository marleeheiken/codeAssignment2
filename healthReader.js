const fs = require('fs/promises');

/**
 * Reads JSON health data asynchronously from the given file path
 * Counts the total number of health entries
 * Handles errors if the file is missing or contains invalid JSON
 */

async function healthMetricsCounter(filePath) {
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    const healthData = JSON.parse(data);

    const totalEntries = healthData.metrics.length;

    console.log(`Total health entries: ${totalEntries}`);
    return totalEntries;
  } catch (err) {
    console.log('Error reading health data:', err.message);
    throw new Error('Unable to read health data');
  }
}

module.exports = { healthMetricsCounter };

//healthMetricsCounter("./data/health-metrics.json");

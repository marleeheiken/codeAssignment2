const fs = require('fs');
const csv = require('csv-parser');


/**
 * Reads CSV workout data asynchronously from the given file path
 * Uses a Promise so it can be used with async/await
 */

async function readWorkoutData(filePath) {
  return new Promise((resolve, reject) => {
    const workouts = [];

    fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (row) => {
            workouts.push(row)
        })
        .on('end', () => {
            resolve(workouts)
        })
        .on('error', (error) => {
            reject(error);
        });
  });
}

/**
 * Processes workout data from a CSV file
 * Counts total workouts and adds up the total minutes of exercise
 * Handles missing or invalid files
 */

async function workoutCalculator(filePath) {
  try {

    await fs.promises.access(filePath);

    const workouts = await readWorkoutData(filePath);
    let totalMinutes = 0;

    for (let i = 0; i < workouts.length; i++) {
      totalMinutes += parseInt(workouts[i].duration, 10);
    }
    console.log(`Total workouts: ${workouts.length}`);
    console.log(`Total minutes: ${totalMinutes}`);
    return { totalWorkouts: workouts.length, totalMinutes };

  } catch (error) {
        if (error.code === 'ENOENT') { 
            console.log('CSV file not found', error.message); 
        } else { 
            console.log('Error processing CSV file:', error.message); 
        } 
        return null;
  }
}

module.exports = { workoutCalculator };

//workoutCalculator('./data/workouts.csv');

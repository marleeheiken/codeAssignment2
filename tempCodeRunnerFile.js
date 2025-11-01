require('dotenv').config();
const { healthMetricsCounter } = require('./healthReader');
const { workoutCalculator } = require('./workoutReader');

async function processFiles() {
  try {
    console.log(`Processing data for: ${process.env.USER_NAME}`);
    console.log('Reading workout data...');
    const { totalWorkouts, totalMinutes } = await workoutCalculator('./data/workouts.csv');

    console.log('Reading health data...');
    const totalHealthEntries = await healthMetricsCounter('./data/health-metrics.json');

    console.log('\n=== SUMMARY ===');
    console.log(`Workouts found: ${totalWorkouts}`);
    console.log(`Total workout minutes: ${totalMinutes}`);
    console.log(`Health entries found: ${totalHealthEntries}`);
    console.log(`Weekly goal: ${process.env.WEEKLY_GOAL} minutes`);

    if (totalMinutes >= Number(process.env.WEEKLY_GOAL)) {
      console.log(`Congrats ${process.env.USER_NAME}! You exceeded your weekly goal! Woop woop!!`);
    } else {
      console.log(`Keep going ${process.env.USER_NAME}, you're almost there lazy butt!`);
    }

  } catch (err) {
    console.error('Error processing files:', err.message);
  }
}

processFiles();

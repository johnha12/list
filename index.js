#!/usr/bin/env node

const fs = require('fs');
const util = require('util');
const chalk = require('chalk');
const path = require('path');   // nodejs.org docs

// solution 2
// const lstat = util.promisify(fs.lstat);

// solution 3
const { lstat } = fs.promises;
const targetDir = process.argv[2] || process.cwd() // recieve arg or curr directory

fs.readdir(targetDir, async (err, filenames) => {   // callbacks is what we get back
  // need to check
  // err === error object
  // err === null
  if(err) {
    // do something
    throw new Error(err);   // appropriate because it'll stop code if err
  }

  const statPromises = filenames.map(filename => {
    return lstat(path.join(targetDir, filename)); // look at folder and append at end
  });

  const allStats = await Promise.all(statPromises);

  for (let stats of allStats) {   // stats won't give filename, so need index
    const index = allStats.indexOf(stats);

    if (stats.isFile()) {
      console.log(chalk.blue(filenames[index]));
    } else {
      console.log(chalk.green(filenames[index]));
    }
  }

  // Solution 2
  // for (let filename of filenames) {
  //   try {
  //     const stats = await lstat(filename);
  //     console.log(filename, stats.isFile());
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

});
// solution 1
// const lstat = (filename) => {
//   return new Promise((resolve, reject) => {
//     fs.lstat(filename, (err, stats) => {
//       if (err) {
//         reject(err);
//       }

//       resolve(stats);
//     });
//   });
// };
#!/usr/bin/env node

const fs = require('fs');
const util = require('util');

// solution 2
// const lstat = util.promisify(fs.lstat);

// solution 3
const { lstat } = fs.promises;

fs.readdir(process.cwd(), (err, filenames) => {   // callbacks is what we get back
  // need to check
  // err === error object
  // err === null
  if(err) {
    // do something
    throw new Error(err);   // appropriate because it'll stop code if err
  }

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


});
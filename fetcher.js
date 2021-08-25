const request = require('request');
const fs = require("fs");
const readline = require('readline');


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const fetcher = (url, path) => {
  setTimeout(() => {
    request(url, (error, response, body) => {
     if(!error) {
       checkExisting(path, body);
     }
});
  });
};

const checkExisting = (path,body) => {
  
fs.open(path, 'wx', (err, fd) => {
  if(err.code === 'EEXIST') {

    rl.question('Existing file found: overwrite? (Y / N) ', (answer) => {

      if( answer.toLowerCase() === 'y') {
        try {
          writeMyFile(body, path);
          rl.close();
        } catch(err) {
          if(err) {
            console.log(err);
            return;
          }
        }
      }
    });

  }
  else if (err) {
    console.log(err);
    return;
  }

return;
});
};

const writeMyFile = (body, path) => {

fs.writeFile(path, body, (err) => {

if(err){
  console.log(err);
  return;
} 

console.log("File written successfully"); 
});


};

fetcher("http://www.google.ca/", './index.html');
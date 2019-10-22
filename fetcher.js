const request = require('request');
const fs = require('fs');
const stdin = process.stdin;
stdin.setRawMode(true);
stdin.setEncoding('utf8');

const args = process.argv;
const url = args[2];
const filePath = args[3];

if (filePath.split(".")[2] === "html") {
  if (fs.existsSync(filePath)) {
    console.log("File already exists. Press 'y' to overwrite");
    stdin.on('data', (key) => {      
      if (key === 'y') { 
        request(`${url}`, (error, response, body) => {          
          if (response && response.statusCode === 200 || error) {
            fs.writeFile(filePath, body, function (err) {
              if (err) throw err;
              console.log(`Downloaded and saved ${fs.statSync(filePath).size} bytes to ${filePath}`);
              process.exit();
            });
          } else {
            console.log(`error or non-200 result detected , terminating app`);
            process.exit();
          }                  
        });
      } else {
        process.exit();
      }     
    });
  } else {
    request(`${url}`, (error, response, body) => {      
      if (response && response.statusCode === 200 || error) {
        fs.writeFile(filePath, body, function (err) {
          if (err) throw err;
          console.log(`Downloaded and saved ${fs.statSync(filePath).size} bytes to ${filePath}`);
        });
      } else {
        console.log(`error or non-200 result detected , terminating app`)
      }
    });
  }  
}
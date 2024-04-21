const fs = require("node:fs/promises");

// Step1: Write File to Folder
async function writeFileWithName(fileName = "", content = "") {
  return fs.appendFile(`./Files/${fileName}`, content, "utf8");
}

// Step2: Read file from folder
function readFileFromPath(fileName = "") {
  return fs.readFile(`./Files/${fileName}`, "utf8");
}

// Step3: Read the files inside the folder
fs.readdir("./Files", (error, files) => {
  if (error) console.log(error);
  else {
    for (var file of files) {
      console.log(file.split("."));
      if (file.split(".")[1] === "txt") {
        console.log(file);
      }
    }
  }
});

function stringToObject(str = "", delimiter = "") {
  return str.split(delimiter).map((d) => {
    if (d != "") return JSON.parse(d);
    else null;
  });
}

function clearFile() {
  return fs.truncate("./Files/tasks.txt", 0);
}

module.exports = {
  writeFileWithName,
  readFileFromPath,
  stringToObject,
  clearFile,
};

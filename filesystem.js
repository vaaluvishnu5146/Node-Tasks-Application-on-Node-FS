const fs = require("node:fs"); // commonJS import
const http = require("node:http");

const HTTP_SERVER = http.createServer((req, res) => {
  if (req.url === "/create") {
    writeFileWithName("file1.txt", "Testing");
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(
      "<html><head><title>Node Server</title></head><body><h1>File Created successfully</h1></body></html>"
    );
  } else if (req.url === "/test") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(
      "<html><head><title>Node Server</title></head><body><h1>Test Page</h1></body></html>"
    );
  } else {
    res.writeHead(200, { test: "true", "Content-Type": "text/html" });
    res.write(
      "<html><head><title>Node Server</title></head><body><h1>Start Page</h1></body></html>"
    );
  }
});

HTTP_SERVER.listen(3000, "localhost", () => {
  console.log("Server started");
});

// console.log("Hello Node");
// for (let i = 1; i <= 10; i++) {
//   console.log(i);
// }

// Step1: Create Folder "NodeJS Learnings"
// Step2: Create Javascript File "script.js"
// Step3: Enter console.log('Hello Node') inside script file
// Step4: Open cmd prompt in the NodeJS Learnings folder
// Step5: Run "node script.js"

// Step1: Write File to Folder
function writeFileWithName(fileName = "", content = "") {
  fs.writeFile(`./Files/${fileName}`, content, "utf8", () => {
    console.log("File created successfully");
  });
}

// Step2: Read file from folder
// function readFileFromPath(fileName = "") {
//   fs.readFile(`./Files/${fileName}`, "utf8", (error, data) => {
//     if (error) console.log(error);
//     else console.log(data);
//   });
// }

// readFileFromPath("message.txt");

// Step3: Read the files inside the folder
// fs.readdir("./Files", (error, files) => {
//   if (error) console.log(error);
//   else {
//     for (var file of files) {
//       console.log(file.split("."));
//       if (file.split(".")[1] === "txt") {
//         console.log(file);
//       }
//     }
//   }
// });

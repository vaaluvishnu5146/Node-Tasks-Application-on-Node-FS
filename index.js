const express = require("express");
const parser = require("body-parser");
const { writeFileWithName } = require("./Modules/Tasks/Tasks.utils");
const HTTP_SERVER = express();
const PORT = 3000;
const HOSTNAME = "localhost";

// MIDDLEWARE INJECTION
HTTP_SERVER.use(parser.json());

// ROUTE INJECTION
HTTP_SERVER.use("/api/task", require("./Modules/Tasks/Tasks.controller"));

// START LISTENING TO THE PORT
HTTP_SERVER.listen(PORT, HOSTNAME, 1, () => {
  console.log(`App Started at http://${HOSTNAME}:${PORT}`);
});

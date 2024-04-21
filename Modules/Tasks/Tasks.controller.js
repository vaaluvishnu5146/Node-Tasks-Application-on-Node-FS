const {
  writeFileWithName,
  readFileFromPath,
  stringToObject,
  clearFile,
} = require("./Tasks.utils");

const TasksRouter = require("express").Router();

TasksRouter.get("/", (req, res, next) => {
  readFileFromPath("tasks.txt")
    .then((response) => {
      const data = stringToObject(response, "/");
      if (data.length > 0) {
        return res.json({
          success: true,
          data,
          message: "Tasks fetched successfully",
        });
      }
    })
    .catch((error) => {
      return res.json({
        success: false,
        error,
        message: "No Tasks Available",
      });
    });
});

TasksRouter.post("/create", async (req, res, next) => {
  if (req.body && req.body.task) {
    const response = await readFileFromPath("tasks.txt");
    const existingTasks = stringToObject(response, "/");
    writeFileWithName(
      "tasks.txt",
      existingTasks[0] !== undefined
        ? `/${JSON.stringify(req.body)}`
        : `${JSON.stringify(req.body)}`
    )
      .then(() => {
        res.json({
          success: true,
          message: "Tasks created successfully",
        });
      })
      .catch((e) =>
        res.json({
          success: false,
          error: e,
          message: "Tasks creation failed",
        })
      );
  }
});

TasksRouter.patch("/update", async (req, res, next) => {
  const rawData = await readFileFromPath("tasks.txt");
  const existingTasks = stringToObject(rawData, "/");
  await clearFile();
  const newTasks = existingTasks.filter((d) => req.body.id != d.id);
  newTasks.push(req.body);
  writeFileWithName(
    "tasks.txt",
    newTasks.map((d) => JSON.stringify(d)).join("/")
  )
    .then(() => {
      res.json({
        success: true,
        message: "Tasks updation successfully",
      });
    })
    .catch((e) =>
      res.json({
        success: false,
        error: e,
        message: "Tasks updation failed",
      })
    );
});

TasksRouter.delete("/delete/:id", async (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    return res.json({
      success: false,
      message: "Id is not valid",
    });
  } else {
    const response = await readFileFromPath("tasks.txt");
    const existingTasks = stringToObject(response, "/");
    await clearFile();
    console.log(
      existingTasks
        .filter((d) => d.id != id)
        .map((d) => JSON.stringify(d))
        .join("/")
    );
    writeFileWithName(
      "tasks.txt",
      existingTasks
        .filter((d) => d.id != id)
        .map((d) => JSON.stringify(d))
        .join("/")
    )
      .then(() => {
        res.json({
          success: true,
          message: "Tasks deletion successfully",
        });
      })
      .catch((e) =>
        res.json({
          success: false,
          error: e,
          message: "Tasks deletion failed",
        })
      );
  }
});

module.exports = TasksRouter;

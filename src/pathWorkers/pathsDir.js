import os from "node:os";
import { stdin } from "node:process";
import workerDirectory from "./workersDirectory.js";
import workersWithFiles from "./workersWithFiles.js";

const workersDirectoryOperations = ["up", "cd", "ls"];
const workersWithFilesOperations = ["cat", "add", "rn", "cp", "mv", "rm"];
let dir = os.homedir();

function getCurrentDir() {
  console.log(`You are currently in ${dir}`);
}

function inputCommand() {
  console.log("Please print command");

  stdin.on("data", async (data) => {
    let result = null;
    data = data.toString().trim().split(" ");

    if (workersDirectoryOperations.find((opertaion) => opertaion === data[0])) {
      result = await workerDirectory(data, dir);
    } else if (
      workersWithFilesOperations.find((opertaion) => opertaion === data[0])
    ) {
      result = workersWithFiles();
    } else {
      console.error("Invalid input");
    }

    if (result) {
      dir = result;
    }
    getCurrentDir();
  });
}

export { getCurrentDir, inputCommand };

import os from "node:os";
import { stdin } from "node:process";
import workerDirectory from "./workersDirectory.js";
import workersWithFiles from "./workersWithFiles.js";

const workersDirectoryOperations = new Set(["up", "cd", "ls"]);
const workersWithFilesOperations = new Set([
  "cat",
  "add",
  "rn",
  "cp",
  "mv",
  "rm",
]);
let dir = os.homedir();

function getCurrentDir() {
  console.log(`You are currently in ${dir}`);
}

async function handleWorkers(data) {
  const args = data.trim().split(" ");
  const command = args[0];

  if (workersDirectoryOperations.has(command)) {
    return await workerDirectory(args, dir);
  } else if (workersWithFilesOperations.has(command)) {
    return workersWithFiles(args, dir);
  } else {
    console.error("Invalid input");
  }
}

function inputCommand() {
  console.log("Please print command");

  stdin.on("data", async (data) => {
    let result = await handleWorkers(data.toString());

    if (result) {
      dir = result;
    }

    getCurrentDir();
  });
}

export { getCurrentDir, inputCommand };

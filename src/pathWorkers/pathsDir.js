import workerDirectory from "./workersDirectory.js";
import os from "node:os";
import { stdin } from "node:process";

let dir = os.homedir();

function getCurrentDir() {
  console.log(`You are currently in ${dir}`);
}

function inputCommand() {
  console.log("Please print command");
  stdin.on("data", async (data) => {
    data = data.toString().trim().split(' ');
    const result = await workerDirectory(data, dir);

    if (result) {
      dir = result;
    }
    getCurrentDir();
  });
}

export { getCurrentDir, inputCommand };

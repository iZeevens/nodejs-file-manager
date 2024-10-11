import os from "node:os";
import { stdin } from "node:process";

const workingDirectoryComands = ["up", "cd", "ls"];
let dir = os.homedir();

function getCurrentDir() {
  console.log(`You are currently in ${dir}`);
}

function inputCommand() {
  console.log("Please print command");
  stdin.on("data", (data) => {
    console.log(data.toString());
  });
}

export { getCurrentDir, inputCommand };

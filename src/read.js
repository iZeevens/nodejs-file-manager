import fs from "node:fs";
import os from "node:os";

let dir = os.homedir();

function getCurrentDir() {
  console.log(`You are currently in ${dir}`);
}

export { getCurrentDir };

import path from "node:path";

const listComands = ["up", "cd", "ls"];

function workerDirectory(opertaion, currDir, folder) {
  opertaion = opertaion.trim();

  if (opertaion === "up") {
    try {
      return path.join(currDir, "..");
    } catch {
      console.error("Invalid input");
    }
  } else if (opertaion === "cd" && folder) {
    try {
      return path.join(currDir, folder);
    } catch {
      console.error("Invalid input");
    }
  } else if (opertaion === "ls") {
    console.log("list folders");
  } else {
    console.error("Operation failed");
  }
}

export default workerDirectory;

import path from "node:path";

function workerDirectory(opertaion, currDir) {
  const opertaionName = opertaion[0];
  const folder = opertaion[1] || null;

  if (opertaionName === "up") {
    try {
      return path.join(currDir, "..");
    } catch {
      console.error("Operation failed");
    }
  } else if (opertaionName === "cd" && folder) {
    try {
      return path.join(currDir, folder);
    } catch {
      console.error("Operation failed");
    }
  } else if (opertaionName === "ls") {
    console.log("list folders");
  } else {
    console.error("Invalid input");
  }
}

export default workerDirectory;

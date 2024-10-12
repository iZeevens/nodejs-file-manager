import path from "node:path";
import fs from "node:fs/promises";

async function workerDirectory(opertaion, currDir) {
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
      const pathCd = path.join(currDir, folder)
      await fs.access(pathCd)
      return pathCd;
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

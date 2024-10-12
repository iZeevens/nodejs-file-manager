import path from "node:path";
import fs from "node:fs/promises";

async function workerDirectory(opertaion, currDir) {
  const opertaionName = opertaion[0];
  const folder = opertaion[1] || null;

  if (opertaionName === "up") {
    const pathUp = path.join(currDir, "..");
    return pathUp;
  } else if (opertaionName === "cd" && folder) {
    try {
      const pathCd = path.join(currDir, folder);
      await fs.promises.access(pathCd);
      return pathCd;
    } catch {
      console.error("Operation failed");
    }
  } else if (opertaionName === "ls") {
    const infoLs = await fs.readdir(currDir);
    const result = await infoLs.reduce(async (accumP, file) => {
      const accum = await accumP;
      const pathToFile = path.join(currDir, file);
      const stats = await fs.stat(pathToFile);

      if (stats.isFile()) {
        accum.push([file, "file"]);
      } else {
        accum.push([file, "directory"]);
      }

      return accum;
    }, Promise.resolve([]));
    result.sort((a, b) => a[0].localeCompare(b[0]) && a[1].localeCompare(b[1]));

    console.table(result);
  } else {
    console.error("Invalid input");
  }
}

export default workerDirectory;

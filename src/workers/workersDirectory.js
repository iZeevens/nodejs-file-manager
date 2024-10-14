import path from "node:path";
import fs from "node:fs/promises";

function upDir(currDir) {
  const pathUp = path.join(currDir, "..");
  return pathUp;
}

async function cdDir(currDir, pathToFile) {
  if (!pathToFile) {
    console.error("Invalid input");
    return;
  }

  try {
    const pathCd = path.join(currDir, pathToFile);
    await fs.access(pathCd);
    return pathCd;
  } catch {
    console.error("Operation failed");
  }
}

async function lsDir(currDir) {
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
}

async function workerDirectory(opertaions, currDir) {
  const opertaionName = opertaions[0];
  const pathToFile = opertaions[1] || null;

  const operationMap = {
    up: upDir,
    cd: cdDir,
    ls: lsDir,
  };

  const operationFunction = operationMap[opertaionName];

  if (operationFunction) {
    const result = await operationFunction(currDir, pathToFile);
    return result;
  } else {
    console.error("Invalid input");
  }
}

export default workerDirectory;

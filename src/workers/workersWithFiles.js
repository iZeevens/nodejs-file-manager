import fs from "node:fs";
import { createHash } from "node:crypto";
import { join } from "node:path";

async function handleFileOperation(operation, requiredArgs, ...args) {
  if (args.length < requiredArgs || args.some((arg) => arg == null)) {
    console.error("Invalid input");
    return;
  }

  try {
    await operation(...args);
  } catch {
    console.error("Operation failed");
  }
}

async function readFileOperation(pathToFile) {
  const read = (pathToFile) => {
    const data = fs.createReadStream(pathToFile, { encoding: "utf-8" });
    data.on("data", (chunk) => {
      console.log(chunk);
    });
  };

  await handleFileOperation(read, 1, pathToFile);
}

async function addFileOperation(pathToFile) {
  await handleFileOperation(fs.promises.writeFile, 1, pathToFile, "");
}

async function renameFileOperation(pathToFile, pathToNewFile) {
  await handleFileOperation(
    fs.promises.rename,
    2,
    pathToFile,
    join(pathToFile, "..", pathToNewFile)
  );
}

async function copyFileOperation(pathToFile, pathToNewFile) {
  await handleFileOperation(fs.promises.copyFile, 2, pathToFile, pathToNewFile);
}

async function moveFileOperation(pathToFile, pathToNewFile) {
  await handleFileOperation(fs.promises.rename, 2, pathToFile, pathToNewFile);
}

async function deleteFileOperation(pathToFile) {
  await handleFileOperation(fs.promises.unlink, 1, pathToFile);
}

async function hashFileOpertaion(pathToFile) {
  const hash = (pathToFile) => {
    const hash = createHash("sha256");
    const readStream = fs.createReadStream(pathToFile);
    readStream.on("data", (chunk) => {
      hash.update(chunk);
    });
    readStream.on("end", () => {
      console.log(`SHA256 hash for the file: ${hash.digest("hex")}`);
    });
    readStream.on("error", (err) => {
      console.error(err.message);
    });
  };
  await handleFileOperation(hash, 1, pathToFile);
}

async function workersWithFiles(opertaions) {
  const operationName = opertaions[0];
  const pathToFile = opertaions[1] || null;
  const pathToNewFile = opertaions[2] || null;

  const operationMap = {
    cat: readFileOperation,
    add: addFileOperation,
    rn: renameFileOperation,
    cp: copyFileOperation,
    mv: moveFileOperation,
    rm: deleteFileOperation,
    hash: hashFileOpertaion,
  };

  const operationFunction = operationMap[operationName];

  if (operationFunction) {
    await operationFunction(pathToFile, pathToNewFile);
  } else {
    console.error("Invalid input");
  }
}

export default workersWithFiles;

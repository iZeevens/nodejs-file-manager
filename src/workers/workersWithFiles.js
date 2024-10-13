import fs from "node:fs";

async function handleFileOperation(operation, requiredArgs, ...args) {
  if (args.length < requiredArgs || args.some((arg) => !arg)) {
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
  await handleFileOperation(
    async (pathToFile) => {
      const data = fs.createReadStream(pathToFile, { encoding: "utf-8" });
      data.on("data", (chunk) => {
        console.log(chunk);
      });
    },
    1,
    pathToFile
  );
}

async function addFileOperation(pathToFile) {
  await handleFileOperation(
    (pathToFile) => fs.promises.writeFile(pathToFile, ""),
    1,
    pathToFile
  );
}

async function renameFileOperation(pathToFile, pathToNewFile) {
  await handleFileOperation(
    (pathToFile, pathToNewFile) =>
      fs.promises.rename(pathToFile, pathToNewFile),
    2,
    pathToFile,
    pathToNewFile
  );
}

async function copyFileOperation(pathToFile, pathToNewFile) {
  await handleFileOperation(
    (pathToFile, pathToNewFile) =>
      fs.promises.copyFile(pathToFile, pathToNewFile),
    2,
    pathToFile,
    pathToNewFile
  );
}

async function moveFileOperation(pathToFile, pathToNewFile) {
  await handleFileOperation(
    (pathToFile, pathToNewFile) =>
      fs.promises.rename(pathToFile, pathToNewFile),
    2,
    pathToFile,
    pathToNewFile
  );
}

async function deleteFileOperation(pathToFile) {
  await handleFileOperation(
    (pathToFile) => fs.promises.unlink(pathToFile),
    1,
    pathToFile
  );
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
  };

  const operationFunction = operationMap[operationName];

  if (operationFunction) {
    await operationFunction(pathToFile, pathToNewFile);
  } else {
    console.error("Invalid input");
  }
}

export default workersWithFiles;

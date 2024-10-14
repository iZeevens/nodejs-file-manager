import fs from "node:fs";
import zlib from "node:zlib";
import { createHash } from "node:crypto";
import { join } from "node:path";
import { pipeline } from "node:stream";
import { handleFileOperation } from "./workersHelpers.js";

// Problem first result
async function readFileOperation(pathToFile) {
  const read = (pathToFile) => {
    const data = fs.createReadStream(pathToFile, { encoding: "utf-8" });
    data.on("data", (chunk) => {
      console.log(chunk);
    });
    data.on("error", (err) => {
      console.error(`Operation failed ${err}`);
    });
  };

  await handleFileOperation(read, pathToFile);
}

async function addFileOperation(pathToFile) {
  await handleFileOperation(fs.promises.writeFile, pathToFile, "");
}

async function renameFileOperation(pathToFile, pathToNewFile) {
  await handleFileOperation(
    fs.promises.rename,
    pathToFile,
    join(pathToFile, "..", pathToNewFile)
  );
}

async function copyFileOperation(pathToFile, pathToNewFile) {
  await handleFileOperation(fs.promises.copyFile, pathToFile, pathToNewFile);
}

async function moveFileOperation(pathToFile, pathToNewFile) {
  await handleFileOperation(fs.promises.rename, pathToFile, pathToNewFile);
}

async function deleteFileOperation(pathToFile) {
  await handleFileOperation(fs.promises.unlink, pathToFile);
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
      console.error(`Operation failed ${err}`);
    });
  };
  await handleFileOperation(hash, pathToFile);
}

async function compressFileOperation(pathToFile, pathToNewFile) {
  const compress = async (pathToFile, pathToNewFile) => {
    await fs.promises.access(pathToFile);
    const readStream = fs.createReadStream(pathToFile);
    const writeStream = fs.createWriteStream(pathToNewFile);
    const brotli = zlib.createBrotliCompress();
    pipeline(readStream, brotli, writeStream, (err) => {
      if (err) {
        console.error(`Operation failed ${err}`);
      }
    });
  };

  await handleFileOperation(compress, pathToFile, pathToNewFile);
}

async function decompressFileOperation(pathToFile, pathToNewFile) {
  const decompress = async (pathToFile, pathToNewFile) => {
    await fs.promises.access(pathToFile);
    const readStream = fs.createReadStream(pathToFile);
    const writeStream = fs.createWriteStream(pathToNewFile);
    const brotli = zlib.createBrotliDecompress();
    pipeline(readStream, brotli, writeStream, (err) => {
      if (err) {
        console.error(`Operation failed ${err}`);
      }
    });
  };

  await handleFileOperation(decompress, pathToFile, pathToNewFile);
}

async function workersWithFiles(opertaions) {
  const operationName = opertaions[0];
  const pathToFile = opertaions[1] || null;
  const pathToNewFile = opertaions[2] || null;

  const operationMap = {
    cat: { operation: readFileOperation, numberArgs: 1 },
    add: { operation: addFileOperation, numberArgs: 1 },
    rn: { operation: renameFileOperation, numberArgs: 2 },
    cp: { operation: copyFileOperation, numberArgs: 2 },
    mv: { operation: moveFileOperation, numberArgs: 2 },
    rm: { operation: deleteFileOperation, numberArgs: 1 },
    hash: { operation: hashFileOpertaion, numberArgs: 1 },
    compress: { operation: compressFileOperation, numberArgs: 2 },
    decompress: { operation: decompressFileOperation, numberArgs: 2 },
  };

  const operationFunction = operationMap[operationName].operation;
  const numberArgsOperationFunction = operationMap[operationName].numberArgs;

  if (
    operationFunction &&
    opertaions.length - 1 === numberArgsOperationFunction
  ) {
    await operationFunction(pathToFile, pathToNewFile);
  } else {
    console.error("Invalid input");
  }
}

export default workersWithFiles;

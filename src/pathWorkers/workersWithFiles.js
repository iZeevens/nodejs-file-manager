import fs from "node:fs";
import { join } from "node:path";

async function workersWithFiles(opertaion) {
  const operationName = opertaion[0];
  const pathToFile = opertaion[1] || null;
  const pathToNewFile = opertaion[2] || null;

  if (pathToFile) {
    if (operationName === "cat") {
      try {
        await fs.promises.access(pathToFile);
        const data = fs.createReadStream(pathToFile, { encoding: "utf-8" });

        data.on("data", (data) => {
          console.log(data);
        });
      } catch {
        console.error("Operation failed");
      }

      console.log("Read file");
    } else if (operationName === "add") {
      try {
        await fs.promises.writeFile(pathToFile, "");
        console.log("A new file has been created!");
      } catch {
        console.error("Operation failed");
      }
    } else if (operationName === "rn" && pathToNewFile) {
      fs.rename(pathToFile, join(pathToFile, '..', pathToNewFile), (err) => {
        if (err) {
          console.error("Operation failed");
        }
      });
    } else if (operationName === "cp") {
      console.log("Copy file");
    } else if (operationName === "mv") {
      console.log("Move file");
    } else if (operationName === "rm") {
      console.log("Remove file");
    } else {
      console.error("Invalid input");
    }
  } else {
    console.error("Invalid input");
  }
}

export default workersWithFiles;

import fs from "node:fs";
import { join } from "node:path";

//Opertations to owns function
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
      try {
        await fs.promises.rename(
          pathToFile,
          join(pathToFile, "..", pathToNewFile)
        );
        console.log("The file name has been changed!");
      } catch {
        console.error("Operation failed");
      }
    } else if (operationName === "cp" && pathToNewFile) {
      try {
        await fs.promises.copyFile(pathToFile, pathToNewFile);
        console.log("The file has been copied!");
      } catch {
        console.error("Operation failed");
      }
    } else if (operationName === "mv" && pathToNewFile) {
      try {
        await fs.promises.rename(pathToFile, pathToNewFile);
        console.log("The file name has been moved!");
      } catch {
        console.error("Operation failed");
      }
    } else if (operationName === "rm") {
      try {
        await fs.promises.unlink(pathToFile);
        console.log("The file name has been removed!");
      } catch {
        console.error("Operation failed");
      }
    } else {
      console.error("Invalid input");
    }
  } else {
    console.error("Invalid input");
  }
}

export default workersWithFiles;

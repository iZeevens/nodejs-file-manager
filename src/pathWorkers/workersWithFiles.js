import fs from "node:fs";

async function workersWithFiles(opertaion) {
  const opertaionName = opertaion[0];
  const pathToFile = opertaion[1] || null;
  const pathToFolder = opertaion[2] || null;

  if (pathToFile) {
    if (opertaionName === "cat") {
      try {
        await fs.promises.access(pathToFile);
        const data = fs.createReadStream(pathToFile, { encoding: "utf-8" });
  
        data.on('data', (data) => {
          console.log(data);
        })
      } catch {
        console.error("Operation failed");
      }
  
      console.log("Read file");
    } else if (opertaionName === "add") {
      try {
        await fs.promises.writeFile(pathToFile, '')
        console.log("A new file has been created!");
      } catch {
        console.error("Operation failed");
      }
    } else if (opertaionName === "rn") {
      console.log("Rename file");
    } else if (opertaionName === "cp") {
      console.log("Copy file");
    } else if (opertaionName === "mv") {
      console.log("Move file");
    } else if (opertaionName === "rm") {
      console.log("Remove file");
    } else {
      console.error("Invalid input");
    }
  } else {
    console.error("Invalid input");
  }
}

export default workersWithFiles;

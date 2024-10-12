import fs from "node:fs";

function workersWithFiles(opertaion, currDir) {
  const opertaionName = opertaion[0];
  const pathToFile = opertaion[1] || null;
  const pathToFolder = opertaion[2] || null;

  if (opertaionName === "cat") {
    console.log("Read file");
  } else if (opertaionName === "add") {
    console.log("Create new empty file");
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
}

export default workersWithFiles;

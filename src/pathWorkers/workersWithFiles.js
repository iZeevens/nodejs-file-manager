function workersWithFiles(opertaion, currDir) {
  const opertaionName = opertaion[0];
  const pathToFile = opertaion[1] || null;
  const pathToFolder = opertaion[2] || null;

  if (opertaion === "cat") {
    console.log("Read file");
  } else if (opertaion === "add") {
    console.log("Create new empty file");
  } else if (opertaion === "rn") {
    console.log("Rename file");
  } else if (opertaion === "cp") {
    console.log("Copy file");
  } else if (opertaion === "mv") {
    console.log("Move file");
  } else if (opertaion === "rm") {
    console.log("Remove file");
  } else {
    console.error("Invalid input");
  }
}

export default workersWithFiles;

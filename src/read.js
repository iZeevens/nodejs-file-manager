import fs from "node:fs";

function getCurrentDir(filePath) {
  const fileStream = fs.createReadStream(filePath);

  console.log(fileStream);
}

export { getCurrentDir };

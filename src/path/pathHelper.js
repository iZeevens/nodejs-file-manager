import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

function getDir(importMeta) {
  const __filename = fileURLToPath(importMeta);
  const __dirname = dirname(__filename);

  return __dirname;
}

export default getDir;

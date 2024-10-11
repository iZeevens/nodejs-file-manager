import exit from "./exit.js";
import { getCurrentDir } from "./read.js";

const args = process.argv.slice(2);

let username = null;

args.forEach((element) => {
  if (element.startsWith("--username")) {
    username = element.split("=")[1];
  }
});

if (username) {
  console.log(`Welcome to the File Manager, ${username}!`);
} else {
  throw new Error("No username provided");
}

exit(username);
getCurrentDir();

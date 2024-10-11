import exit from "./exit.js";

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

// setInterval(() => {
//   console.log('prossec')
// }, 1000)

exit(username);

const args = process.argv.slice(2);

let username = null

args.forEach(element => {
  if (element.startsWith('--username')) {
    username = element.split('=')[1]
  }
});

if (username) {
  console.log(`Welcome to the File Manager, ${username}!`)
} else {
  throw new Error('No username provided')
}

process.on("SIGINT", () => {
  console.log(`Thank you for using File Manager, ${username}, goodbye!`);
  process.exit();
});
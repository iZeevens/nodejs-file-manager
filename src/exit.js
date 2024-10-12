function exit(username) {
  console.log(`Thank you for using File Manager, ${username}, goodbye!`);
  process.exit(0);
}

function setupExitHandler(username) {
  process.on("SIGINT", () => {
    console.log(`Thank you for using File Manager, ${username}, goodbye!`);
    process.exit(0);
  });
}

export { exit, setupExitHandler };

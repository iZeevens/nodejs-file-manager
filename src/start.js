const args = process.argv.slice(2);

let username = null

args.forEach(element => {
  if (element.startsWith('--username')) {
    username = element.split('=')[1]
  }
});

if (username) {
  console.log(username)
} else {
  throw new Error('No username provided')
}
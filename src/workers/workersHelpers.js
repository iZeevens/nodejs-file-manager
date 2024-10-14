async function handleFileOperation(operation, ...args) {
  try {
    await operation(...args);
  } catch (err) {
    console.error(`Operation failed ${err}`);
  }
}

function handleOsSystem(operation) {
  try {
    operation();
  } catch (err) {
    console.error(`Operation failed ${err}`);
  }
}

export { handleFileOperation, handleOsSystem };

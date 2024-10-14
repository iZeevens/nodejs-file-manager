import os from "node:os";

function getEOL() {
  try {
    console.log(JSON.stringify(os.EOL));
  } catch(err) {
    console.error(`Operation failed ${err}`);
  }
}

function getCpus() {
  try {
    const userCpus = os.cpus();
    userCpus.forEach((cpu) => {
      delete cpu.times;
      cpu.speed = `${(cpu.speed / 1000).toFixed(2)}GHz`;
    });

    console.table(userCpus);
  } catch(err) {
    console.error(`Operation failed ${err}`);
  }
}

function getHomeDir() {
  try {
    console.log(os.homedir());
  } catch(err) {
    console.error(`Operation failed ${err}`);
  }
}

function getUsername() {
  try {
    console.log(os.userInfo().username);
  } catch(err) {
    console.error(`Operation failed ${err}`);
  }
}

function getArchitecture() {
  try {
    console.log(os.arch());
  } catch(err) {
    console.error(`Operation failed ${err}`);
  }
}

function workersOsSystem(opertaions) {
  const operationMap = {
    "--EOL": getEOL,
    "--cpus": getCpus,
    "--homedir": getHomeDir,
    "--username": getUsername,
    "--architecture": getArchitecture,
  };
  const operationGet = opertaions[1];
  const operationFunction = operationMap[operationGet];

  if (operationFunction) {
    operationFunction();
  } else {
    console.error("Invalid input");
  }
}

export default workersOsSystem;

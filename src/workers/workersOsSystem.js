import os from "node:os";

function getEOL() {
  try {
    console.log(JSON.stringify(os.EOL));
  } catch {
    console.error("Operation failed");
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
  } catch {
    console.error("Operation failed");
  }
}

function getHomeDir() {
  try {
    console.log(os.homedir());
  } catch {
    console.error("Operation failed");
  }
}

function getUsername() {
  try {
    console.log(os.userInfo().username);
  } catch {
    console.error("Operation failed");
  }
}

function getArchitecture() {
  try {
    console.log(os.arch());
  } catch {
    console.error("Operation failed");
  }
}

function workersOsSystem(opertaions) {
  const osOperation = {
    "--EOL": getEOL,
    "--cpus": getCpus,
    "--homedir": getHomeDir,
    "--username": getUsername,
    "--architecture": getArchitecture,
  };
  const operationGet = opertaions[1];
  const operationFunction = osOperation[operationGet];

  if (operationFunction) {
    operationFunction();
  } else {
    console.error("Invalid input");
  }
}

export default workersOsSystem;

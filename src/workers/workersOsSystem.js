import os from "node:os";

function handleOsSystem(operation) {
  try {
    operation();
  } catch (err) {
    console.error(`Operation failed ${err}`);
  }
}

function getEOL() {
  handleOsSystem(() => console.log(JSON.stringify(os.EOL)));
}

function getCpus() {
  handleOsSystem(() => {
    const userCpus = os.cpus();
    userCpus.forEach((cpu) => {
      delete cpu.times;
      cpu.speed = `${(cpu.speed / 1000).toFixed(2)}GHz`;
    });

    console.table(userCpus);
  });
}

function getHomeDir() {
  handleOsSystem(() => console.log(os.homedir()));
}

function getUsername() {
  handleOsSystem(() => console.log(os.userInfo().username));
}

function getArchitecture() {
  handleOsSystem(() => console.log(os.arch()));
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

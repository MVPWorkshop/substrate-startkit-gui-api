import psTree from 'ps-tree';
import { exec } from 'child_process';

function unixKill(pid: number) {
  return new Promise((resolve, reject) => {
    const processSignal = 'SIGKILL';

    const killTree = true;

    psTree(pid, function (err, children) {
      try {
        process.kill(pid, processSignal);

        children.forEach((subProcess) => {
          process.kill(Number(subProcess.PID), processSignal);
        })

        resolve();
      } catch (error) {
        reject(error);
      }
    });
  })
}

function windowsKill(pid: number) {
  return new Promise((resolve, reject) => {
    exec(`taskkill /PID ${pid} /T /F`, (error, stdout, stderr) => {
      if (error) {
        reject(error);
      }

      if (stderr) {
        reject(new Error(stderr));
      }

      resolve();
    });
  })
}

export async function kill(pid: number) {
  const isWin = /^win/.test(process.platform);

  if (isWin) {
    await windowsKill(pid);
  } else {
    await unixKill(pid);
  }
}

export default function delay(ms) {
  let awake;
  const sleep = (ms) => {
    return new Promise((res, rej) => {
      awake = rej;
      setTimeout(() => res(true), ms)
    });
  }
  let goToSleep = sleep(ms);

  return async function (fn, args) {
    awake(false);
    goToSleep = sleep(ms)
    const gotEnoughSleep = await goToSleep;
    if (gotEnoughSleep) return fn(...args)
  }
}
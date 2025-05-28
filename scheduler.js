const min15 = 15 * 60 * 1000;
const sec2 = 2 * 1000;
const interval = sec2;

export function scheduleFunction(callback, executeImmediate) {
  if (executeImmediate) {
    callback();
  }
  setInterval(() => {
    callback();
    console.log(`Ran the function.`);
  }, interval);

  console.log(
    `Scheduled function to run every ${interval / (60 * 1000)} minutes.`
  );
}

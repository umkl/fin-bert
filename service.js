const min15 = 15 * 60 * 1000;
const sec2 = 2 * 1000;
const interval = min15;

export default async function startFinService() {
  startExecutionLoop();
}

const startExecutionLoop = () => {
  myFunction();

  setInterval(myFunction, interval);
  console.log(
    `Scheduled function to run every ${interval / (60 * 1000)} minutes.`
  );
};

const myFunction = () => {
  const now = new Date();
  console.log(`Function executed at: ${now.toISOString()}`);
};

process.on("SIGINT", () => {
  console.log("Caught interrupt signal. Exiting gracefully...");
  process.exit(0);
});

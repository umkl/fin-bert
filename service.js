const min15 = 15 * 60 * 1000;
const sec2 = 2 * 1000;
const interval = min15;

import { getMessages } from "./get-messages.js";
import getDetails from "./account-details.js";
import getAccessToken from "./get-access-token.js";

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

const myFunction = async () => {
  const now = new Date();
  console.log(`Function executed at: ${now.toISOString()}`);

  const channeldId = process.env.DISCORD_CHANNEL_ID;
  const allMessages = await getMessages(channeldId);

  const lastMessage = allMessages[0];
  const lastMessageTimestamp = allMessages[0].timestamp;
  const lastMessageDate = new Date(lastMessageTimestamp);

  const differenceInMilliseconds = now - lastMessageDate;

  // if(lastMessage - now){
  // }

  const durationAsDate = new Date(differenceInMilliseconds);

  const differenceInMinutes = differenceInMilliseconds / (1000 * 60);

  if (differenceInMinutes > 15) {
    const itemsToLog = [];

    const accessToken = await getAccessToken();
    const accountId = process.env.GCLESS_ACCOUNT_ID;
    const details = await getDetails(accessToken, accountId);

    const completedBookings = details.transactions.booked;

    console.log(completedBookings);

    for (const item of completedBookings) {
      console.log(item);
    }
  }
};

process.on("SIGINT", () => {
  console.log("Caught interrupt signal. Exiting gracefully...");
  process.exit(0);
});

import { getMessages } from "./get-messages.js";
import getDetails from "./account-details.js";
import getAccessToken from "./get-access-token.js";
import { sendMessage } from "./send-message.js";
import { scheduleFunction } from "./scheduler.js";
import { getRandomEmoji } from "./discord-utils.js";

export default async function startFinService() {
  startExecutionLoop();
}

const startExecutionLoop = () => {
  scheduleFunction(checkForTransactionsAndLogRespectfullyInDiscord, true);
};

const alreadyLoggedItemIds = [];

export const checkForTransactionsAndLogRespectfullyInDiscord = async () => {
  const now = new Date();
  console.log(`Function executed at: ${now.toISOString()}`);

  const channeldId = process.env.DISCORD_CHANNEL_ID;
  const allMessages = await getMessages(channeldId);

  const lastMessage = allMessages[0];
  const lastMessageTimestamp = allMessages[0].timestamp;
  const lastMessageDate = new Date(lastMessageTimestamp);

  const differenceInMilliseconds = now - lastMessageDate;

  const durationAsDate = new Date(differenceInMilliseconds);

  const differenceInMinutes = differenceInMilliseconds / (1000 * 60);

  if (differenceInMinutes > 0) {
    const itemsToLog = [];

    await seedMessages();

    let details;
    try {
      details = await getTheCashlessDataAndExecute();
    } catch (e) {
      console.log("not possible: " + getRandomEmoji(), e);
      return;
    }

    const completedBookings = details.transactions.booked;
    for (const item of completedBookings) {
      console.log(!alreadyLoggedItemIds.includes(item));
      if (!alreadyLoggedItemIds.includes(item)) {
        sendMessage(item.transactionId, channeldId);
        alreadyLoggedItemIds.push(item.transactionId);
      }
    }

    // const result = getRandomEmoji();
    sendMessageButRespectThePast(result);
  }
};

function sendMessageButRespectThePast(message) {
  const channeldId = process.env.DISCORD_CHANNEL_ID;
  if (!alreadyLoggedItemIds.includes(message)) {
    sendMessage(message, channeldId);
  }
}

process.on("SIGINT", () => {
  console.log("Caught interrupt signal. Exiting gracefully...");
  process.exit(0);
});

async function seedMessages() {
  const messages = await getMessages();
  for (const message of messages) {
    if (!alreadyLoggedItemIds.includes(message.content)) {
      alreadyLoggedItemIds.push(message.content);
    }
  }
}

async function getTheCashlessDataAndExecute() {
  const accessToken = await getAccessToken();
  const accountId = process.env.GCLESS_ACCOUNT_ID;
  const details = await getDetails(accessToken, accountId);
  return details;
}

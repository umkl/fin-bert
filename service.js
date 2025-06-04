import { getMessages } from "./get-messages.js";
import getDetails from "./account-details.js";
import getAccessToken from "./get-access-token.js";
import { sendMessage } from "./send-message.js";
import { scheduleFunction } from "./scheduler.js";
import { getRandomEmoji } from "./discord-utils.js";
import { listNotionItems } from "./notion.js";
import { createTransaction } from "./notion.js";

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
      console.log("not possible: " + getRandomEmoji());
      return;
    }

    const completedBookings = details.transactions.booked;

    console.log(completedBookings);

    const alreadyLoggedIdsFromNotion = await listNotionItems();

    const alreadyLoggedIds = alreadyLoggedIdsFromNotion.map((notionItem) => {
      return notionItem.transactionId;
    });

    for (const completedBooking of completedBookings) {
      if (!alreadyLoggedIds.includes(completedBooking.transactionId)) {
        const message = `\`\`\`json

        ${JSON.stringify(completedBooking, null, 2)}
        
        \`\`\``;
        await sendMessage(message, channeldId);
        await createTransaction({
          transactionName: "Spotify Subscription",
          transactionId: completedBooking.transactionId,
          value: 100,
          type: "Expense",
        });
        alreadyLoggedItemIds.push(completedBooking.transactionId);
      }
    }
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
  if (process.env.MODE == "DEV") {
    console.log("i figured");
    return {
      transactions: {
        booked: [
          {
            transactionId: "123321",
          },
          {
            transactionId: "sadfasdf21221",
          },
        ],
      },
    };
  }
  const accessToken = await getAccessToken();
  const accountId = process.env.GCLESS_ACCOUNT_ID;
  const details = await getDetails(accessToken, accountId);
  return details;
}

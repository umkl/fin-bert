import dotenv from "dotenv";
import { DiscordRequest } from "./discord-utils.js";

dotenv.config();

const channeldId = process.env.DISCORD_CHANNEL_ID;

export async function getMessages(channelId, message) {
  const appId = process.env.DISCORD_APP_ID;
  const limit = 100;
  const globalEndpoint = `channels/${channeldId}/messages?limit=${limit}`;
  const messageBody = {
    content: message || "Hello, world!",
    channel_id: channeldId,
    tts: false,
  };

  try {
    const res = await DiscordRequest(globalEndpoint, {
      method: "GET",
    });

    return res.json();
  } catch (err) {
    console.error("Error installing commands: ", err);
  }
}

getMessages(channeldId);

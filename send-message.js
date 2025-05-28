import dotenv from "dotenv";
import { DiscordRequest } from "./discord-utils.js";

dotenv.config();

const channeldId = process.env.DISCORD_CHANNEL_ID;

export async function sendMessage(message, channelId) {
  const appId = process.env.APP_ID;
  const globalEndpoint = `channels/${channeldId}/messages`;
  const messageBody = {
    content: message || "Hello, world!",
    channel_id: channeldId,
    tts: false,
  };

  try {
    const res = await DiscordRequest(globalEndpoint, {
      method: "POST",
      body: messageBody,
    });

    console.log(await res.json());
  } catch (err) {
    console.error("Error installing commands: ", err);
  }
}

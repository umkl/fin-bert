// If you're using Node.js <18, install node-fetch first:
// npm install node-fetch
// Then uncomment the line below:
// import fetch from 'node-fetch';

import dotenv from "dotenv";
dotenv.config();

const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const SECRET_ID = process.env.GCLESS_SECRET_ID;
const SECRET_KEY = process.env.GCLESS_SECRET_KEY;

export default async function getAccessToken(refreshToken) {
  let response;
  if (refreshToken) {
    response = await fetch(
      "https://bankaccountdata.gocardless.com/api/v2/token/refresh/",
      {
        method: "POST",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          refresh: refreshToken,
        }),
      }
    );
  } else {
    response = await fetch(
      "https://bankaccountdata.gocardless.com/api/v2/token/new/",
      {
        method: "POST",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          secret_id: SECRET_ID,
          secret_key: SECRET_KEY,
        }),
      }
    );
  }

  if (!response.ok) {
    console.error("Failed to fetch token:", await response.text());
    return;
  }

  const data = await response.json();
  return data.access;
}

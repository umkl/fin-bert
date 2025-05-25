#!/usr/bin/env node

import { exit } from "process";
import setupPaymentRequisition from "./setup.js";

async function main() {
  console.log("Finbert Server Interface");

  const args = process.argv.slice(2);

  if (args.length < 1) {
    console.log("please provide an option:");
    console.log("1 - link");
    console.log("2 - details");
    console.log("3 - start the service");
    return;
  }

  const option = args[0];

  switch (option) {
    case "link":
      console.log("Retrieving Requisition Link...");
      const [link, id] = await setupPaymentRequisition();
      console.log("Requisition ID:", id);
      console.log("Requisition Link:", link);
      break;
    case "details":
      console.log("Setting up the service...");
      await setupPaymentRequisition();
      break;
    case "start":
      console.log("Starting the service...");
      startFinService();
      break;
    default:
      console.log("Invalid option. Please use 'setup' or 'start'.");
      return;
  }
  exit(1);
}

main().catch((error) => {
  console.error("Error:", error);
  process.exit(1);
});

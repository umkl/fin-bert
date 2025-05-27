#!/usr/bin/env node

import { exit } from "process";
import setupPaymentRequisition from "./setup.js";
import { getReqAccountId, getDetails } from "./setup.js";
import startFinService from "./service.js";

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
    case "accountid":
      if (args[1] === undefined) {
        console.log("Please provide a requisition ID for details.");
        return;
      }
      const requisitionId = args[1];
      const reqAccountId = await getReqAccountId(requisitionId);
      console.log("Req Account Id:", reqAccountId);
      break;
    case "details":
      if (args[1] === undefined) {
        console.log("Please provide an account ID for details.");
        return;
      }
      const accountId = args[1];
      const details = await getDetails(accountId);
      console.log("Account Details:", details);
      break;
    case "start":
      console.log("Starting the service...");
      startFinService();
      break;
    default:
      console.log("Invalid option. Please use 'setup' or 'start'.");
      return;
  }
}

main().catch((error) => {
  console.error("Error:", error);
  process.exit(1);
});

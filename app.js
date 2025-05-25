#!/usr/bin/env node

import getAccessToken from "./get-access-token.js";
import getInstitutions from "./institutions.js";
import createEndUserAgreement from "./enduser.js";
import createRequisition from "./requisition.js";
import getAccounts from "./accounts.js";
import getDetails from "./account-details.js";
import setupPaymentRequisition from "./setup.js";
import fs from "fs";

async function main() {
  console.log(process.argv);

  console.log("Finbert Server Interface");

  const args = process.argv.slice(2);

  if (args.length < 1 || args.length > 3) {
    console.log("please provide an option:");
    console.log("1 - setup");
    console.log("2 - start the service");
    return;
  }

  const option = args[2];

  switch (option) {
    case "setup":
      console.log("Setting up the service...");
      setupPaymentRequisition();
      break;
    case "start":
      console.log("Starting the service...");
      break;
    default:
      console.log("Invalid option. Please use 'setup' or 'start'.");
      return;
  }

  if (args[2]) {
    console.log("Using access token from command line argument.");
  }
}

main().catch((error) => {
  console.error("Error:", error);
  process.exit(1);
});

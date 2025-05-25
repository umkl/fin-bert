export default async function setupPaymentRequisition() {
  const at = await getAccessToken();
  console.log("Access Token:", at);

  // const ints = await getInstitutions(at);

  // fs.writeFileSync("institutions.json", JSON.stringify(ints, null, 2), "utf8");

  // const id = await createEndUserAgreement(at);
  // console.log(id);

  // const requisition = await createRequisition(at, id);
  // console.log("Requisition:", requisition);

  // const accounts = await getAccounts(
  //   at,
  //   "f34fc052-ee86-4266-b3f9-4a7ede2ca830"
  // );
  const accounts = await getAccounts(
    at,
    "f34fc052-ee86-4266-b3f9-4a7ede2ca830"
  );
  console.log("Accounts:", accounts);
  const details = await getDetails(at, accounts.accounts[0]);
  console.log("Account Details:", JSON.stringify(details, null, 2));
}

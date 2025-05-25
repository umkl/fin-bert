import getAccessToken from "./get-access-token.js";
import getInstitutions from "./institutions.js";
import createEndUserAgreement from "./enduser.js";
import createRequisition from "./requisition.js";
import getAccounts from "./accounts.js";
import getDetails from "./account-details.js";

export default async function setupPaymentRequisition() {
  const accessToken = await getAccessToken();
  const institutions = await getInstitutions(accessToken);
  const n26 = institutions.find((inst) => inst.name === "N26 Bank");
  const endUserAgreement = await createEndUserAgreement(accessToken, n26.id);
  const requisition = await createRequisition(
    accessToken,
    endUserAgreement.id,
    n26.id
  );
  return [requisition.link, requisition.id];
}

export async function getAccountDetails(requisitionId) {
  const accessToken = await getAccessToken();
  const accounts = await getAccounts(accessToken, requisitionId);
  const details = await getDetails(at, accounts.accounts[0]);
  return details;
}

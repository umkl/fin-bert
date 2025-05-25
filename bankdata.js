export async function getBankData(accessToken, id) {
  const response = await fetch(
    `https://bankaccountdata.gocardless.com/api/v2/aggreements/enduser/${id}/`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  );
  console.log("Response status:", response.status);
}

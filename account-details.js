export default async function getDetails(accessToken, accountId) {
  const response = await fetch(
    `https://bankaccountdata.gocardless.com/api/v2/accounts/${accountId}/transactions/`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  );
  if (!response.ok) {
    console.log("Failed to fetch account details:", await response.text());
    throw new Error(response.text());
  }
  const data = await response.json();
  return data;
}

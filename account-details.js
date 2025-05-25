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
    console.error("Failed to fetch account details:", await response.text());
    return;
  }
  const data = await response.json();
  console.log("Account details data:", data);
  return data;
}

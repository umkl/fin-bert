export default async function getAccounts(accessToken, id) {
  const response = await fetch(
    `https://bankaccountdata.gocardless.com/api/v2/requisitions/${id}`,
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

  const data = await response.json();
  return data;
}

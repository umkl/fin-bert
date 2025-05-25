export default async function createEndUserAgreement(accessToken) {
  const response = await fetch(
    "https://bankaccountdata.gocardless.com/api/v2/agreements/enduser/",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        institution_id: "N26_NTSBDEB1",
      }),
    }
  );
  const data = await response.json();
  if (!response.ok) {
    console.error("Failed to create end user agreement:", data);
    return;
  }

  return data;
}

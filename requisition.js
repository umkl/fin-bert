export default async function createRequisition(accesssToken, endUserId) {
  const response = await fetch(
    "https://bankaccountdata.gocardless.com/api/v2/requisitions/",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accesssToken}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        redirect: "https://google.com",
        institution_id: "N26_NTSBDEB1",
        reference: "bert frägt 2tes mal",
        agreement: endUserId,
        user_language: "en",
      }),
    }
  );

  if (!response.ok) {
    console.error("Failed to create requisition:", await response.text());
    return;
  }

  const data = await response.json();
  console.log("Requisition created:", data);
  return data;
}

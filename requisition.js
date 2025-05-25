export default async function createRequisition(
  accesssToken,
  endUserId,
  institutionId
) {
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
        redirect: "https://waterbyte.club",
        institution_id: institutionId,
        reference: Math.random().toString(36).substring(2, 15),
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
  return data;
}

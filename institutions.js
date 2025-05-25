export default async function getInstitutions(accessToken) {
  const response = await fetch(
    "https://bankaccountdata.gocardless.com/api/v2/institutions/",
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
    console.error("Failed to fetch institutions:", await response.text());
    return;
  }

  const data = await response.json();
  return data;
}

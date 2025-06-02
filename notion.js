import { Client } from "@notionhq/client";
import dotenv from "dotenv";
dotenv.config();

const notion = new Client({ auth: process.env.NOTION_INTEGRATION_TOKEN });

const databaseId = process.env.NOTION_PAGE_ID;

export async function listNotionItems() {
  try {
    const response = await notion.databases.query({
      database_id: databaseId,
    });

    const items = response.results.map((page) => {
      return {
        id: page.id,
        transactionName:
          page.properties["Transaction Name"]?.title[0]?.plain_text ||
          "Untitled",
        transactionId:
          page.properties["Transaction ID"]?.rich_text[0]?.plain_text || "",
        value: page.properties["Value"]?.number || 0,
        type: page.properties["Type"]?.select?.name || "Unknown",
      };
    });

    return items;
  } catch (error) {
    console.error("Error querying Notion database:", error);
    return [];
  }
}

export async function createTransaction({
  transactionName,
  transactionId,
  value,
  type, // 'Expense' or 'Earning'
}) {
  try {
    const response = await notion.pages.create({
      parent: {
        database_id: databaseId,
      },
      properties: {
        "Transaction Name": {
          title: [
            {
              text: {
                content: transactionName,
              },
            },
          ],
        },
        "Transaction ID": {
          rich_text: [
            {
              text: {
                content: transactionId,
              },
            },
          ],
        },
        Value: {
          number: value,
        },
        Type: {
          select: {
            name: type,
          },
        },
      },
    });

    console.log("Transaction created:", response.id);
    return response;
  } catch (error) {
    console.error("Error creating transaction:", error.message);
  }
}

export async function createTransactionDatabase(parentPageId) {
  try {
    const response = await notion.databases.create({
      parent: { page_id: parentPageId },
      title: [
        {
          type: "text",
          text: {
            content: "Transactions",
          },
        },
      ],
      properties: {
        "Transaction Name": {
          title: {},
        },
        "Transaction ID": {
          rich_text: {},
        },
        Value: {
          number: {
            format: "number",
          },
        },
        Type: {
          select: {
            options: [
              {
                name: "Expense",
                color: "red",
              },
              {
                name: "Earning",
                color: "green",
              },
            ],
          },
        },
      },
    });
    console.log("✅ Database created:", response.id);
    return response;
  } catch (error) {
    console.error("❌ Failed to create database:", error.message);
  }
}

/**
 * Updates an existing Notion database to include required transaction properties.
 * @param {string} databaseId - ID of the existing Notion database
 */
export async function updateTransactionDatabase(databaseId) {
  try {
    const response = await notion.databases.update({
      database_id: databaseId,
      properties: {
        "Transaction ID": {
          rich_text: {},
        },
        Value: {
          number: {
            format: "number",
          },
        },
        Type: {
          select: {
            options: [
              {
                name: "Expense",
                color: "red",
              },
              {
                name: "Earning",
                color: "green",
              },
            ],
          },
        },
      },
    });

    console.log("✅ Database updated:", response.id);
    return response;
  } catch (error) {
    console.error("❌ Failed to update database:", error.message);
  }
}

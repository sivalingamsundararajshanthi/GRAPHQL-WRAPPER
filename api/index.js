import fetch from "node-fetch";
import https from "https";
import express from "express";
import "dotenv/config";

const app = express();

app.listen(3000, () => console.log("API server running in 3000"));

app.get("/getProducts", async function (req, res) {
  const query = `{
    getDemoProduct(id: 1230) {
      ModelName,
      description,
      price,
      imageURL
    }
  }`;

  const httpsAgent = new https.Agent({
    rejectUnauthorized: false,
  });

  const response = await fetch(
    "https://13.72.118.201/pimcore-graphql-webservices/demo",
    {
      method: "POST",
      headers: {
        "Content-type": "application/graphql",
        apiKey: process.env.APIKEY,
      },
      body: JSON.stringify({ query }),
      agent: httpsAgent,
    }
  ).then((res) => res.json());

  return res.json(response);
});
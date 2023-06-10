import fetch from "node-fetch";
import https from "https";
import express from "express";
import "dotenv/config";
import cors from "cors";

const app = express();

// app.use(function (req, res, next) {
//   // Website you wish to allow to connect
//   res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");

//   // Request methods you wish to allow
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET, POST, OPTIONS, PUT, PATCH, DELETE"
//   );

//   // Request headers you wish to allow
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "X-Requested-With,content-type"
//   );

//   // Set to true if you need the website to include cookies in the requests sent
//   // to the API (e.g. in case you use sessions)
//   res.setHeader("Access-Control-Allow-Credentials", true);

//   // Pass to next layer of middleware
//   next();
// });

app.use(cors());

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

  const response = await fetch(process.env.URL, {
    method: "POST",
    headers: {
      "Content-type": "application/graphql",
      apiKey: process.env.APIKEY,
    },
    body: JSON.stringify({ query }),
    agent: httpsAgent,
  }).then((res) => res.json());

  return res.json(response);
});

app.get("/getAllProducts", async function (req, res) {
  const query = `{
    getDemoProductListing {
      edges {
          cursor
          node {
              ModelName,
              description,
              price,
              imageURL
          }
      }
    }
  }`;

  const httpsAgent = new https.Agent({
    rejectUnauthorized: false,
  });

  const response = await fetch(process.env.URL, {
    method: "POST",
    headers: {
      "Content-type": "application/graphql",
      apiKey: process.env.APIKEY,
    },
    body: JSON.stringify({ query }),
    agent: httpsAgent,
  }).then((res) => res.json());

  return res.json(response);
});

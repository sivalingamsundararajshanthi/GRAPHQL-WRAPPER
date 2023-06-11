import fetch from "node-fetch";
import https from "https";
import express from "express";
import "dotenv/config";
import cors from "cors";
import OktaJwtVerifier from "@okta/jwt-verifier";

const oktaJwtVerifier = new OktaJwtVerifier({
  issuer: process.env.OKTAURL,
});
const audience = process.env.AUDIENCE;

const app = express();

// app.use(cors());

app.use(cors()).listen(3000, () => console.log("API server running in 3000"));

// const authenticationRequired = async (req, res, next) => {
//   const authHeader = req.headers.authorization || "";
//   const match = authHeader.match(/Bearer (.+)/);
//   if (!match) {
//     return res.status(401).send();
//   }

//   try {
//     const accessToken = match[1];
//     if (!accessToken) {
//       return res.status(401, "Not authorized").send();
//     }
//     req.jwt = await oktaJwtVerifier.verifyAccessToken(accessToken, audience);
//     next();
//   } catch (err) {
//     return res.status(401).send(err.message);
//   }
// };

// app.all("*", authenticationRequired); // Require authentication for all routes

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

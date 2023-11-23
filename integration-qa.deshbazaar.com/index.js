// Import required modules
const express = require("express"); // Express framework for handling HTTP requests
const bodyParser = require("body-parser"); // Middleware for parsing request bodies
const crypto = require("crypto"); // Node.js crypto module for encryption and decryption
const _sodium = require("libsodium-wrappers");

const port = 8888; // Port on which the server will listen
const PRIVATE_KEY_1 =
  "MC4CAQAwBQYDK2VuBCIEIEiLMn8uiYwYq+gVgTZz5piR9/VUV8wXioIEMM2y5T1I";
const PUBLIC_KEY_1 =
  "MCowBQYDK2VuAyEAduMuZgmtpjdCuxv+Nc49K0cB6tL/Dj3HZetvVN7ZekM=";
const REQUEST_ID = "ad701b00-875e-11ee-b9d1-0242ac120002";
const SIGNING_PRIVATE_KEY =
  "QkJ8wctrsYYp6z8mzJxgTCACopg9hPNcbJuk3yjYBylNWHKdFSOOUV/e2SkIG27rBAySv/m/zcZmMWiHsCQsgA==";

const htmlFile = `
<!--Contents of ondc-site-verification.html. -->
<!--Please replace SIGNED_UNIQUE_REQ_ID with an actual value-->
<html>
  <head>
    <meta
      name="ondc-site-verification"
      content="Mk+jDOX6IQNv/5aYRRYLqEtBSWLJwiekOkVto63Di90grJya41wM13VzXlEPTAqy/rQJyVv5aozkzghN6hoTDw=="
    />
  </head>
  <body>
    ONDC Site Verification Page
  </body>
</html>
`;
// Pre-defined public and private keys
const privateKey = crypto.createPrivateKey({
  key: Buffer.from(PRIVATE_KEY_1, "base64"), // Decode private key from base64
  format: "der", // Specify the key format as DER
  type: "pkcs8", // Specify the key type as PKCS#8
});
const publicKey = crypto.createPublicKey({
  key: Buffer.from(PUBLIC_KEY_1, "base64"), // Decode public key from base64
  format: "der", // Specify the key format as DER
  type: "spki", // Specify the key type as SubjectPublicKeyInfo (SPKI)
});

// Calculate the shared secret key using Diffie-Hellman
const sharedKey = crypto.diffieHellman({
  privateKey: privateKey,
  publicKey: publicKey,
});

// Create an Express application
const app = express();
app.use(bodyParser.json()); // Middleware to parse JSON request bodies

// Route for handling subscription requests
app.post("/on_subscribe", function (req, res) {
  const { challenge } = req.body; // Extract the 'challenge' property from the request body
  const answer = decryptAES256ECB(sharedKey, challenge); // Decrypt the challenge using AES-256-ECB
  const resp = { answer: answer };
  res.status(200).json(resp); // Send a JSON response with the answer
});

// Route for serving a verification file
app.get("/ondc-site-verification.html", async (req, res) => {
  const signedContent = await signMessage(REQUEST_ID, SIGNING_PRIVATE_KEY);
  // Replace the placeholder with the actual value
  const modifiedHTML = htmlFile.replace(/SIGNED_UNIQUE_REQ_ID/g, signedContent);
  // Send the modified HTML as the response
  res.send(modifiedHTML);
});

// Default route
app.get("/", (req, res) => res.send("Hello World!"));

// Health check route
app.get("/health", (req, res) => res.send("Health OK!!"));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

// Decrypt using AES-256-ECB
function decryptAES256ECB(key, encrypted) {
  const iv = Buffer.alloc(0); // ECB doesn't use IV
  const decipher = crypto.createDecipheriv("aes-256-ecb", key, iv);
  let decrypted = decipher.update(encrypted, "base64", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
}

async function signMessage(signingString, privateKey) {
  await _sodium.ready;
  const sodium = _sodium;
  const signedMessage = sodium.crypto_sign_detached(
    signingString,
    sodium.from_base64(privateKey, _sodium.base64_variants.ORIGINAL)
  );
  const signature = sodium.to_base64(
    signedMessage,
    _sodium.base64_variants.ORIGINAL
  );
  return signature;
}

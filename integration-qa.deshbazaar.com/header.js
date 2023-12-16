import { createAuthorizationHeader, isSignatureValid } from "ondc-crypto-sdk-nodejs";
import Gor from "./grocery-design.json" with { type: "json" };

const privateKey = "QkJ8wctrsYYp6z8mzJxgTCACopg9hPNcbJuk3yjYBylNWHKdFSOOUV/e2SkIG27rBAySv/m/zcZmMWiHsCQsgA=="
const publicKey = "TVhynRUjjlFf3tkpCBtu6wQMkr/5v83GZjFoh7AkLIA="


async function name() {
  console.log(Gor)
  try {
    const header = await createAuthorizationHeader({
      body: Gor,
      privateKey:privateKey, 
      bapId: "integration-qa.deshbazaar.com", 
      bapUniqueKeyId: "8f5e11dc-878e-11ee-b9d1-0242ac120002",
    });
    console.log(header)
    

  } catch (error) {
    console.log(error);
  }
}

name();


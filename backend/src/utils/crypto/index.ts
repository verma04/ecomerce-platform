import crypto, { createCipheriv } from "crypto";
const algorithm = "aes-256-cbc";

const password: any = process.env.JWT_CRYPO_TOKEN;
const key = crypto.scryptSync(password, "salt", 32);
const iv = Buffer.alloc(16, 0);

const encryptToken = (data: string) => {
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(data, "utf8", "hex");
  encrypted += cipher.final("hex");
  return encrypted;
};

const decryptToken = (data: string) => {
  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  let decrypted = decipher.update(data, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
};

export { encryptToken, decryptToken };

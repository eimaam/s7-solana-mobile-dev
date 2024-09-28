import { Keypair } from "@solana/web3.js";
import fs from "fs";

// Generate keypair and store it in a file keypair.json
// aidropped sols to the keypair address to allow for umi transactions
export const generateSigner = async () => {
  const keypair = Keypair.generate();
  const keypairData = {
    secretKey: Array.from(keypair.secretKey),
    publicKey: keypair.publicKey.toBase58(),
  };
  fs.writeFileSync("keypair.json", JSON.stringify(keypairData));
  return keypair;
};

export const getPublicKey = async () => {
  const keypairData = JSON.parse(
    fs.readFileSync("keypair.json", "utf-8").toString()
  );
  const publicKey = keypairData.publicKey;
  return publicKey;
};

export const getSecretKey = () => {
  const keypairData = JSON.parse(fs.readFileSync("keypair.json", "utf-8"));
  const secretKey = new Uint8Array(keypairData.secretKey);
  return secretKey;
};

export const getKeypair = () => {
  const secretKey = getSecretKey();
  return Keypair.fromSecretKey(secretKey);
};

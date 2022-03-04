import { Keypair } from "@solana/web3.js";
import * as Random from "expo-random";
import { ethers } from "ethers";
import { Buffer } from "buffer";
import nacl from "tweetnacl";

const generateMnemonic = async () => {
  const randomBytes = await Random.getRandomBytesAsync(32);
  const mnemonic = ethers.utils.entropyToMnemonic(randomBytes);
  return mnemonic;
};

const createSolanaWallet = async () => {
  const mnemonic = await generateMnemonic();
  const seed = ethers.utils.mnemonicToSeed(mnemonic);
  const account = await createSolanaAccountFromSeed(seed);
  return account;
};

const createSolanaAccountFromSeed = async (seed: string) => {
  const hex = Uint8Array.from(Buffer.from(seed));
  const keypair = nacl.sign.keyPair.fromSeed(hex.slice(0, 32));
  return new Keypair(keypair);
};

const displayPublicKey = (publicKey: string) => {
  if (!publicKey) return;
  return `${publicKey.slice(0, 8)}...${publicKey.slice(publicKey.length - 8)}`;
};

export {
  createSolanaWallet,
  displayPublicKey,
};

import { createMint, getAccount, getMint, mintTo } from '@solana/spl-token';
import { clusterApiUrl, Connection, LAMPORTS_PER_SOL, PublicKey, Signer, Keypair } from '@solana/web3.js';

const createConnection = () => {
  return new Connection(clusterApiUrl('devnet'), 'confirmed');
}

const publicKeyFromSigner = (s: Signer) => {
  return s.publicKey;
};

const publicKeyFromString = (publicKeyString: string) => {
  return new PublicKey(publicKeyString);
};

const getBalance = async (publicKey: string) => {
  const connection = createConnection();
  const _publicKey = publicKeyFromString(publicKey);

  const lamports = await connection.getBalance(_publicKey).catch((err) => {
    console.error(`Error: ${err}`);
  });

  const sol = lamports / LAMPORTS_PER_SOL;
  return sol;
};

const requestAirDrop = async (publicKey: string) => {
  const connection = createConnection();

  const airdropSignature = await connection.requestAirdrop(
    publicKeyFromString(publicKey),
    LAMPORTS_PER_SOL
  );
  return await connection.confirmTransaction(airdropSignature);
};

const getSolanaPrice = async () => {
  const response = await fetch(
    `https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd`,
    {
      method: "GET",
    }
  );

  const data = await response.json();
  return data.solana.usd;
};

const mintSPL = async (
  payer: any,
  mintAuthority: string,
  freezeAuthority: string
): Promise<PublicKey> => {
  const connection = createConnection();
  const mint = await createMint(
    connection,
    payer,
    publicKeyFromString(mintAuthority),
    publicKeyFromString(freezeAuthority),
    9 // We are using 9 to match the CLI decimal default exactly
  );
  return mint;
}

const mintToSomeone = async (
  payer: any,
  mint: string,
  tokenAccount: string,
  mintAuthority: string,
  amount: number
) => {
  const connection = createConnection();
  await mintTo(
    connection,
    payer,
    publicKeyFromString(mint),
    publicKeyFromString(tokenAccount),
    publicKeyFromString(mintAuthority),
    amount
  );
}

const getTotalSupply = async (mint: string) => {
  const connection = createConnection();
  const mintInfo = await getMint(
    connection,
    publicKeyFromString(mint)
  )
  return mintInfo.supply;
}

const getOwnerBalace = async (tokenAccount: string) => {
  const connection = createConnection();
  const tokenAccountInfo = await getAccount(
    connection,
    publicKeyFromString(tokenAccount)
  )
  return tokenAccountInfo.amount;
}

export {
  createConnection,
  publicKeyFromSigner,
  publicKeyFromString,
  getBalance,
  requestAirDrop,
  getSolanaPrice,
  mintSPL,
  mintToSomeone,
  getTotalSupply,
  getOwnerBalace
}
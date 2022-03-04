import { Keypair } from "@solana/web3.js";
import React, { useEffect, useState } from "react";
import { createSolanaWallet } from "../utils";

interface AppContextInterface {
  publicKey: string;
  keyPair: Keypair | null;
  authority: string;
  freeze: string;
}

const initialState: AppContextInterface = {
  publicKey: "",
  keyPair: null,
  authority: "",
  freeze: "",
}

export const AppCtx = React.createContext<AppContextInterface>(initialState);

interface Props {
  children: React.ReactNode
}

const AppProvider = ({ children }: Props) => {
  const [context, setContext] = useState<AppContextInterface>({
    publicKey: "",
    keyPair: null,
    authority: "",
    freeze: "",
  });
  useEffect(() => {
    const abortController = new AbortController();
    (async () => {
      const account = await createSolanaWallet();
      const authorityAccount = await createSolanaWallet();
      const publicKey = account?.publicKey?.toString();
      const authority = authorityAccount?.publicKey.toString();
      setContext({
        ...context,
        publicKey: publicKey,
        keyPair: account,
        authority: authority,
        freeze: authority,
      })
    })();
    return () => {
      abortController.abort();
    }
  }, [])
  return (
    <AppCtx.Provider value={context}>{children}</AppCtx.Provider>
  );
}

export default AppProvider;
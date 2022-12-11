import { GasPrice, SigningCosmWasmClient, SigningStargateClient } from "cudosjs";

export const keplrSigningClient = async (  
): Promise<SigningStargateClient> => {
  if (!window.keplr || !window.keplr.getOfflineSignerAuto) {
    throw new Error("Keplr extension not installed")
  }

  await window.keplr.enable(import.meta.env.VITE_APP_CHAIN_ID).catch((err) => {
    console.error(err)
    throw new Error("Keplr can't connect to this chainId!")
  });

  // Setup signer
  const offlineSigner = await window.keplr.getOfflineSignerAuto(
    import.meta.env.VITE_APP_CHAIN_ID
  )  
 
  //stargate client
  const client = await SigningStargateClient.connectWithSigner(
    import.meta.env.VITE_APP_RPC,
    offlineSigner
  );

  return client;
}

export const getConnectedAccount =async () => {
    const key = await window.keplr!.getKey(import.meta.env.VITE_APP_CHAIN_ID);    
    return{ address: key.bech32Address, username: key.name};
}




import { GasPrice, SigningStargateClient } from "cudosjs";

export type AccountDetails = { address: string; username: string };

/**
 * Async function that returns a signing client associated with the keplr wallet extension.
 * We use this to sign and broadcast messages to Cudos network.
 *
 * @returns a promise of a SigningStargateClient object.
 */
export const keplrSigningClient = async (): Promise<SigningStargateClient> => {
  //checks whether the Keplr extension is installed and throws an error if it is not
  if (!window.keplr || !window.keplr.getOfflineSignerAuto) {
    throw new Error("Keplr extension not installed");
  }

  //async call on the enable method to request user's permission to authorise dapp to access the cudos chain on Keplr wallet
  //it also requests that the user unlocks the wallet if it is locked
  //If the user cancels the unlock or rejects the permission, an error will be thrown.
  await window.keplr.enable(import.meta.env.VITE_APP_CHAIN_ID).catch((err) => {
    console.error(err);
    throw new Error("Keplr can't connect to this chainId!");
  });

  // Setup signer for cudos
  const offlineSigner = await window.keplr.getOfflineSignerAuto(
    import.meta.env.VITE_APP_CHAIN_ID
  );

  // initialise a signing stargate client  with the offline signer that is injected by Keplr extension.
  const client = await SigningStargateClient.connectWithSigner(
    import.meta.env.VITE_APP_RPC,
    offlineSigner,
    {
      prefix: "cudos",
      gasPrice: GasPrice.fromString("5000000000000acudos"),
    }
  );

  return client;
};

/**
 * A function that retrieves an account object representing the current user's Cudos account on Keplr wallet extension
 * @returns the address and username of the currently connected account
 */
export const getConnectedAccount = async (): Promise<AccountDetails> => {
  const key = await window.keplr!.getKey(import.meta.env.VITE_APP_CHAIN_ID);
  return { address: key.bech32Address, username: key.name };
};

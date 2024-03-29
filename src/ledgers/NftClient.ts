// Import various functions and classes from the CudosJS library
import {
  Account,
  assertIsDeliverTxSuccess,
  GasPrice,
  SigningStargateClient,
  StargateClient,
  generateMsg,
} from "cudosjs";
// Import NFT-related query/response types from the CudosJS library
import {
  QueryCollectionResponse,
  QueryDenomByNameResponse,
  QueryDenomBySymbolResponse,
  QueryDenomResponse,
  QueryDenomsResponse,
  QueryNFTResponse,
  QuerySupplyResponse,
} from "cudosjs/build/stargate/modules/nft/proto-types/query";
import { IssueMessage, MintMessage } from "../types/nft";
import { getConnectedAccount } from "./KeplrLedger";

/**
 * Connects to the Cudos blockchain's RPC endpoint using the StargateClient class. It enables query operations on the Cudos blockchain.
 */
const queryClient = await StargateClient.connect(import.meta.env.VITE_APP_RPC);
/**
 * An interface that defines the functions needed to interact with the NFT module.
 */
export interface INftQueryClient {
  getAllDenoms: () => Promise<QueryDenomsResponse>;
  getDenom: (denomId: string) => Promise<QueryDenomResponse>;
  getToken: (denomId: string, tokenId: string) => Promise<QueryNFTResponse>;
  getAllTokensInCollection: (
    denomId: string
  ) => Promise<QueryCollectionResponse>;
  isValidAddress: (address: string) => Promise<Account | null>;
  getDenomByName: (denomName: string) => Promise<QueryDenomByNameResponse>;
  getDenomBySymbol: (symbol: string) => Promise<QueryDenomBySymbolResponse>;
  getNFTDenomSupply: (denomId: string) => Promise<QuerySupplyResponse>;
}

/**
 * A class that implements the INftQueryClient interface, providing an easy-to-use interface for querying the NFT module on the Cudos blockchain.
 */
export class NftQueryClient implements INftQueryClient {
  getAllDenoms() {
    return queryClient.nftModule.getNftDenoms();
  }
  getDenom(denomId: string) {
    return queryClient.nftModule.getNftDenom(denomId);
  }
  getToken(denomId: string, tokenId: string) {
    return queryClient.nftModule.getNftToken(denomId, tokenId);
  }
  getAllTokensInCollection(denomId: string) {
    return queryClient.nftModule.getNftCollection(denomId);
  }
  isValidAddress(address: string) {
    return queryClient.getAccount(address);
  }

  getDenomByName(denomName: string) {
    return queryClient.nftModule.getNftDenomByName(denomName);
  }
  getDenomBySymbol(symbol: string) {
    return queryClient.nftModule.getNftDenomBySymbol(symbol);
  }
  getNFTDenomSupply(denomId: string) {
    return queryClient.nftModule.getNftDenomSupply(denomId);
  }
}
/**
 * An interface that defines the functions for issuing and minting NFTs on the Cudos blockchain.
 * It includes functions for issueDenom, which issues a new NFT denomination, and mintNFT, which mints a new NFT.
 * An NFT must belong to a denomination/collection, hence a denom must be issued before an NFT can be created.
 */
export interface INftClient {
  issueDenom: (denomMessage: IssueMessage) => Promise<void>;
  mintNFT: (mintMessage: MintMessage) => Promise<void>;
}

export class NftClient implements INftClient {
  constructor(private client: SigningStargateClient) {
    this.client = client;
  }

  async issueDenom(denomMessage: IssueMessage) {
    const account = await getConnectedAccount();
    const denomMsg = generateMsg("msgIssueDenom", denomMessage);

    const result = await this.client.signAndBroadcast(
      account.address,
      [denomMsg],
      "auto"
    );
    assertIsDeliverTxSuccess(await result);
  }

  async mintNFT(mintMessage: MintMessage) {
    const account = await getConnectedAccount();
    const result = await this.client.nftMintToken(
      account.address,
      mintMessage.denomId,
      mintMessage.name,
      mintMessage.uri,
      mintMessage.data,
      mintMessage.recipient,
      GasPrice.fromString(import.meta.env.VITE_GAS_PRICE)
    );

    assertIsDeliverTxSuccess(result);
  }

  disconnect() {
    this.client.disconnect();
  }
}

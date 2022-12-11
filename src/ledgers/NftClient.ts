import { Account, assertIsDeliverTxSuccess, GasPrice, SigningStargateClient, StargateClient} from "cudosjs"
import { QueryCollectionResponse, QueryDenomByNameResponse, QueryDenomBySymbolResponse, QueryDenomResponse, QueryDenomsResponse, QueryNFTResponse, QuerySupplyResponse } from "cudosjs/build/stargate/modules/nft/proto-types/query";
import { IssueMessage, MintMessage } from "../types/nft";
import { getConnectedAccount } from "./KeplrLedger";

const queryClient = await StargateClient.connect(import.meta.env.VITE_APP_RPC);
 export interface INftQueryClient {
    getAllDenoms: () => Promise<QueryDenomsResponse>
    getDenom: (denomId: string) => Promise<QueryDenomResponse>
    getToken: (denomId: string, tokenId: string) => Promise<QueryNFTResponse>
    getAllTokensInCollection: (denomId: string) => Promise<QueryCollectionResponse>
    isValidAddress :(address:string) => Promise<Account|null>
    getDenomByName :(denomName:string) => Promise<QueryDenomByNameResponse>
    getDenomBySymbol: (symbol: string) => Promise<QueryDenomBySymbolResponse>
    getNFTDenomSupply:(denomId: string) => Promise<QuerySupplyResponse>
 }

export class NftQueryClient implements INftQueryClient {

    getAllDenoms(){ 
       return queryClient.nftModule.getNftDenoms();
    }
    getDenom(denomId: string) {
         return queryClient.nftModule.getNftDenom(denomId);
    } 
     getToken(denomId: string, tokenId: string){
        return queryClient.nftModule.getNftToken(denomId, tokenId);
    } 
     getAllTokensInCollection(denomId: string){
        return queryClient.nftModule.getNftCollection(denomId);
    }
     isValidAddress(address: string) {
        return queryClient.getAccount(address);        
    }

     getDenomByName(denomName: string){
        return queryClient.nftModule.getNftDenomByName(denomName);
    }
     getDenomBySymbol(symbol: string){
        return queryClient.nftModule.getNftDenomBySymbol(symbol);

    }
     getNFTDenomSupply(denomId: string){
        return queryClient.nftModule.getNftDenomSupply(denomId);
    } 
}

export class NftClient {
    constructor(private client: SigningStargateClient) {        
        this.client = client;        
    }

    async issueDenom(denomMessage: IssueMessage){
        const account = await getConnectedAccount();
        const result =  await this.client.nftIssueDenom(account.address,
                                 denomMessage.denomId,
                                 denomMessage.name,
                                 denomMessage.schema,
                                 denomMessage.symbol,
                                 '',
                                 account.address,
                                 denomMessage.schema,
                                 '',
                                 GasPrice.fromString(import.meta.env.VITE_GAS_PRICE)                                   
        );
        assertIsDeliverTxSuccess(result);
    }

    async mintNFT(mintMessage: MintMessage){
        const account = await getConnectedAccount();
        const result =  await this.client.nftMintToken(account.address,
                                           mintMessage.denomId,
                                           mintMessage.name,
                                           mintMessage.uri,
                                           mintMessage.data,
                                           mintMessage.recipient,
                                           GasPrice.fromString(import.meta.env.VITE_GAS_PRICE)                                   )
              
        assertIsDeliverTxSuccess(result);
    }  
    
    disconnect(){
        this.client.disconnect();
    }
}
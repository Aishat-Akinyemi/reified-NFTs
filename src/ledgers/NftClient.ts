import { Account, assertIsDeliverTxSuccess, GasPrice, SigningStargateClient, StargateClient, DirectSecp256k1HdWallet, generateMsg, estimateFee} from "cudosjs"
import { QueryCollectionResponse, QueryDenomByNameResponse, QueryDenomBySymbolResponse, QueryDenomResponse, QueryDenomsResponse, QueryNFTResponse, QuerySupplyResponse,  } from "cudosjs/build/stargate/modules/nft/proto-types/query";
import {Denom, } from 'cudosjs/build/stargate/modules/nft/proto-types/nft'
import {  } from 'cudosjs/build/stargate/index'
import { IssueMessage, MintMessage } from "../types/nft";
import { getConnectedAccount } from "./KeplrLedger";
// import { assertIsBroadcastTxSuccess} from "@cosmjs/stargate";

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
        const denomMsg = generateMsg('msgIssueDenom', denomMessage);

        const result = await this.client.signAndBroadcast(account.address,
                                                    [denomMsg],
                                                    "auto");
        assertIsDeliverTxSuccess(await result);
    }
    // async issueDenom(denomMessage: IssueMessage){
    //     const account = await getConnectedAccount();
        
    //     const result = (await this.client.nftIssueDenom(account.address,
    //         denomMessage.denomId,
    //         denomMessage.name,
    //         denomMessage.schema,
    //         denomMessage.symbol,
    //         'test',
    //         account.address,
    //         denomMessage.schema,
    //         'test',
    //         GasPrice.fromString("5000000000000acudos")
    //     ));
    //     console.log(result);
    //     assertIsDeliverTxSuccess(await result);
    // }

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
const mnemonic = "filter grab great blanket soon wire spot atom stem liar delay game";
const wallet = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic);
const [firstAccount] = await wallet.getAccounts();

export async function ss() {

const rpc = import.meta.env.VITE_APP_RPC;
const signingClient = await SigningStargateClient.connectWithSigner(rpc, wallet, {
    gasPrice: GasPrice.fromString("5000000000000acudos")
});
// const gasPrice = GasPrice.fromString('5acudos');

// const correctToken = {
//     approvedAddresses: [],
//     id: '1',
//     owner: '',
//     name: 'testToken',
//     uri: 'testUir',
//     data: 'testData',
//   }


// const result = await signingClient.nftModule.msgIssueDenom('djahk', 'dfff', 'shcemal', firstAccount.address, firstAccount.address, 'dddgkf', '', firstAccount.address, 'hi there', 'data',  GasPrice.fromString("5000000000000acudos"));
// console.log(result)

const denomMsg = generateMsg('msgIssueDenom', {
    id: 'denom456',  
    name: 'dfff', 
    schema: 'schemms',
    from: firstAccount.address,
    sender: firstAccount.address,
    chainId: import.meta.env.VITE_APP_CHAIN_ID,
    symbol: 'smbui'    
});
// const approxFee = await estimateFee(client, sender, [simulatedMsg], gasPrice, gasMultiplier, memo)
    //const approxFee = await estimateFee(signingClient, firstAccount.address, [denomMsg], GasPrice.fromString("5000000000000acudos") );
//return this.signAndBroadcast(sender, [msg], fee, memo);
const result = await signingClient.signAndBroadcast(
    firstAccount.address,
    [denomMsg],
    "auto",
)
console.log(result);
assertIsDeliverTxSuccess(result);
    
}
// export async function ss() {

// const rpc = import.meta.env.VITE_APP_RPC;
// const signingClient = await SigningStargateClient.connectWithSigner(rpc, wallet);
// // const gasPrice = GasPrice.fromString('5acudos');

// // const correctToken = {
// //     approvedAddresses: [],
// //     id: '1',
// //     owner: '',
// //     name: 'testToken',
// //     uri: 'testUir',
// //     data: 'testData',
// //   }

// const result = await signingClient.nftModule.msgIssueDenom('djahk', 'dfff', 'shcemal', firstAccount.address, firstAccount.address, 'dddgkf', '', firstAccount.address, 'hi there', 'data',  GasPrice.fromString("5000000000000acudos"));
// console.log(result)
// assertIsBroadcastTxSuccess(result);
    
// }
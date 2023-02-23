import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

import { ThemeProvider } from '@mui/material/styles';
import {Box, CssBaseline, Typography, Button} from '@mui/material';
import { useSnackbar } from 'notistack';
import '@fontsource/poppins'
import theme from './theme'
import { Routes, Route} from 'react-router-dom';
import { Home } from './Pages/Home/Home';
import Nav from './components/Nav/Nav';
import { NftClient, NftQueryClient } from './ledgers/NftClient';
import { keplrSigningClient, getConnectedAccount, AccountDetails } from './ledgers/KeplrLedger';
import { CollectionList } from './components/Collection/CollectionList';
import { NftList } from './components/Nft/NftList';
import {Mint} from './components/MintForm/Mint';
import { IssueMessage, MintMessage } from './types/nft';

function App() {  
  const [nftSingingClient, setNftSigningClient] = useState<NftClient | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false)
  const [account, setAccount] = useState<AccountDetails| null>(null)
  const nftQueryClient: NftQueryClient|null = new NftQueryClient(); 
  const { enqueueSnackbar } = useSnackbar();

  const disconnect = () => {       
    if(nftSingingClient) {     
      nftSingingClient.disconnect();
      setNftSigningClient(null);
      setAccount(null);
      setIsConnected(false);
    }
  }
  const connectWallet = async() => {
      try{
        const cudosSigningStargateClient =  await keplrSigningClient();        
        setNftSigningClient(new NftClient(cudosSigningStargateClient));       
        setAccount(await getConnectedAccount());
        setIsConnected(true);
      } catch (error:any){
          enqueueSnackbar(`Error Connecting! ${error.message}`, {
               variant: 'error'
          });
      } 
  }
  const getAllNftsById = async (denomId: string) =>{
    return await nftQueryClient.getAllTokensInCollection(denomId)
  } 
  
 const createDenom = async (denomMessage: IssueMessage) => {
      try {
         if(isConnected){
            await nftSingingClient?.issueDenom(denomMessage);
            return denomMessage.id;
         }
         else throw new Error("Keplr Wallet not connected");         
      } catch (error: any) {
        throw error;
      }
 }

 const mintNft = async (mintMessage: MintMessage) => {
  try {
    if(isConnected){
       await nftSingingClient?.mintNFT(mintMessage);
      //  enqueueSnackbar('NFT Minted', {
      //   variant: 'success' })
        return mintMessage.denomId;       
    }
    else throw new Error("Keplr Wallet not connected");         
 } catch (error: any) {
   throw error;
 }

 }

  return (  
       <Box sx={{ maxWidth: '100%' }} >      
        <ThemeProvider theme={theme}>        
          <CssBaseline/>
          <Box sx={{display:'flex', flexDirection:'column'}}>
              <Nav connect={connectWallet} disconnect={disconnect} account={account} isConnected={isConnected}/>
              <Box sx={{paddingTop: '5em'}}>
                <Routes>
                  <Route path='/' element={<Home/>}/>                  
                  <Route path='/collections' element={<CollectionList getDenom={nftQueryClient.getAllDenoms} account={account} />}/>
                  <Route path='/assets/:denomId' element={<NftList getNft={getAllNftsById} account={account}/>}/>
                  <Route path='/mint' element={<Mint createDenom={createDenom} mintNft={mintNft} account={account}/>}/>                 
              </Routes>
              </Box>         
          </Box>
        </ThemeProvider>
      </Box>
   
     
  )
}

export default App

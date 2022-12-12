import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

import { ThemeProvider } from '@mui/material/styles';
import {Box, CssBaseline, Typography, Button} from '@mui/material';
import { useSnackbar } from 'notistack';
import '@fontsource/poppins'
import theme from './theme'
import { Routes, Route, useNavigate} from 'react-router-dom';
import { Home } from './Pages/Home/Home';
import Nav from './components/Nav/Nav';
import { NftClient, NftQueryClient } from './ledgers/NftClient';
import { CudosSigningStargateClient } from 'cudosjs/build/stargate/cudos-signingstargateclient';
import { keplrSigningClient, getConnectedAccount, AccountDetails } from './ledgers/KeplrLedger';

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

  useEffect(() => {
    (async () => {
       console.log(await nftQueryClient.getAllDenoms());
    })();
  }, [])
  const connectWallet = async() => {
      try{
        const cudosSigningStargateClient =  await keplrSigningClient();        
        setNftSigningClient(new NftClient(cudosSigningStargateClient));       
        setAccount(await getConnectedAccount());
        setIsConnected(true);
      } catch (error:any){
          enqueueSnackbar(`Error Connecting! ${error.message}`, {
               variant: 'error',
               persist: true
          });
      } 
  }


  return (
  
       <Box sx={{ width: 1 }} >
        <ThemeProvider theme={theme}>        
          <CssBaseline/>
          <Box sx={{display:'flex', flexDirection:'column'}}>
              <Nav connect={connectWallet} disconnect={disconnect} account={account} isConnected={isConnected}/>
              <Home/>          
          </Box>
        </ThemeProvider>
      </Box>
   
     
  )
}

export default App

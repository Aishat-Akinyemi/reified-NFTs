import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

import { ThemeProvider } from '@mui/material/styles';
import {Box, CssBaseline, Typography, Button} from '@mui/material';
import { SnackbarProvider } from 'notistack';
import '@fontsource/poppins'
import theme from './theme'
import { Routes, Route, useNavigate} from 'react-router-dom';
import { Home } from './Pages/Home/Home';
import Nav from './components/Nav/Nav';
import { NftClient, NftQueryClient } from './ledgers/NftClient';
import { CudosSigningStargateClient } from 'cudosjs/build/stargate/cudos-signingstargateclient';
import { keplrSigningClient, getConnectedAccount, AccountDetails } from './ledgers/KeplrLedger';
import { connectWallet } from '@cosmostation/cosmos-client';

function App() {
  const [nftSingingClient, setNftSigningClient] = useState<NftClient | null>(null);
  const[nftQueryClient, setNftQueryClient] = useState<NftQueryClient | null>(null);
  const [account, setAccount] = useState<AccountDetails| null>(null)

  const getAndSetNftQueryClient = async () => {
    setNftQueryClient(new NftQueryClient());
  }

  const disconnect = () => {
    if(nftSingingClient) {
      nftSingingClient.disconnect();
      setNftSigningClient(null);
      setAccount(null);
      console.log(nftSingingClient);
      console.log(account);
    }
  }

  useEffect(() => {
    getAndSetNftQueryClient();   
    
    return () => {
      setNftQueryClient(null);
    }
  }, [])
  
  useEffect(() => {
    (async () => {
        const accDetails = await getConnectedAccount();
        setAccount(accDetails);
    })()

  }, [nftSingingClient])
  
  const connectWallet = async() => {
      try{
        const cudosSigningStargateClient =  await keplrSigningClient();        
        setNftSigningClient(new NftClient(cudosSigningStargateClient));
      } catch{
          //alert error
      } 
  }


  return (
    <SnackbarProvider maxSnack={2}>
       <Box sx={{ width: 1 }} >
        <ThemeProvider theme={theme}>        
          <CssBaseline/>
          <Box sx={{display:'flex', flexDirection:'column'}}>
              <Nav connect={connectWallet} disconnect={disconnect} account={account}/>
              <Home/>          
          </Box>
        </ThemeProvider>
      </Box>
    </SnackbarProvider>
     
  )
}

export default App

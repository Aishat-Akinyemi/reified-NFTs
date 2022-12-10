import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

import { ThemeProvider } from '@mui/material/styles';
import {Container, CssBaseline, Typography, Button} from '@mui/material';

import '@fontsource/poppins'
import theme from './theme'
import { Nft } from './components/Nft/Nft';



function App() {

  return (
    <Container >
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <Container maxWidth="sm">
        </Container>
      </ThemeProvider>
    </Container>
  )
}

export default App

import { Box, Paper, Grid, Typography, Divider, Button, Card, CardMedia, CardContent } from '@mui/material'
import { QueryDenomsResponse } from 'cudosjs/build/stargate/modules/nft/proto-types/query'
import { useEffect, useState } from 'react'
import { AccountDetails } from '../../ledgers/KeplrLedger'
import { Collection } from './Collection'
import reified from '../../assets/reified.png'
import { Denom } from '../../types/nft'


type CollectioListProps  = {
    getDenom:  Promise<QueryDenomsResponse>
    account: AccountDetails|null,
}
export const CollectioList = ({getDenom, account}: CollectioListProps) => {
    const [filteredDenoms, setFilteredDenom] = useState<Denom[]>([])
    useEffect(() => {
        (async () => {
            const resp = await getDenom; 
            setFilteredDenom(
                resp?.denoms.filter(denom => denom.creator == account?.address)
                ?? []                    
                ) ;    
        })();    
    }, []);    

    if(filteredDenoms.length<1){
        return (
            <Card sx={{ display: 'flex', width: '95vw', height:'100vh'}}>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flex: '1', width: '40vW', padding: 5}}>
                <Typography gutterBottom variant="h5" component="div" sx={{padding:5}}>
                            You have not Created any Collections
                </Typography>
                    <Typography variant="h6" color="text.secondary" component="div" sx={{padding: 5}}>
                        Mint NFTs to represent your physical assets on the Cudos Blockchain. 
                        Connect your Wallet to start minting NFTs on Reified.
                    </Typography>
                    <Button variant='contained' color='primary' sx={{margin: 5}}>
                                    Create Collection
                                </Button>
                </CardContent>
                </Box>
            <CardMedia
              component="img"
              sx={{ flex: '1', width: '100%', height: '100%', objectFit: 'cover'}}
              image={reified}
              alt="Live from space album cover"
              sizes='(max-width: 600px) 50vw,
                    800px'
            />
          </Card>
             
          )
    }    
  return (
    <Box sx={{padding: '5em', bgcolor: 'background.paper'}}>  
        {/* <Box sx={{ padding:'2em' }}> */}
            <Grid container wrap='nowrap' direction="column" >
                <Grid item>
                    <Typography gutterBottom variant="h5" component="div">
                        Your Assets Collections
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography gutterBottom variant="h6" component="div">
                     You can Expand Each Collection to Load the NFTs in each.
                    </Typography>
                </Grid>
            </Grid>
        {/* </Box> */}
        <Divider sx={{margin:'1em'}}></Divider>
        <Box sx={{ flexGrow: 1, minHeight:'60vh', my:5, mx:3, padding: 3}}>
            <Grid
                container                
                spacing={{ xs: 2, md: 3 }} 
                columns={{ xs: 4, sm: 8, md: 12, lg:25 }}>
                {filteredDenoms.map((denom, index) => (
                <Grid item xs={4} sm={4} md={4} lg={5} key={index}>
                    <Collection denom={denom}></Collection>
                </Grid>
                ))}
            </Grid>  
        </Box>
    </Box>
  )
}



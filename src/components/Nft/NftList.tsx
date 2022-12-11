import { Box, Paper, Grid, Typography, Divider } from '@mui/material'
import React from 'react'
import { AllTokenResponse } from '../../types/nft'
import { Nft } from './Nft'

type NftListProps  = {
    nfts: AllTokenResponse
}
// export const NftList = ({nfts}: NftListProps) => {
export const NftList = () => {
    const nfts = getalltoken;
  return (
    <Box sx={{p: 2, bgcolor: 'background.paper', width:1}}>  
        <Box sx={{ my: 3, mx: 2 }}>
            <Grid container wrap='nowrap' spacing={3} >
                <Grid item xs={8}>
                    <Typography gutterBottom variant="h5" component="div">
                        {nfts.collection.denom.name} Collection
                    </Typography>
                </Grid>
                <Grid item xs={4}>
                    <Typography gutterBottom variant="h6" component="div">
                      Symbol:  {nfts.collection.denom.symbol}
                    </Typography>
                </Grid>
            </Grid>
            <Grid container wrap='nowrap' spacing={3}  >
                <Grid item xs={8}>
                    <Typography color="text.secondary" variant="body2" component="div">
                        {nfts.collection.denom.schema}
                    </Typography>
                </Grid>
                <Grid item xs={4}>
                    <Typography color="text.secondary" variant="body2" component="div">
                       Count: {nfts.collection.nfts.length}
                    </Typography>
                </Grid>
            </Grid>
        </Box>
        <Divider variant="fullWidth" sx={{m: 10, color: 'primary.dark'}}/>
        <Box sx={{ flexGrow: 1 }}>
            <Grid
                container                
                spacing={{ xs: 2, md: 3 }} 
                columns={{ xs: 4, sm: 8, md: 12, lg:16 }}>
                {nfts.collection.nfts.map((nft, index) => (
                <Grid item xs={4} sm={4} md={4} lg={4} key={index}>
                    <Nft></Nft>
                </Grid>
                ))}
            </Grid>                
            {/* <Grid
                container                
                spacing={{ xs: 2, md: 3 }} 
                columns={{ xs: 4, sm: 8, md: 12 }}>
                {nfts.collection.nfts.map((nft, index) => (
                <Grid item xs={2} sm={4} md={4} key={index}>
                    <Nft></Nft>
                </Grid>
                ))}
            </Grid>                 */}
        </Box>
    </Box>
  )
}

const getalltoken = {
    "collection": {
        "denom": {
            "id": "testdenom",
            "name": "TESTDENOM",
            "schema": "testschema",
            "creator": "cudos1knf0flyucc2ut40cg8tn48sp70p2e65wse7qec",
            "symbol": "testSymbol"
        },
        "nfts": [
            {
                "id": "1",
                "name": "testtoken",
                "uri": "",
                "data": "testData",
                "owner": "cudos1knf0flyucc2ut40cg8tn48sp70p2e65wse7qec",
                "approvedAddresses": []
            },
            {
                "id": "2",
                "name": "",
                "uri": "",
                "data": "",
                "owner": "cudos1knf0flyucc2ut40cg8tn48sp70p2e65wse7qec",
                "approvedAddresses": []
            },
            {
                "id": "3",
                "name": "",
                "uri": "",
                "data": "",
                "owner": "cudos1knf0flyucc2ut40cg8tn48sp70p2e65wse7qec",
                "approvedAddresses": []
            },
            {
                "id": "2",
                "name": "",
                "uri": "",
                "data": "",
                "owner": "cudos1knf0flyucc2ut40cg8tn48sp70p2e65wse7qec",
                "approvedAddresses": []
            },
            {
                "id": "3",
                "name": "",
                "uri": "",
                "data": "",
                "owner": "cudos1knf0flyucc2ut40cg8tn48sp70p2e65wse7qec",
                "approvedAddresses": []
            },
            {
                "id": "2",
                "name": "",
                "uri": "",
                "data": "",
                "owner": "cudos1knf0flyucc2ut40cg8tn48sp70p2e65wse7qec",
                "approvedAddresses": []
            },
            {
                "id": "3",
                "name": "",
                "uri": "",
                "data": "",
                "owner": "cudos1knf0flyucc2ut40cg8tn48sp70p2e65wse7qec",
                "approvedAddresses": []
            }
        ]
    },
    "pagination": {
        "total": {
            "low": 3,
            "high": 0,
            "unsigned": true
        },
        "nextKey": {}
    }
}

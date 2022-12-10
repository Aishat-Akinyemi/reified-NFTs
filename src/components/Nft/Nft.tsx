import React from 'react'
import { Tooltip, Box, Card, CardHeader, CardContent, CardActions, Avatar, IconButton, IconButtonProps, Typography } from '@mui/material'
import { OpenInFullRounded, MoreVert  } from '@mui/icons-material';
import {Nft as Token} from '../../types/nft'

// export const NFT = (nft: Token) => {
export const Nft = () => {
    const nft = token.nft;
  return (
    <Box>
        <Card sx={{ 
            maxWidth: 400, 
            bgcolor: 'background.default',
            boxShadow: 1,
            borderRadius: 5,
            p: 2,
            borderColor: 'secondary.light'
            }} variant="outlined">
        <CardHeader
            avatar={
                <Tooltip title={nft.name}>
                    <Avatar sx={{ bgcolor: 'primary.light', width: 64, height: 64, borderColor: 'primary'}} sizes="md" aria-label="symbol">
                    {(nft.name.substring(0, 5)).toLocaleUpperCase()}
                    </Avatar>
                </Tooltip>
            }
            action={
            <IconButton aria-label="more">
                <MoreVert color='primary'/>
            </IconButton>
            }
            title={
                <Tooltip title={nft.name}>
                <Typography color="text.secondary">
                 {`${(nft.name).toLocaleUpperCase()}`}
                </Typography>
            </Tooltip>
            }
            subheader={
                <Tooltip title={nft.owner}>
                    <Typography sx={{ my: 1.5, fontSize: 12 }} color="text.secondary">
                     {`${nft.owner.substring(0, 30)}...`}
                    </Typography>
                </Tooltip>
            }
        />      
        <CardContent>
            <Typography variant="body2" color="text.secondary">
                {nft.data}        
            </Typography>
        </CardContent>
        <CardActions disableSpacing>
            <Tooltip title="View NFTs in Collection">
                <IconButton aria-label="View Collection">
                <OpenInFullRounded color='primary'/>
                </IconButton> 
            </Tooltip>                       
        </CardActions>      
        </Card>
    </Box>
  )
}

const token = {
    "nft": {
        "id": "1",
        "name": "testtoken",
        "uri": "",
        "data": "testData",
        "owner": "cudos1knf0flyucc2ut40cg8tn48sp70p2e65wse7qec",
        "approvedAddresses": ["cudos1knf0flyucc2ut40cg8tn48sp70p2e65wse7qec", "cudos1jxyc7lny4q7te6sj5xyt9j86kyz82vlfdprl4a", "cudos1nj49l56x7sss5hqyvfmctxr3mq64whg273g3x5"]
    }
}
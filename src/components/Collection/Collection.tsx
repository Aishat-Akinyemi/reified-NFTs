import React from 'react'
import { Tooltip, Box, Card, CardHeader, CardContent, CardActions, Avatar, IconButton, IconButtonProps, Typography } from '@mui/material'
import { OpenInFullRounded, MoreVert  } from '@mui/icons-material';



// export const Collection = (denom: Denom) => {
export const Collection = () => {
    const denom = denom1.denom;
  return (
    <Box>
        <Card sx={{ 
            maxWidth: 400, 
            bgcolor: 'background.default',
            boxShadow: 1,
            borderRadius: 5,
            p: 2,
            borderColor: 'secondary.light',
            '&:hover': {
                // backgroundColor: 'primary.main',
                opacity: [0.9, 0.8, 0.7],
              },
            }} variant="outlined">
        <CardHeader
            avatar={
                <Tooltip title={denom.symbol}>
                    <Avatar sx={{ bgcolor: 'primary.light', width: 48, height: 48, borderColor: 'primary'}} sizes="md" aria-label="symbol">
                        <Typography sx={{fontSize: 10, fontWeight:'bold' }}>
                            {(denom.symbol.substring(0, 5)).toLocaleUpperCase()}
                        </Typography>
                    </Avatar>
                </Tooltip>
            }
            action={
            <IconButton aria-label="more">
                <MoreVert color='primary'/>
            </IconButton>
            }
            title={
                <Tooltip title={denom.name}>
                <Typography color="text.secondary">
                 {`${(denom.name).toLocaleUpperCase()}`}
                </Typography>
            </Tooltip>
            }
            subheader={
                <Tooltip title={denom.creator}>
                    <Typography sx={{ my: 1.5, fontSize: 12 }} color="text.secondary">
                     {`${denom.creator.substring(0, 30)}...`}
                    </Typography>
                </Tooltip>
            }
        />      
        <CardContent>
            <Typography variant="body2" color="text.secondary">
                {denom.schema}        
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

const denom1 = {
        "denom": {
            "id": "testdenom",
            "name": "TESTDENOM",
            "schema": "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Id aperiam rerum, dicta aliquid earum quod reprehenderit, fugiat cupiditate ipsam dolores odit exercitationem! Deleniti pariatur dicta minima fuga a fugiat aperiam. ",
            "creator": "cudos1knf0flyucc2ut40cg8tn48sp70p2e65wse7qec",
            "symbol": "testSymbol"
        }
    }
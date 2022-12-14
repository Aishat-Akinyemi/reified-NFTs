import React from 'react'
import { Tooltip, Box, Card, CardHeader, CardContent, CardActions, Avatar, IconButton, IconButtonProps, Typography } from '@mui/material'
import { OpenInFullRounded, MoreVert  } from '@mui/icons-material';
import { Denom } from '../../types/nft';
import {useNavigate} from 'react-router-dom';

type CollectionProps = {
    denom: Denom
}

export const Collection = ({denom}:CollectionProps) => {  
    let navigate = useNavigate();    
    
  return (
    <Box>
        <Card sx={{ 
            maxWidth: 400, 
            height: 300,
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
                            {(denom.symbol)?
                                (denom.symbol.substring(0, 5)).toLocaleUpperCase()
                                :
                                ''
                            }
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
                     {`${denom.creator.substring(0, 15)}...`}
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
                <IconButton aria-label="View Collection"
                    onClick={() => {
                        navigate(`/assets/${denom.id}`, {state:denom.id})
                    }}
                >
                <OpenInFullRounded color='primary'/>
                </IconButton> 
            </Tooltip>                       
        </CardActions>      
        </Card>
    </Box>
  )
}


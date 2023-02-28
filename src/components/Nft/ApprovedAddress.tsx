import { Stack, Typography } from '@mui/material'
import React from 'react'

export const ApprovedAddress = () => {
// export const ApprovedAddress = ({addresses} : ApprovedAddressProps) => {
    const addresses = ["cudos1knf0flyucc2ut40cg8tn48sp70p2e65wse7qec", "cudos1jxyc7lny4q7te6sj5xyt9j86kyz82vlfdprl4a", "cudos1nj49l56x7sss5hqyvfmctxr3mq64whg273g3x5"]

  return (
    <Stack spacing={1}>
        <>
            {addresses.map((address, ind) => (
                        <Typography key={ind} sx={{ color: 'text.secondary'}}>
                            add  is {address}
                        </Typography>
            ))
            }
        </>       
    </Stack>
  )
}

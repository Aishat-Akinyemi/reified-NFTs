import React from "react";
import {
  Tooltip,
  Box,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Avatar,
  IconButton,
  Typography,
} from "@mui/material";
import { OpenInFullRounded, MoreVert } from "@mui/icons-material";
import { Nft as Token } from "../../types/nft";

type NFTProps = {
  nft: Token;
};
export const NFT = ({ nft }: NFTProps) => {
  return (
    <Box>
      <Card
        sx={{
          maxWidth: 400,
          height: 300,
          bgcolor: "background.default",
          boxShadow: 1,
          borderRadius: 5,
          p: 2,
          borderColor: "secondary.light",
          "&:hover": {
            // backgroundColor: 'primary.main',
            opacity: [0.9, 0.8, 0.7],
          },
        }}
        variant="outlined"
      >
        <CardHeader
          avatar={
            <Tooltip title={nft.name}>
              <Avatar
                sx={{
                  bgcolor: "primary.light",
                  width: 48,
                  height: 48,
                  borderColor: "primary",
                }}
                sizes="md"
                aria-label="symbol"
              >
                <Typography sx={{ fontSize: 10, fontWeight: "bold" }}>
                  {nft.name.substring(0, 5).toLocaleUpperCase()}
                </Typography>
              </Avatar>
            </Tooltip>
          }
          action={
            <IconButton aria-label="more">
              <MoreVert color="primary" />
            </IconButton>
          }
          title={
            <Tooltip title={nft.name}>
              <Typography color="text.secondary">
                {`${nft.name.toLocaleUpperCase()}`}
              </Typography>
            </Tooltip>
          }
          subheader={
            <Tooltip title={nft.owner}>
              <Typography sx={{ my: 1.5, fontSize: 12 }} color="text.secondary">
                {`${nft.owner.substring(0, 15)}...`}
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
          <Tooltip title={nft.uri}>
            <IconButton aria-label="Url">
              <OpenInFullRounded color="primary" />
            </IconButton>
          </Tooltip>
        </CardActions>
      </Card>
    </Box>
  );
};

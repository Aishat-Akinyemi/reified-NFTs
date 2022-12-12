import {
    Container,
    Grid,
    Box,
    Typography,
    Stack,
    Link as MuiLink,
    FormControlLabel,
    Checkbox,
  } from '@mui/material';
  import LoadingButton from '@mui/lab/LoadingButton';
  import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
  import { Link } from 'react-router-dom';
  import { boolean, literal, object, string, TypeOf } from 'zod';
  import { zodResolver } from '@hookform/resolvers/zod';
  import FormInput from './FormInput';
  import styled from '@emotion/styled';
import { Denom, MintMessage, Nft } from '../../types/nft';
import { border } from '@mui/system';
import { useState } from 'react';
import { AccountDetails } from '../../ledgers/KeplrLedger';
import { useSnackbar } from 'notistack';
  
// ? nft form Schema with Zod
const nftFormSchema = object({
    name: string()
        .min(4, 'Name is required')
        .max(20, 'Name should not be more than 20 character')
        .refine((val)=> {
            return true;
        }, { message: 'Name already in use'}),  
    uri: string().url('This must be a valid url'),
    data: string().optional(),        
    mintForAnotherAddress: boolean().optional(),
    recipient: string().min(2) // is valid address .refine()
  });
  
// ? Infer the Schema to get the TS Type
type INFT = TypeOf<typeof nftFormSchema>;

export type NftFormProps = {
  account:AccountDetails|null
  mintNft: (mintMessage: MintMessage) => Promise<string| undefined>
  denomId: string|undefined
  setIsMintingNFTSucceed: any

}

export const NftForm = ({mintNft, account, denomId, setIsMintingNFTSucceed}: NftFormProps) => {
  const { enqueueSnackbar } = useSnackbar();
    // ? Default Values
  const defaultValues: INFT = {
    name: '',  
    recipient: 'addressProps' ,
    data: '',
    uri: '',
    mintForAnotherAddress: false
  };

  // ? The object returned from useForm Hook
  const methods = useForm<INFT>({
    resolver: zodResolver(nftFormSchema),
    defaultValues,
  });

  // ? Submit Handler
  const onSubmitHandler: SubmitHandler<INFT> = async (values: INFT) => {
    if(account?.address && denomId){
        const mintMsg: MintMessage  = {
          denomId: denomId,
          name: values.name,
          uri: values.uri,
          data: values.data ?? '',
          from: account.address,
          recipient: values.mintForAnotherAddress ? values.recipient : account.address,
          chainId: import.meta.env.VITE_APP_CHAIN_ID
        }      
      await mintNft(mintMsg);
      setIsMintingNFTSucceed(true);
    }  
    else {       
      throw new Error("Please Connect your Keplr Wallet");
  }
  };

  const [currentAccountIsRecipient, setCurrentAccountIsRecipient] =useState(true);

  return (
    <Container
      
      sx={{ height: '100%', backgroundColor: 'text.secondary', width:'40em'}}
    >
          <FormProvider {...methods}>
              <Box
                    display='flex'
                    flexDirection='column'
                    component='form'
                    noValidate
                    autoComplete='off'
                    sx={{ py: '6rem',
                        px: '1rem',

                    }}
                    onSubmit={(e) => {
                        methods.handleSubmit(onSubmitHandler)(e)
                        .catch((error) => {
                          enqueueSnackbar(error.message, {
                            variant: 'error'
                          })
                        })
                    }}
                  >
                    <Typography
                      variant='h6'
                      component='h1'
                      sx={{ textAlign: 'center', mb: '1.5rem' }}
                    >
                      Mint Asset as NFT 
                    </Typography>

                    <FormInput
                      label='Name'
                      type='text'                      
                      name='name'
                      focused
                      required
                    />
                    <FormInput
                      type='text'
                      label='URI'
                      name='uri'
                      required
                      focused
                    />

                    <FormInput
                      type='text'
                      label='Description'
                      name='data'                      
                      focused
                      required
                      multiline
                      rows={5}
                    />

                    
                    <FormControlLabel
                      control={
                        <Checkbox
                          size='small'
                          aria-label='mint for someone else checkbox'                          
                          sx={{outline: '1px solid #576b92'}}
                          color='secondary'
                          {...methods.register('mintForAnotherAddress', {
                            onChange: (e) => {
                                if(currentAccountIsRecipient) {
                                    methods.setValue('recipient', '')
                                } else{
                                    methods.setValue('recipient', 'cu')
                                }
                                setCurrentAccountIsRecipient(!currentAccountIsRecipient);                                
                            }
                          })                        
                         }
                        />
                      }
                      label={
                        <Typography
                          variant='body2'
                          sx={{
                            fontSize: '1rem',
                            fontWeight: 400,
                            color: '#5e5b5d',
                            padding: '1rem'

                          }}
                        >
                          Mint NFT to a Separate Address
                        </Typography>
                      }
                    />

                   {    !currentAccountIsRecipient &&             
                        <FormInput
                        type='text'
                        label='Recipient Address'
                        name='recipient'
                        InputProps={{
                            readOnly: currentAccountIsRecipient,
                          }}
                        />
                    }

                    <LoadingButton
                      loading={false}
                      type='submit'
                      variant='contained'
                      sx={{
                        py: '0.8rem',
                        mt: 2,
                        width: '80%',
                        marginInline: 'auto',
                      }}
                    >
                      Minting Asset
                    </LoadingButton>
                  </Box>            
            {/* </Grid> */}
          </FormProvider>
    </Container>
  )
}


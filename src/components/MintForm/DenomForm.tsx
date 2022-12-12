import {
    Container,
    Box,
    Typography,
    Link as MuiLink,
  } from '@mui/material';
  import LoadingButton from '@mui/lab/LoadingButton';
  import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
  import { Link } from 'react-router-dom';
  import { object, string, TypeOf } from 'zod';
  import { zodResolver } from '@hookform/resolvers/zod';
  import FormInput from './FormInput';
  import styled from '@emotion/styled';
import { Denom, IssueMessage } from '../../types/nft';
import { NftQueryClient } from '../../ledgers/NftClient';
import { account } from '@cosmostation/extension-client/aptos';
import { AccountDetails } from '../../ledgers/KeplrLedger';
import { useSnackbar } from 'notistack';

const nftQueryClient = new NftQueryClient();
  
// ? Login Schema with Zod
const denomFormSchema  = object({
    denomId: string()
        .min(4, 'DenomId should be at least 4 alphanumeric character')
        .max(8, 'DenomId should not be more than 8 characters')
        .refine(async (val)=> {
          try{
            const denom =  await (await nftQueryClient.getDenom(val)).denom;           
            return denom == null;
          } catch (e:any){
            return e.message.includes('not found denom') 
          }   
        }, { message: 'DenomId already in use.'}),
    name: string()
        .min(4, 'Name is required.')
        .max(20, 'Name should not be more than 20 characters.')
        .refine(async (val)=> {
          try{
            const denom =  await (await nftQueryClient.getDenomByName(val)).denom;           
            return denom == null;
          } catch (e:any){
            return e.message.includes('not found denom') 
          }   
        }, { message: 'Name already in use'}),
    symbol: string()
        .min(3, 'Symbol must be at least 3 characters.')
        .max(6, 'Symbol cannot be more than 6 characters.')
        .refine(async (val)=> {
          try{
            const denom =  await (await nftQueryClient.getDenomBySymbol(val)).denom;           
            return denom == null;
          } catch (e:any){
            return e.message.includes('not found denom') 
          }   
        }, { message: 'Symbol already in use'}),
        
    description: string().optional(),
  });
  
// ? Infer the Schema to get the TS Type
type IDenom = TypeOf<typeof denomFormSchema>;


export type DenomFormProps = {
  createDenom: (denom: IssueMessage) =>Promise<string | undefined>
  account: AccountDetails | null,
  setDenom: any,
  setIsCreatingCollectionFailed: any
}
export const DenomForm = ({createDenom, account, setDenom, setIsCreatingCollectionFailed}: DenomFormProps) => {
  const { enqueueSnackbar } = useSnackbar();
    // ? Default Values
  const defaultValues: IDenom = {
    denomId: '',
    name: '',
    symbol: '',  
    description: ''  
  };

  // ? The object returned from useForm Hook
  const methods = useForm<IDenom>({
    resolver: zodResolver(denomFormSchema),
    defaultValues,
  });

  // ? Submit Handler
  const onSubmitHandler: SubmitHandler<IDenom> = async (values: IDenom) => {
    if(account?.address){
      const denom: IssueMessage = {
        id: values.denomId,
        name: values.name,
        symbol: values.symbol,
        from: account.address,
        schema: values.description ?? '',
        chainId: import.meta.env.VITE_APP_CHAIN_ID,
        sender: account.address
      } 
      let successReturnsDenom = await createDenom(denom);
      setDenom(successReturnsDenom);
    }  
    else { 
      setIsCreatingCollectionFailed(true);
      throw new Error("Please Connect your Keplr Wallet");
  }
    
  };

  return (
    <Container
      maxWidth={false}
      sx={{ height: '100%', backgroundColor: { xs: '#fff', md: '#f4f4f4' } }}    >
          <FormProvider {...methods}>
            {/* <Grid
              container
              sx={{
                boxShadow: { sm: '0 0 5px #ddd' },
                py: '6rem',
                px: '1rem',
              }}
            > */}
              <Box
                    display='flex'
                    flexDirection='column'
                    component='form'
                    noValidate
                    autoComplete='off'
                    sx={{ py: '6rem',
                        px: '1rem',
                        width: '50vw'

                    }}
                    onSubmit={(e) => {
                        methods.handleSubmit(onSubmitHandler)(e)
                        .catch((error:any) => {
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
                      Create Asset Collection 
                    </Typography>

                    <FormInput
                      label='DenomId'
                      type='text'                      
                      name='denomId'
                      focused
                      required
                    />
                    <FormInput
                      label='Name'
                      type='text'                      
                      name='name'
                      focused
                      required
                    />
                    <FormInput
                      type='text'
                      label='Symbol'
                      name='symbol'
                      required
                      focused
                    />

                    <FormInput
                      type='text'
                      label='Description'
                      name='description'                      
                      focused
                    />

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
                      Creating Collection
                    </LoadingButton>
                  </Box>            
            {/* </Grid> */}
          </FormProvider>
    </Container>
  )
}


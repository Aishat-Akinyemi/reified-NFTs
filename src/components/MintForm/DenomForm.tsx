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
import { Denom } from '../../types/nft';
  
// ? Styled React Route Dom Link Component
export const LinkItem = styled(Link)`
  text-decoration: none;
  color: #3683dc;
  &:hover {
    text-decoration: underline;
    color: #5ea1b6;
  }
`;

// ? Styled Material UI Link Component
export const OauthMuiLink = styled(MuiLink)`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5f6f7;
  border-radius: 1;
  padding: 0.6rem 0;
  column-gap: 1rem;
  text-decoration: none;
  color: #393e45;
  font-weight: 500;
  cursor: pointer;

  &:hover {
    background-color: #fff;
    box-shadow: 0 1px 13px 0 rgb(0 0 0 / 15%);
  }
`;

// ? Login Schema with Zod
const denomFormSchema = object({
    name: string()
        .min(4, 'Name is required')
        .max(20, 'Name should not be more than 20 character'),
    symbol: string()
        .min(3, 'Symbol must be at least 3 characters.')
        .max(4, 'Symbol cannot be more than 4 characters.')
        .refine((val)=> {
            return true;
        }, { message: 'Symbol already in use'}),
        
    description: string().optional(),
  });
  
// ? Infer the Schema to get the TS Type
type IDenom = TypeOf<typeof denomFormSchema>;


export const DenomForm = () => {
    // ? Default Values
  const defaultValues: IDenom = {
    name: '',
    symbol: '',    
  };

  // ? The object returned from useForm Hook
  const methods = useForm<IDenom>({
    resolver: zodResolver(denomFormSchema),
    defaultValues,
  });

  // ? Submit Handler
  const onSubmitHandler: SubmitHandler<IDenom> = (values: IDenom) => {
    const denom: Denom = {
        creator: '1111',
        
        ...values
    }
    console.log('success');
    
  };

  return (
    <Container
      maxWidth={false}
      sx={{ height: '100%', backgroundColor: { xs: '#fff', md: '#f4f4f4' }, width: '40em' }}    >
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
                        .catch((error) => {
                            alert(error);
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

                    {/* <FormControlLabel
                      control={
                        <Checkbox
                          size='small'
                          aria-label='trust this device checkbox'
                          required
                          {...methods.register('persistUser')}
                        />
                      }
                      label={
                        <Typography
                          variant='body2'
                          sx={{
                            fontSize: '0.8rem',
                            fontWeight: 400,
                            color: '#5e5b5d',
                          }}
                        >
                          Trust this device
                        </Typography>
                      }
                    /> */}

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


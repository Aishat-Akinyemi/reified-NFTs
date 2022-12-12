import React, {useState} from "react";
import {
  StepLabel,
  Button,
  Box,
  Stepper,
  Step, StepContent
} from "@mui/material";
import Typography from "@mui/material/Typography";
import reified from "../../assets/reified.png";
import { DenomForm, DenomFormProps } from "./DenomForm";
import { NftForm, NftFormProps } from "./NftForm";

const steps = ["Create Collection", "Mint NFT for an Asset"];
type labelProps = {
  optional?: React.ReactNode;
  error?: boolean;
};

type MintProps = {

} & DenomFormProps & NftFormProps;

export const Mint = ({account, createDenom, mintNft}: MintProps) => {
  const [activeStep, setActiveStep] = useState(0);
  const [denomId, setDenomId] = useState<string | undefined>('denom456');
  // const [nftDenom, setNft] = useState<string | undefined>();
  const [isCreatingCollectionFailed, setIsCreatingCollectionFailed] = useState(false);  
  const [isMintingNFTFailed, setIsMintingNFTFailed] = useState(false);  

  const isStepFailed = (step: number) => {
    return step === 1;
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  //setActiveStep((prevActiveStep) => prevActiveStep + 1);
  //mint another nft, activeset is -1
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  const l1: labelProps = {
    optional: <Typography variant="caption">Optional</Typography>,
    error: false
  };
  const l2: labelProps = {
    optional: <Typography variant="caption">Error message</Typography>,
    error: true
  };
  return (
    <Box sx={{padding: '2em'}} >
       <Box  sx={{backgroundColor:'background.default', padding: '2em'}}>
        <Box sx={{padding: '2em'}}>
              <Typography variant="h6" color="text.secondary">Mint NFTs to represent your physical assets on the Cudos Blockchain</Typography>
            </Box>
          <Box>
            <Stepper activeStep={activeStep} orientation="vertical">
              <Step>
                <StepLabel {...l1}>                 
                </StepLabel>
                <StepContent>
                   <DenomForm createDenom={createDenom} account={account} setDenom={setDenomId} setIsCreatingCollectionFailed={setIsCreatingCollectionFailed}/>
                </StepContent>
              </Step>

              <Step>
                <StepLabel {...l2}>{steps[1]}</StepLabel>
                <StepContent>
                   <NftForm mintNft={mintNft} account={account} denomId={denomId} setIsMintingNFTFailed={setIsMintingNFTFailed}/>
                </StepContent>
              </Step>
            </Stepper>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography sx={{ mt: 2, mb: 1 }}>
                  All steps completed - you&apos;re finished
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                  <Box sx={{ flex: "1 1 auto" }} />
                  <Button onClick={handleReset}>Reset</Button>
                </Box>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
                <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                  <Button
                    color="inherit"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{ mr: 1 }}
                  >
                    Back
                  </Button>
                  <Box sx={{ flex: "1 1 auto" }} />
                  {/* {isStepOptional(activeStep) && (
                    <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                      Skip
                    </Button>
                  )} */}
                  <Button onClick={handleNext}>
                    {activeStep === steps.length - 1 ? "Finish" : "Next"}
                  </Button>
                </Box>
              </React.Fragment>
            )}
          </Box>
       </Box>
    </Box>
  );
}

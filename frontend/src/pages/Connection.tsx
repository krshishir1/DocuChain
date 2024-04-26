import { Typography, Box, Button } from "@mui/material";

import { useWeb3Modal, useWalletInfo } from "@web3modal/wagmi/react";
import { useNavigate } from "react-router-dom";

import { useAccount } from "wagmi";

const Connection = () => {
  const { open, close } = useWeb3Modal();
  const { walletInfo } = useWalletInfo();

  const navigate = useNavigate();

  const handleConnect = async () => {
    await open();
  };

  return (
    <div className="flex min-h-screen">
      <div className="flex-1 bg-black pt-56">
        <div className="md:w-3/5 mx-auto flex flex-col gap-16">
          <Typography
            variant="h3"
            sx={{ fontWeight: "bold" }}
            className="text-white text-center uppercase"
          >
            Streamline{" "}
            <b className="text-primary">Your Education Verification</b> with Our
            Blockchain-Powered Solution
          </Typography>
          <Typography variant="h5" className="text-white text-center">
            Say goodbye to the hassle of manual document verification and
            embrace a seamless, blockchain-powered solution that connects
            students with institutes for instant verification of documents.
          </Typography>

          {!walletInfo && (
            <div className="flex justify-center gap-8">
              <button
                onClick={handleConnect}
                className="bg-primary text-white font-bold px-6 py-3 text-xl uppercase rounded-lg hover:scale-110"
              >
                Get Started
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Connection;

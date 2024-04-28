import { Typography, Box, Button } from "@mui/material";

import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAccount } from "wagmi";

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { setAddress } from '../store/accountSlice';

import { useChainId, useSwitchChain } from "wagmi";


const Connection = () => {
  const { open, close } = useWeb3Modal();

  const chainId = useChainId();
  const { chains, switchChain } = useSwitchChain()

  const {address, isConnected} = useAccount();
  const [accountType, setType] = useState<string | null>(null);

  const navigate = useNavigate();

  const userAccount = useSelector((state:RootState) => state.account)
  const dispatch = useDispatch();

  useEffect(() => {

    if(accountType && address) {
      console.log("running from connection")
      // switchChain({chainId: 11155111}) // 11155111 or 134
      dispatch(setAddress({address, type: accountType}))
      localStorage.setItem("accountType", accountType);
    }

  }, [address])

  const handleConnect = async (aType : string) => {
    setType(aType);
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

          {
            <h2 className="text-2xl text-white">Chain ID: {chainId}</h2>
          }

          {true && (
            <div className="flex justify-center gap-8">
              <button
                onClick={() => handleConnect("student")}
                className="bg-primary text-white font-bold px-6 py-3 text-xl uppercase rounded-lg hover:scale-110"
              >
                Get Started
              </button>
              <button
                onClick={() => handleConnect("verifier")}
                className="bg-primary text-white font-bold px-6 py-3 text-xl uppercase rounded-lg hover:scale-110"
              >
                Connect as Institute
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Connection;

import { Typography } from "@mui/material";
import { useEffect, useState } from "react";

import { pinFileToIPFS } from "../utils/ipfsController";

import { instituteTypesList } from "../config/instituteType";
import { contractAbi, contractAddress } from "../config/contract";

import { type BaseError, useWriteContract, useTransactionReceipt, useAccount } from "wagmi";

import { useDispatch } from "react-redux";
import { setVerifier, setAvailability } from "../store/verifierSlice";

const validFiles = ["image/png", "image/jpeg", "image/jpg"];

const RegisterInstitute = () => {
  const [instituteName, setInstituteName] = useState("");
  const [email, setEmail] = useState("");
  const [instituteType, setInstituteType] = useState("school");
  const [location, setLocation] = useState("");
  const [ipfsHash, setIpfsHash] = useState("")

  const [logoFile, setLogoFile] = useState(null);

  const {address} = useAccount();
  const {writeContract, isPending, error, data : hash} = useWriteContract()

  const {data: txDetails, isSuccess: transactionCompleted} = useTransactionReceipt({
    hash
  })

  const dispatch = useDispatch()

  const handleFileChange = function (e: any) {
    const file = e.target.files[0];

    if (!validFiles.includes(file.type)) {
      alert("Wrong image file format");
      setLogoFile(null);
    } else {
      setLogoFile(file);
    }
  };

  const handleSubmit = async function (e: any) {
    e.preventDefault();

    const cid = await pinFileToIPFS(logoFile);

    if(!cid) {
      setIpfsHash("")
      return alert("Error in uploading image to IPFS");
    }

    setIpfsHash(cid)
    writeContract({
      abi: contractAbi,
      address: contractAddress,
      functionName: "addVerifierDetails",
      args: [instituteName, email, instituteType, location, cid],
      account: address
    })

  };

  useEffect(() => {

    if(txDetails) {
      console.log(txDetails)

      dispatch(setAvailability(true))
      dispatch(setVerifier({instituteName, email, instituteType, location, cid: ipfsHash}))
    }

  }, [transactionCompleted])

  return (
    <div className="pt-36">
      <form
        className="md:w-1/2 mx-auto flex flex-col gap-4 bg-gray-100 py-12 px-10 rounded-xl"
        style={{ minHeight: "450px" }}
      >
        <Typography
          variant="h4"
          sx={{ fontWeight: "bold" }}
          className="text-center"
        >
          Register As Institute
        </Typography>

        <div>
          {error && <p className="text-red-500">{(error as BaseError).shortMessage}</p>}
          {ipfsHash}
        </div>

        <div className="flex flex-col gap-2">
          <label>Enter Name Of Institute: </label>
          <input
            type="text"
            // placeholder=""
            value={instituteName}
            onChange={(e) => setInstituteName(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg"
          />
        </div>

        <div className="flex gap-4 justify-between">
          <div className="basis-1/2 flex flex-col gap-2">
            <label>Institute Type</label>
            <select
              value={instituteType}
              onChange={(e) => setInstituteType(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg bg-white"
            >
              {instituteTypesList.map((type) => (
                <option value={type.value}>{type.detail}</option>
              ))}
            </select>
          </div>
          <div className="flex flex-1 flex-col gap-2">
            <label>Enter Contact Address </label>
            <input
              type="email"
              placeholder="about@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label>Address: </label>
          <textarea
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg"
          ></textarea>
        </div>

        <div className="flex flex-col gap-2">
          <label>Institute Logo</label>
          <input type="file" onChange={handleFileChange} />
        </div>

        <div className="flex justify-center">
          <button
            onClick={handleSubmit}
            className="bg-primary px-8 py-2 rounded text-lg font-bold"
          >
            {isPending ? "Loading..." : "Register"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterInstitute;

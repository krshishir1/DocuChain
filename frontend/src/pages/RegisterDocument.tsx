import { useEffect, useState } from "react";
import { Autocomplete, TextField, Typography } from "@mui/material";

import { documentTypesList } from "../config/documentType";
import { pinFileToIPFS } from "../utils/ipfsController";

import {
  useAccount,
  useReadContract,
  useWriteContract,
  useTransactionReceipt,
} from "wagmi";
import { contractAbi, contractAddress } from "../config/contract";

const RegisterDocument = () => {
  const [documentName, setDocumentName] = useState("");
  const [purpose, setPurpose] = useState("");
  const [documentType, setDocumentType] = useState("degree");
  const [verifierList, setVerifierList] = useState<any>(null);
  const [documentFile, setDocumentFile] = useState(null);

  const [verifierAddress, setVerifierAddress] = useState("");

  const { address } = useAccount();

  const { data: verifiers } = useReadContract({
    abi: contractAbi,
    address: contractAddress,
    functionName: "getAllVerifiers",
    account: address,
  });

  const { writeContract, isPending, error, data: hash } = useWriteContract();
  const { data: txDetails, isSuccess: transactionComplete } =
    useTransactionReceipt({ hash });

  useEffect(() => {
    if (Array.isArray(verifiers)) {
      const arr = [];
      verifiers.forEach((el) => {
        const { verifierAddress, name } = el;
        arr.push({ verifierAddress, label: name });
      });
      setVerifierList(arr);
    }
  }, [verifiers]);

  useEffect(() => {
    if (txDetails) {
      console.log("txDetails", txDetails);
      alert("Document Registered Successfully");
    }
  }, [transactionComplete]);

  const handleVerifierChange = (e, value) => {
    setVerifierAddress(value.verifierAddress);
  };

  const handleFileChange = async function (e: any) {
    const file = e.target.files[0];
    setDocumentFile(file);

    // if(file.type !== "application/pdf") {
    //   setDocumentFile(null)
    //   return alert("Wrong file format")
    // } else {
    //   setDocumentFile(file)
    // }
  };

  const handleSubmit = async function (e: any) {
    e.preventDefault();

    const cid = await pinFileToIPFS(documentFile);

    if (!cid) {
      return alert("Error in uploading document to IPFS");
    }

    writeContract({
      abi: contractAbi,
      address: contractAddress,
      functionName: "addDocumentDetails",
      args: [cid, documentName, documentType, purpose, verifierAddress, address],
      account: address,
    });
  };

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
          Document Verification Details
        </Typography>

        <div>
          {error && (
            <p className="text-red-500">{(error as BaseError).shortMessage}</p>
          )}
        </div>

        <div className="flex flex-wrap gap-4 mt-4">
          <div className="flex basis-1/2 flex-col gap-2">
            <label>Name: </label>
            <input
              type="text"
              placeholder="Enter Name"
              value={documentName}
              onChange={(e) => setDocumentName(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div className="flex flex-1 flex-col gap-2">
            <label>Document Type</label>
            <select
              value={documentType}
              onChange={(e) => setDocumentType(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg bg-white"
            >
              {documentTypesList.map((type) => (
                <option value={type.value}>{type.detail}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label>Select University For Verification</label>

          <Autocomplete
            id="verifier"
            options={verifierList}
            className="bg-white"
            renderInput={(params) => {
              return <TextField {...params} label="Select University" />;
            }}
            onChange={handleVerifierChange}
          />
        </div>
        <div className="flex flex-1 flex-col gap-2">
          <label>Purpose of Verification: </label>
          <textarea
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg"
          ></textarea>
        </div>
        <div className="flex flex-col gap-2">
          <label>Upload Document</label>
          <input type="file" onChange={handleFileChange} />
        </div>

        <div className="flex gap-4 mt-8">
          <button
            onClick={handleSubmit}
            className="bg-primary px-4 py-2 rounded"
          >
            Register Document
          </button>
          <button className="text-black underline">Save As Draft</button>
        </div>
      </form>
    </div>
  );
};

export default RegisterDocument;

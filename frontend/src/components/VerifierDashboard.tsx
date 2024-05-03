import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import DisplayVerifier from "./DisplayVerifier";
import DisplayVerifierDocuments from "./DisplayVerifierDocuments";

import { contractAbi, contractAddress } from "../config/contract";
import ImageFolder from "../assets/Image-folder.jpg";

import { useDispatch } from "react-redux";
import { setVerifier, setAvailability } from "../store/verifierSlice";

import {
  type BaseError,
  useAccount,
  useReadContract,
  useWriteContract,
  useTransactionReceipt,
} from "wagmi";

const VerifierDashboard = () => {
  const { address } = useAccount();
  const dispatch = useDispatch();

  const [displayAccount, setDisplayAccount] = useState(false);

  const { data: isVerifier, refetch: fetchVerifierStatus } = useReadContract({
    abi: contractAbi,
    address: contractAddress,
    functionName: "isVerifierExists",
    account: address,
    args: [address],
  });

  const { data: verifier, refetch: fetchVerifier } = useReadContract({
    abi: contractAbi,
    address: contractAddress,
    functionName: "getVerifierDetails",
    account: address,
    args: [address],
  });

  const { data: availableDocuments, refetch: getAvailableDocuments } =
    useReadContract({
      abi: contractAbi,
      address: contractAddress,
      functionName: "getDocumentsForVerifier",
      account: address,
    });

  const { writeContract, isPending, data: hash, error } = useWriteContract();

  const { data: txDetails, isSuccess: transactionCompleted } =
    useTransactionReceipt({ hash });

  if (error) alert((error as BaseError).shortMessage);

  const handleDelete = async function () {
    writeContract({
      abi: contractAbi,
      address: contractAddress,
      functionName: "deleteVerifier",
      account: address,
    });
  };

  useEffect(() => {
    if (txDetails) {
      console.log("verifier", txDetails);

      fetchVerifierStatus();
      fetchVerifier();
      getAvailableDocuments();
    }
  }, [transactionCompleted]);

  useEffect(() => {
    if (verifier) {
      console.log("Changing Redux store with veifier details");
      dispatch(setAvailability(isVerifier));

      if (isVerifier) {
        dispatch(setVerifier(verifier));
      } else {
        dispatch(setVerifier(null));
      }
    }
  }, [verifier]);

  return (
    <>
      <div className="flex justify-between">
        <h1 className="text-4xl font-bold">Verifier Dashboard</h1>

        {(!isVerifier as boolean) && (
          <Link
            to="/app/institute"
            className="font-bold text-primary bg-black px-6 py-2"
          >
            Register Institute
          </Link>
        )}

        {(isVerifier as boolean) && verifier && (
          <div>
            <button
              onClick={() => setDisplayAccount((val) => !val)}
              className="bg-black text-primary font-bold px-6 py-2 mb-5"
            >
              {displayAccount ? "Hide Account" : "Display Account"}
            </button>
          </div>
        )}
      </div>

      {isVerifier && verifier && (
        <div className="mt-10">
          {displayAccount && (
            <DisplayVerifier
              pending={isPending}
              verifier={verifier}
              deleteVerifier={handleDelete}
            />
          )}
        </div>
      )}

      {Array.isArray(availableDocuments) &&
      isVerifier &&
      availableDocuments.length > 0 ? (
        <DisplayVerifierDocuments
          documents={availableDocuments}
          fetchDocument={getAvailableDocuments}
        />
      ) : (
        <div className="mt-20 bg-gray-300 rounded-xl p-10 flex flex-col justify-center items-center gap-6">
          <img src={ImageFolder} alt="Not Found" className="w-2/5 rounded" />
          <h2 className="text-xl font-bold text-gray-800">
            No Documents Available For Verification
          </h2>
        </div>
      )}
    </>
  );
};

export default VerifierDashboard;

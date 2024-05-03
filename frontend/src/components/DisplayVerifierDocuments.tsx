import { useEffect, useState } from "react";

import {
  useWriteContract,
  useTransactionReceipt,
  useAccount,
  useReadContract,
  type BaseError,
} from "wagmi";
import { contractAbi, contractAddress } from "../config/contract";

const DisplaySingleDocument: React.FC<any> = ({
  document,
  unselect,
  changeStatus,
}) => {
  const { purpose, docName, docType, cid, studentAddress } = document;

  const fileUrl = `https://${import.meta.env.VITE_GATEWAY_URL}/ipfs/${cid}`;

  const { data: student } = useReadContract({
    abi: contractAbi,
    address: contractAddress,
    functionName: "getStudentDetails",
    account: studentAddress,
  });

  return (
    <>
      <h2 className="underline text-lg" onClick={() => unselect(null)}>
        Back
      </h2>

      <div className="px-8 mt-10 mb-24">
        <div className="flex justify-center">
          {fileUrl && (
            <object
              data={fileUrl}
              type="application/pdf"
              className="w-full"
              height="600"
            >
              <p>
                Your browser does not support PDFs.{" "}
                <a href={fileUrl}>Download the PDF</a>.
              </p>
            </object>
          )}
        </div>

        <div className="mt-10 flex items-center flex-col">
          <h2 className="text-3xl font-bold">{docName}</h2>
          <h2 className="text-base">({docType?.toUpperCase()})</h2>

          <div className="bg-gray-100/50 border-2 w-3/5 p-4 mt-5 flex flex-col gap-4">
            <h2 className="text-lg font-bold">Student Details</h2>
            <h3 className="text-lg text-gray-700">
              Name: <b>{student?.fullName}</b>
            </h3>
            <h3 className="text-lg text-gray-700">
              Email: <b>{student?.email}</b>
            </h3>
          </div>

          <div className="mt-5 bg-gray-300/50 p-5 w-3/5 rounded flex flex-col gap-2">
            <h2 className="text-lg font-bold">Purpose of verification</h2>
            <p>{purpose}</p>
          </div>

          <div className="flex gap-4 justify-between mt-4">
            <button
              onClick={() => changeStatus(1, cid)}
              className="bg-blue-500 text-white font-bold px-4 py-2 rounded"
            >
              Accept
            </button>
            <button
              onClick={() => changeStatus(2, cid)}
              className="bg-red-700 text-white font-bold px-4 py-2 rounded"
            >
              Reject
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

const DisplayVerifierDocuments: React.FC<any> = ({
  documents,
  fetchDocument,
}) => {
  const [selectedDoc, setSelectedDoc] = useState<any>(null);

  const { address } = useAccount();
  const { writeContract, data: hash, isPending, error } = useWriteContract();
  const { data: txDetails, isSuccess: transactionCompleted } =
    useTransactionReceipt({ hash });

  const handleDocumentStatus = async function (status: number, cid: string) {
    writeContract({
      abi: contractAbi,
      address: contractAddress,
      functionName: "verifyDocument",
      args: [cid, status],
      account: address,
    });
  };

  useEffect(() => {
    if (txDetails) {
      console.log("document verification", txDetails);
      setSelectedDoc(null);
      fetchDocument();
    }
  }, [transactionCompleted]);

  return (
    <>
      <h1 className="text-2xl font-bold mt-10 mb-5">
        Available Documents For Verfication
      </h1>

      {error && <p>{(error as BaseError).shortMessage}</p>}

      {selectedDoc ? (
        <DisplaySingleDocument
          document={selectedDoc}
          unselect={setSelectedDoc}
          changeStatus={handleDocumentStatus}
        />
      ) : (
        <div className="flex flex-col">
          {documents.map((doc: any, index) => {
            const { docName, docType, status } = doc;

            return (
              <div
                key={`doc-${index}`}
                onClick={() => setSelectedDoc(doc)}
                className="bg-white px-8 py-4 border-2 mb-4 rounded-xl select-none cursor-pointer"
              >
                <div className="flex justify-between gap-4">
                  <h2>{index + 1}</h2>
                  <h2>{docName}</h2>
                  <h2>{docType}</h2>
                  <div>
                    <p>{status === 0 && "Pending"}</p>
                    <p>{status === 1 && "Accepted"}</p>
                    <p>{status === 2 && "Rejected"}</p>
                  </div>

                  {/* <div>
                    <select
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                    >
                      <option value="accept">Accept</option>
                      <option value="reject">Reject</option>
                    </select>
                  </div> */}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default DisplayVerifierDocuments;

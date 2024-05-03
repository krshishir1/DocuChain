import { useReadContract, useAccount } from "wagmi";
import { contractAbi, contractAddress } from "../config/contract";

const DisplayStudentDocuments: React.FC<any> = ({ documents, deleteFunc }) => {
  return (
    <div className="mt-10">
      <h2 className="text-3xl text-gray-800 font-bold mb-5">Available Documents</h2>
      <div className="flex flex-col">
        <div className="bg-white px-8 py-4 mb-2 border-2 select-none text-left">
          <div className="flex gap-8">
            <h2 className="font-bold">S.No.</h2>
            <h2 className="flex-1 font-bold">Document Name</h2>
            <h2 className="flex-1 font-bold">Document Type</h2>
            <div className="flex-1 font-bold">
              <p>Status</p>
            </div>

            <div className="font-bold">Operations</div>
          </div>
        </div>

        {documents.map((doc: any, index) => {
          const { docName, docType, status, cid } = doc;

          return (
            <div
              key={`doc-${index}`}
              className="bg-white px-8 py-4 border-2 mb-4 rounded-xl select-none cursor-pointer text-center"
            >
              <div className="flex gap-8">
                <h2 className="flex-none">{index + 1}</h2>
                <h2 className="flex-1">{docName}</h2>
                <h2 className="flex-1">{docType?.toUpperCase()}</h2>
                <div className="flex-1">
                  <p>{status === 0 && "Pending"}</p>
                  <p>{status === 1 && "Accepted"}</p>
                  <p>{status === 2 && "Rejected"}</p>
                </div>

                <div>
                  <button
                    className="text-red-700 underline"
                    onClick={() => deleteFunc(cid)}
                  >
                    Delete document
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DisplayStudentDocuments;

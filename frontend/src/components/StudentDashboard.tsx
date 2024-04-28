import { Link } from "react-router-dom";
import Onboarding from "./Onboarding";
import DisplayStudent from "./DisplayStudent";

// 11155111, 134

import { contractAbi, contractAddress } from "../config/contract";
import { IExecDataProtector } from "@iexec/dataprotector";

import {
  type BaseError,
  useReadContract,
  useWriteContract,
  useTransactionReceipt,
  useAccount,
  Connector,
} from "wagmi";
import { useEffect, useState } from "react";

import { useDispatch } from "react-redux";
import { setStudent, setAvailability } from "../store/studentSlice";

import { useChainId, useSwitchChain } from "wagmi";

const StudentDashboard = () => {
  const [verifierList, setVerifierList] = useState<any>(null);
  const [protectedAddress, setProtectedAddress] = useState<any>(null);
  const [studentData, setStudentData] = useState<any>(null);

  const { address } = useAccount();
  const { connector } = useAccount() as { connector: Connector };

  const chainId = useChainId();
  const { isSuccess: chainSwitched, switchChain } = useSwitchChain();

  const {
    data: isStudent,
    error: isStudentError,
    refetch: fetchStudentAvailable,
  } = useReadContract({
    abi: contractAbi,
    address: contractAddress,
    functionName: "isStudentExists",
    account: address,
  });

  const { data: student, refetch: getStudent } = useReadContract({
    abi: contractAbi,
    address: contractAddress,
    functionName: "getStudentDetails",
    account: address,
  });

  const { data: availableDocuments, refetch: getAvailableDocuments } =
    useReadContract({
      abi: contractAbi,
      address: contractAddress,
      functionName: "getDocumentsForStudent",
      account: address,
    });

  const { data: verifiers } = useReadContract({
    abi: contractAbi,
    address: contractAddress,
    functionName: "getAllVerifiers",
    account: address,
  });

  const {
    writeContract,
    status,
    isPending,
    error,
    data: hash,
  } = useWriteContract();

  const { data: txDetails, isSuccess: transactionCompleted } =
    useTransactionReceipt({
      hash: hash,
    });

  const dispatch = useDispatch();

  const handleSubmit = async function (studentData: any) {
    try {
      console.log("studentData", studentData);
    } catch (error: any) {
      console.log("error", error);
    }
  };

  const handleDelete = async function () {
    if (address) {
      writeContract({
        abi: contractAbi,
        address: contractAddress,
        functionName: "deleteStudentDetails",
        onError: (error) => console.log("error", error),
        onSuccess: () => console.log("success"),
        account: address,
      });
    }
  };

  useEffect(() => {
    async function fetchData() {
      if (chainId === 134 && address && connector) {
        console.log("fetching student data from protector");

        const provider = await connector?.getProvider();
        const dataProtector = new IExecDataProtector(provider);

        const response = await dataProtector.fetchProtectedData({
          owner: address,
          schema: {
            fullName: "string",
            email: "string",
          },
        });

        console.log("response", response);
      }
    }

    fetchData();
  }, [protectedAddress]);

  useEffect(() => {
    if (txDetails) {
      console.log("transaction", txDetails);
      fetchStudentAvailable();
      getStudent();
      getAvailableDocuments();
    }
  }, [transactionCompleted]);

  useEffect(() => {
    if (student) {
      console.log(
        "Changing Redux store with student details",
        isStudent,
        student
      );
      dispatch(setAvailability(isStudent));

      if (isStudent) {
        dispatch(setStudent(student));
      } else {
        dispatch(setStudent(null));
      }
    }
  }, [student]);

  useEffect(() => {
    const obj = {};
    if (Array.isArray(verifiers)) {
      verifiers.forEach((verifier: any) => {
        obj[verifier.verifierAddress] = verifier.name;
      });

      setVerifierList(obj);
    }
  }, [verifiers]);

  useEffect(() => {
    async function sendData() {
      if (studentData && chainId === 134) {
        if (address && connector) {
          console.log("sending data to protect", studentData);

          const provider = await connector.getProvider();
          const dataProtector = new IExecDataProtector(provider);

          const response = await dataProtector.protectData({
            data: studentData,
            name: "student-details",
          });

          if (!response) {
            throw new Error("Error in protecting data");
          }

          setProtectedAddress(response?.address);
          localStorage.setItem("protectedAddress", response?.address);

          switchChain({ chainId: 11155111 });
        }
      }

      if (studentData && chainId === 11155111) {
        const { fullName, email, gender } = studentData;
        writeContract({
          abi: contractAbi,
          address: contractAddress,
          functionName: "addStudentDetails",
          args: [fullName, email, gender],
          account: address,
        });
      }
    }

    sendData();
  }, [chainSwitched]);

  console.log(availableDocuments)

  return (
    <>
      <div className="flex w-full justify-between">
        <h1 className="text-2xl font-bold">Student Dashboard</h1>
        {(isStudent as Boolean) && (
          <Link
            className="font-bold text-primary bg-black px-6 py-3 rounded"
            to="/app/register"
          >
            Register Document
          </Link>
        )}
      </div>

      <div>
        <p>{status}</p>
        <p>Current chain: {chainId}</p>

        <div>
          <p>Available chains: </p>
          <div className="flex gap-2"></div>
        </div>

        {error && (
          <p className="text-red-500">{(error as BaseError).shortMessage}</p>
        )}
      </div>

      {(!isStudent as Boolean) && (
        <Onboarding
          register={handleSubmit}
          setStudent={setStudentData}
          switchNetwork={switchChain}
        />
      )}
      {(isStudent as Boolean) && student && (
        <DisplayStudent
          pending={isPending}
          student={student as any}
          deleteStudent={handleDelete}
        />
      )}

      {Array.isArray(availableDocuments) &&
        availableDocuments.length &&
        isStudent && (
          <div>
            <h1>Available Documents</h1>
            {availableDocuments.map((doc: any) => {
              return (
                <div key={doc.cid} className="flex justify-between">
                  <p>{doc.docName}</p>
                  <p>{doc.docType}</p>
                  {verifierList && <p>{verifierList[doc.verifierAddress]}</p>}
                  <button className="text-red-700 underline"
                    onClick={() => {
                      writeContract({
                        abi: contractAbi,
                        address: contractAddress,
                        functionName: "deleteDocument",
                        args: [doc.cid],
                        account: address,
                      });
                    }}
                  >
                    Delete document
                  </button>
                </div>
              );
            })}
          </div>
        )}
    </>
  );
};

export default StudentDashboard;

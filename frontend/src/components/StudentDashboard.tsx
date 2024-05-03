import { Link } from "react-router-dom";
import Onboarding from "./Onboarding";
import DisplayStudent from "./DisplayStudent";
import DisplayStudentDocuments from "./DisplayStudentDocuments";

import ImageFolder from "../assets/Image-folder.jpg";

// 11155111, 134

import { contractAbi, contractAddress } from "../config/contract";

import {
  type BaseError,
  useReadContract,
  useWriteContract,
  useTransactionReceipt,
  useAccount,
} from "wagmi";
import { useEffect, useState } from "react";

import { useDispatch } from "react-redux";
import { setStudent, setAvailability } from "../store/studentSlice";

const StudentDashboard = () => {
  const [verifierList, setVerifierList] = useState<any>(null);
  const [displayAccount, setDisplayAccount] = useState(false);

  const { address } = useAccount();

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
      const { fullName, email, gender } = studentData;
      writeContract({
        abi: contractAbi,
        address: contractAddress,
        functionName: "addStudentDetails",
        args: [fullName, email, gender],
        account: address,
      });
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

  const handleDeleteDocument = async function (cid: string) {
    writeContract({
      abi: contractAbi,
      address: contractAddress,
      functionName: "deleteDocument",
      args: [cid],
      account: address,
    });
  };

  useEffect(() => {
    console.log("hashing");
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

  return (
    <>
      <div className="flex flex-col gap-4">
        <h1 className="text-4xl font-bold">Student Dashboard</h1>
        <div className="flex justify-end">
          <div className="flex gap-2 items-center">
            {(isStudent as Boolean) && (
              <Link
                className="font-bold text-primary bg-black px-6 py-2"
                to="/app/register"
              >
                Register Document
              </Link>
            )}
            {(isStudent as Boolean) && student && (
              <div className="flex justify-right">
                <button
                  onClick={() => setDisplayAccount((val) => !val)}
                  className="bg-black text-primary font-bold px-4 py-2"
                >
                  {displayAccount ? "Hide Account" : "Display Account"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-10">
        {displayAccount && (
          <DisplayStudent
            pending={isPending}
            student={student as any}
            deleteStudent={handleDelete}
          />
        )}
      </div>

      <div className="my-4">
        {error && (
          <p className="text-red-500">{(error as BaseError).shortMessage}</p>
        )}
      </div>

      {(!isStudent as Boolean) && <Onboarding register={handleSubmit} />}

      {(isStudent as Boolean) && (
        <div>
          {Array.isArray(availableDocuments) &&
          availableDocuments.length > 0 ? (
            <DisplayStudentDocuments
              documents={availableDocuments}
              deleteFunc={handleDeleteDocument}
            />
          ) : (
            <div className="mt-20 bg-gray-300 rounded-xl p-10 flex flex-col justify-center items-center gap-6">
              <img
                src={ImageFolder}
                alt="Not Found"
                className="w-2/5 rounded"
              />
              <h2 className="text-xl font-bold text-gray-800">
                No Documents Available
              </h2>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default StudentDashboard;

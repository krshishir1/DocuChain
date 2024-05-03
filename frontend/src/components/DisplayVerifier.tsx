interface DisplayStudentProps {
  verifier: any;
  pending: boolean;
  deleteVerifier: () => void;
}

const DisplayVerifier: React.FC<DisplayStudentProps> = ({
  verifier,
  deleteVerifier,
  pending,
}) => {
  const { name, email, instituteType, location, logoCid } = verifier;
  return (
    <div className="w-3/5 mx-auto bg-gray-300/50 border-2 p-5">
      <h1 className="text-2xl font-bold mb-5">Account Details</h1>
      <div className="flex flex-col text-gray-600 text-lg gap-2">
        <h2>Name: <b>{name}</b> ({instituteType.toUpperCase()})</h2>
        <h3>Email: {email}</h3>
        <h5>Location: {location}</h5>
        {/* <p>{logoCid}</p> */}

        <div className="flex justify-end">
          <button
            onClick={deleteVerifier}
            className="bg-red-500 text-white px-4 py-1 rounded text-sm font-bold"
          >
            Delete Verifier
          </button>
        </div>
      </div>
    </div>
  );
};

export default DisplayVerifier;

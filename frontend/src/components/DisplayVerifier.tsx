interface DisplayStudentProps {
    verifier: any;
    pending: boolean;
    deleteVerifier: () => void;
}

const DisplayVerifier: React.FC<DisplayStudentProps> = ({verifier, deleteVerifier, pending}) => {
    const { name, email, instituteType, location, logoCid} = verifier
    return ( 
        <div className="mt-10">
            <h1 className="text-2xl font-bold mb-5">Account Details</h1>
            <div className="flex justify-between text-lg">
                <h2>{name}</h2>
                <h3>{email}</h3>
                <h4>{instituteType}</h4>
                <h5>{location}</h5>
                {/* <p>{logoCid}</p> */}

                <button onClick={deleteVerifier} className="bg-red-600 text-white px-4 py-2 rounded">
                    {pending ? "Loading" : "Delete"}
                </button>
            </div>
        </div>
     );
}
 
export default DisplayVerifier;
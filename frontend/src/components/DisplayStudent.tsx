interface DisplayStudentProps {
    student: any;
    pending: boolean;
    deleteStudent: () => void;
}

const DisplayStudent: React.FC<DisplayStudentProps> = ({student, deleteStudent, pending}) => {
    const {fullName, email, gender} = student
    return ( 
        <div className="mt-10">
            <h1 className="text-2xl font-bold mb-5">Account Details</h1>
            <div className="flex justify-between text-lg">
                <h2>{fullName}</h2>
                <h3>{email}</h3>
                <h4>{gender}</h4>

                <button onClick={deleteStudent} className="bg-red-600 text-white px-4 py-2 rounded">
                    {pending ? "Loading" : "Delete"}
                </button>
            </div>
        </div>
     );
}
 
export default DisplayStudent;
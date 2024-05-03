interface DisplayStudentProps {
  student: any;
  pending: boolean;
  deleteStudent: () => void;
}

const DisplayStudent: React.FC<DisplayStudentProps> = ({
  student,
  deleteStudent,
  pending,
}) => {
  const { fullName, email, gender } = student;
  return (
    <div className="w-3/5 mx-auto bg-gray-300/50 border-2 p-5">
      <h1 className="text-2xl font-bold mb-5">Account Details</h1>
      <div className="flex flex-col gap-4 text-lg">
        <h2>Name: {fullName}</h2>
        <h3>Email: {email}</h3>

        <button
          onClick={deleteStudent}
          className="bg-red-500 text-white px-4 py-2 rounded text-sm font-bold"
        >
          Delete Student Data
        </button>
      </div>
    </div>
  );
};

export default DisplayStudent;

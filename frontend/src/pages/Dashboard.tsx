import { Container, Typography, Box, Button } from "@mui/material";
import { useState } from "react";

import StudentDashboard from "../components/StudentDashboard";
import VerifierDashboard from "../components/VerifierDashboard";

import { useSelector } from "react-redux";
import { RootState } from "../store";

const Dashboard = () => {
  const userAccount = useSelector((state: RootState) => state.account);

  // const [modalOpen, setModal] = useState(false);

  // const handleClose = () => setModal(false);

  return (
    <div className="pt-36">
      <div
        className="md:w-3/5 mx-auto bg-gray-200/50 p-5 rounded-xl"
        style={{ minHeight: "450px" }}
      >
        <div>
          {userAccount.type === "student" && <StudentDashboard />}
          {userAccount.type === "verifier" && <VerifierDashboard />}
        </div>
      </div>
      {/* <Onboarding /> */}
    </div>
  );
};

export default Dashboard;

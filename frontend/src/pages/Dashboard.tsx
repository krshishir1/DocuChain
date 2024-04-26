import { Container, Typography, Box, Button } from "@mui/material";
import { useState } from "react";

import CreateSurveyBox from "../components/CreateSurveyBox";
import Onboarding from "../components/Onboarding";

const Dashboard = () => {

    const [modalOpen, setModal] = useState(false);

    const handleClose = () => setModal(false);

  return (
    <div className="pt-36">

      <div className="md:w-3/5 mx-auto">
        <div className="flex justify-end">
          <div className="">
            <button className="bg-slate-800 hover:bg-black text-primary font-bold text-xl px-6 py-3 rounded-xl">
              Register New Document
            </button>
          </div>
        </div>
      </div>
      {/* <Onboarding /> */}
    </div>
  );
};

export default Dashboard;

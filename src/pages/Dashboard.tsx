import { Container, Typography, Box, Button } from "@mui/material";
import { useState } from "react";

import CreateSurveyBox from "../components/CreateSurveyBox";

const Dashboard = () => {

    const [modalOpen, setModal] = useState(false);

    const handleClose = () => setModal(false);

  return (
    <div className="pt-36">
      <div className="md:w-3/5 mx-auto p-4 bg-gray-100 rounded-xl" style={{minHeight: "450px"}}>
        <Typography>
          
        </Typography>
      </div>
    </div>
  );
};

export default Dashboard;

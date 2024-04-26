import { Typography } from "@mui/material";
import { useState } from "react";

import { instituteTypesList } from "../config/instituteType";

const RegisterInstitute = () => {
  const [instituteName, setInstituteName] = useState("");
  const [email, setEmail] = useState("");
  const [instituteType, setInstituteType] = useState("school");
  const [address, setAddress] = useState("");

  return (
    <div className="pt-36">
      <form
        className="md:w-1/2 mx-auto flex flex-col gap-4 bg-gray-100 py-12 px-10 rounded-xl"
        style={{ minHeight: "450px" }}
      >
        <Typography
          variant="h4"
          sx={{ fontWeight: "bold" }}
          className="text-center"
        >
          Register As Institute
        </Typography>

        <div className="flex flex-col gap-2">
          <label>Enter Name Of Institute: </label>
          <input
            type="text"
            // placeholder=""
            value={instituteName}
            onChange={(e) => setInstituteName(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg"
          />
        </div>

        <div className="flex gap-4 justify-between">
          <div className="basis-1/2 flex flex-col gap-2">
            <label>Institute Type</label>
            <select
              value={instituteType}
              onChange={(e) => setInstituteType(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg bg-white"
            >
              {instituteTypesList.map((type) => (
                <option value={type.value}>{type.detail}</option>
              ))}
            </select>
          </div>
          <div className="flex flex-1 flex-col gap-2">
            <label>Enter Contact Address </label>
            <input
              type="email"
              placeholder="about@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label>Address: </label>
          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg"
          ></textarea>
        </div>

        <div className="flex flex-col gap-2">
          <label>Institute Logo</label>
          <input type="file" />
        </div>

        <div className="flex justify-center">
          <button className="bg-primary px-8 py-2 rounded text-lg font-bold">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterInstitute;

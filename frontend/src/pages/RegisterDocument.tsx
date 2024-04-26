import { useState } from "react";
import { Autocomplete, TextField, Typography } from "@mui/material";

import { documentTypesList } from "../config/documentType";

const RegisterDocument = () => {
  const [documentName, setDocumentName] = useState("");
  const [purpose, setPurpose] = useState("");
  const [university, setUniversity] = useState("");
  const [documentType, setDocumentType] = useState("degree");

  const universities = [
    { label: "Delhi University" },
    { label: "Mumbai University" },
    { label: "Bangalore University" },
  ];

  return (
    <div className="pt-36">
      <form
        className="md:w-1/2 mx-auto flex flex-col gap-4 bg-gray-100 py-12 px-10 rounded-xl"
        style={{ minHeight: "450px" }}
      >
        <Typography variant="h4" sx={{fontWeight: "bold"}} className="text-center">
          Document Verification Details
        </Typography>

        <div className="flex flex-wrap gap-4 mt-4">
          <div className="flex basis-1/2 flex-col gap-2">
            <label>Name: </label>
            <input
              type="text"
              placeholder="Enter Name"
              value={documentName}
              onChange={(e) => setDocumentName(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div className="flex flex-1 flex-col gap-2">
            <label>Document Type</label>
            <select
              value={documentType}
              onChange={(e) => setDocumentType(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg bg-white"
            >
              {documentTypesList.map((type) => (
                <option value={type.value}>{type.detail}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label>Select University For Verification</label>

          <Autocomplete
            id="university"
            options={universities}
            className="bg-white"
            renderInput={(params) => (
              <TextField {...params} label="University" />
            )}
            onChange={(e, value) => setUniversity(value?.label)}
          />
        </div>
        <div className="flex flex-1 flex-col gap-2">
          <label>Purpose of Verification: </label>
          <textarea
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg"
          ></textarea>
        </div>
        <div className="flex flex-col gap-2">
          <label>Upload Document</label>
          <input type="file" />
        </div>

        <div className="flex gap-4 mt-8">
          <button className="bg-primary px-4 py-2 rounded">
            Register Document
          </button>
          <button className="text-black underline">Save As Draft</button>
        </div>
      </form>
    </div>
  );
};

export default RegisterDocument;

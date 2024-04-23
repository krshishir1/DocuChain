import { Modal, Box, Typography, OutlinedInput, TextField, Button } from "@mui/material";

import Label from "./ui/Form/Label";

import { useState } from "react";

const style = {
  position: "absolute",
  top: "30%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 6,
  borderRadius: 2,
};

interface ModalProps {
  isOpen: boolean;
  close: () => void;
}

const CreateSurveyBox: React.FC<ModalProps> = ({ isOpen, close }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  return (
    <Modal open={isOpen} onClose={close}>
      <Box sx={style}>
        <Typography variant="h4">Create A New Survey</Typography>
        <form>
          <Label style={{ mt: 3, mb : 1 }}>Project Name:</Label>
          <OutlinedInput
            sx={{ width: "100%", px: 1, outline: 0, borderBottom: 0 }}
            type="text"
            value={name}
            placeholder="birthday detail"
          ></OutlinedInput>

          <Label style={{ mt: 3, mb: 1 }}>Desciption:</Label>
          <TextField
            sx={{ width: "100%" }}
            multiline
            // value={name}
            rows={2}
          ></TextField>

          <Button sx={{fontWeight: "bold", px: 2, my: 2}} color="success" variant="contained">
            Create New
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default CreateSurveyBox;

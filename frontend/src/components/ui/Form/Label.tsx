import { InputLabel } from "@mui/material";

const Label: React.FC<{ style ?: any, children: React.ReactNode }> = ({ style, children }) => {
  return (
    <InputLabel
      sx={{ fontSize: 18, color: "gray", fontWeight: "bold", ...style }}
    >
      {children}
    </InputLabel>
  );
};

export default Label;

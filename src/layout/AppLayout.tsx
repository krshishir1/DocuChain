import { Outlet } from "react-router-dom";
import { ThemeProvider } from "@mui/material";

import { createTheme } from "@mui/material/styles";
import Navbar from "../components/Navbar";

const AppLayout = () => {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#F46228",
        light: "#42a5f5",
        dark: "#000000",
      }
    }
  });

  return (
    <ThemeProvider theme={theme}>

      <Navbar />

      <main>
        <Outlet />
      </main>

    </ThemeProvider>
  );
};

export default AppLayout;

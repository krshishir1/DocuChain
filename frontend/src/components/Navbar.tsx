import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

import Account from "./Account";

const Navbar = () => {
  return (
    <nav className="bg-primary flex justify-between items-center md:px-24 py-4 rounded-b-md fixed w-full">
      <Link to="/">
        <Typography
          variant="h5"
          className="uppercase"
          sx={{ fontWeight: "bold" }}
        >
          DocuChain
        </Typography>
      </Link>

      <div className="flex justify-between items-center">
        <Link to="/app">
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold" }}
          >
            Dashboard
          </Typography>
        </Link>
        <div>
          <Account />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

import Account from "./Account";
import Features from '../pages/Features';

import { useAccount } from "wagmi";

const Navbar = () => {
  const { address } = useAccount();
  return (
    <nav className="bg-primary flex justify-between items-center md:px-24 py-4 rounded-b-md fixed w-full">
      <div className="flex gap-12 items-center">
        <Link to="/">
          <Typography
            variant="h4"
            className="uppercase"
            sx={{ fontWeight: "bold" }}
          >
            DocuChain
          </Typography>
        </Link>
        <Link to="/features">
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Features
          </Typography>
        </Link>
      </div>

      <div className="flex justify-between items-center">
        {address && (
          <Link to="/app">
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              Dashboard
            </Typography>
          </Link>
        )}
        <div>
          <Account />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

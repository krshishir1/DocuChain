import { Typography, Button, Popover } from "@mui/material";
import { useAccount, useDisconnect } from "wagmi";

import { useState } from "react";

import { useDispatch } from "react-redux";
import { setAddress } from "../store/accountSlice";

const Account = () => {
  const { address, isConnecting, isDisconnected } = useAccount();

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const { disconnect } = useDisconnect();
  const dispatch = useDispatch();

  async function handleDisconnect() {
    localStorage.removeItem("accountType");
    await disconnect();
    dispatch(setAddress({} as any));
  }

  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    setAnchorEl(e.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  let open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <button
        aria-describedby={id}
        className="text-black px-10 py-2 text-lg uppercase font-bold hover:underline"
        onClick={handleClick}
      >
        {!isConnecting ? "Account Information" : "Connecting..."}
      </button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <div className="bg-gray-100/25 p-5">
          <div className="flex flex-col gap-2">
            <Typography variant="h6">Account Address</Typography>
            <p className="text-sm">
              {isDisconnected ? "Account Disconnected" : address}
            </p>

            {address && (
              <button
                onClick={handleDisconnect}
                className="font-bold text-red-500 text-right"
              >
                Disconnect
              </button>
            )}
          </div>
        </div>
      </Popover>
    </div>
  );
};

export default Account;

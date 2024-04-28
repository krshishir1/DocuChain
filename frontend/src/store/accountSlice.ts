import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AccountInterface {
  address: string | undefined;
  type?: string;
}

const initialState: AccountInterface = {
  address: undefined,
} as AccountInterface;

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setAddress: (state, action: PayloadAction<AccountInterface>) => {
      console.log("action.payload", action.payload);
      const { address, type } = action.payload;
      state.address = address;
      state.type = typeof type === "string" ? type : undefined;
    },
  },
});

export const { setAddress } = accountSlice.actions;
export default accountSlice.reducer;

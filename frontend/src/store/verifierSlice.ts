import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface VerifierInterface {
  available: boolean;
  details: any;
}

const initialState: VerifierInterface = {
  available: false,
} as VerifierInterface;

const verifierSlice = createSlice({
  name: "verifier",
  initialState,
  reducers: {
    setVerifier: (state, action) => {
      state.details = action.payload;
    },
    setAvailability: (state, action) => {
      state.available = action.payload;
    },
  },
});

export const { setVerifier, setAvailability } = verifierSlice.actions;
export default verifierSlice.reducer;

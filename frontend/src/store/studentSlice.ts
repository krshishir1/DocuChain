import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface StudentInterface {
  available: boolean;
  details: any;
}

const initialState: StudentInterface = {
  available: false,
} as StudentInterface;

const studentSlice = createSlice({
  name: "student",
  initialState,
  reducers: {
    setStudent: (state, action) => {
      state.details = action.payload;
    },
    setAvailability: (state, action) => {
      state.available = action.payload;
    },
  },
});

export const { setStudent, setAvailability } = studentSlice.actions;
export default studentSlice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CountInterface {
    value: number;
}

const initialState: CountInterface = {
    value: 12
}

const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increment: (state) => {
            state.value += 1;
        },
        incrementByAmount: (state, action: PayloadAction<number>) => {
            state.value += action.payload;
        }
    }
})

export const { increment, incrementByAmount } = counterSlice.actions;
export default counterSlice.reducer;
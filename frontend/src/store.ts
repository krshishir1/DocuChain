import {configureStore} from '@reduxjs/toolkit';
// import counterReducer from './store/countSlice';
import accountReducer from './store/accountSlice';
import studentReducer from './store/studentSlice';
import verifierReducer from './store/verifierSlice'



export const store = configureStore({
    reducer: {
        account: accountReducer,
        student: studentReducer,
        verifier: verifierReducer
    }
} )

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

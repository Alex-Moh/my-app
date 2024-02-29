import { configureStore } from "@reduxjs/toolkit";
import transactions from "./slices/transactionsSlice";

export const store = configureStore({
  reducer: { transactions },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

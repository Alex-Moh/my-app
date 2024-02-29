import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Transaction } from "../../../types/types";
import initialTransactions from "../../data/transactions.json";

interface ConfigsState {
  transactions: Transaction[];
}

const initialState: ConfigsState = {
  transactions: initialTransactions as Transaction[],
};

const slice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    setTransactions(
      state,
      action: PayloadAction<ConfigsState["transactions"]>
    ) {
      state.transactions = action.payload;
    },
    // Adding a new reducer for deleting a transaction
    deleteTransaction(state, action: PayloadAction<number>) { // Payload is the transactionId to delete
      state.transactions = state.transactions.filter(transaction => transaction.transactionId !== action.payload);
    },
  },
});

export const { setTransactions, deleteTransaction } = slice.actions;
export default slice.reducer;

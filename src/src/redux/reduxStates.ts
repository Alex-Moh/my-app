import { useAppSelector } from "./reduxHooks";

export const useTransactionsStates = () =>
  useAppSelector((state) => state.transactions);

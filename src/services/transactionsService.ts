import type {
  MonthLyItem,
  Transaction,
  TransactionFilter,
  TransactionSummary,
} from "../types/transactions";
import { api } from "./api";

export const getTransactions = async (
  filter?: Partial<TransactionFilter>,
): Promise<Transaction[]> => {
  const response = await api.get<Transaction[]>("/transactions", { params: filter });
  return response.data;
};

export const getTransactionsSummary = async (
  month: number,
  year: number,
): Promise<TransactionSummary> => {
  const response = await api.get<TransactionSummary>("/transactions/summary", {
    params: { month, year },
  });
  return response.data;
};

export const getTransactionsMonthly = async (
  month: number,
  year: number,
  monthHist?: number,
): Promise<{ history: MonthLyItem[] }> => {
  const response = await api.get("/transactions/historical", {
    params: { year, month, monthHist },
  });
  return response.data;
};

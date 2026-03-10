import type {
  CreateTransactionDTO,
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
  try {
    const response = await api.get<TransactionSummary>("/transactions/summary", {
      params: { month, year },
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar resumo:", error);
    return { totalIncomes: 0, totalExpenses: 0, balance: 0, expensesByCategory: [] };
  }
};

export const getTransactionsMonthly = async (
  month: number,
  year: number,
  monthHist?: number,
): Promise<{ history: MonthLyItem[] }> => {
  try {
    const response = await api.get("/transactions/historical", {
      params: { year, month, monthHist },
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar histórico:", error);
    return { history: [] };
  }
};

export const deleteTransaction = async (id:string):Promise<void> => {
  await api.delete(`/transactions/${id}`);
}

export const createTransaction = async (transactionData: CreateTransactionDTO): Promise<Transaction> => {
  
  const response = await api.post<Transaction>("/transactions", transactionData )
  return (response.data)
}

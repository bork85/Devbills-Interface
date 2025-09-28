import type { Category, CategorySummary } from "./category";

export enum TransactionType {
  INCOME = "income",
  EXPENSE = "expense",
}
export interface Transaction {
  id: string;
  userId: string;
  description: string;
  amount: number;
  date: string | Date;
  categoryId: string;
  category: Category;
  type: TransactionType;
  updatedAt: string | Date;
  CreatedAt: string | Date;
}
export interface TransactionFilter {
  month: number;
  year: number;
  categoryId?: string;
  type?: TransactionType;
}
export interface TransactionSummary {
  totalIncomes: number;
  totalExpenses: number;
  balance: number;
  expensesByCategory: CategorySummary[];
}
export interface MonthLyItem {
  name: string;
  expense: number;
  income: number;
}
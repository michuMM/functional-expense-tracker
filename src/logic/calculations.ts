import { type Expense } from "../types/Expense";

export const totalAmount = (expenses: Expense[]): number =>
  expenses.reduce((sum, e) => sum + e.amount, 0);

export const averageDaily = (expenses: Expense[]): number => {
  const days = new Set(expenses.map(e => e.date)).size;
  return days === 0 ? 0 : totalAmount(expenses) / days;
};

export const groupByCategory = (expenses: Expense[]) =>
  expenses.reduce<Record<string, number>>((acc, e) => ({
    ...acc,
    [e.category]: (acc[e.category] ?? 0) + e.amount
  }), {});

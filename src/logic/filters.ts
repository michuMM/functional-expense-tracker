import { type Expense } from "../types/Expense";

export const filterByCategory =
  (category: string) =>
  (expenses: Expense[]) =>
    category === "ALL"
      ? expenses
      : expenses.filter(e => e.category === category);

export const filterByDateRange =
  (from?: string, to?: string) =>
  (expenses: Expense[]): Expense[] =>
    expenses.filter(e => {
      if (from && e.date < from) return false;
      if (to && e.date > to) return false;
      return true;
    });

export const composeFilters =
  (...filters: ((e: Expense[]) => Expense[])[]) =>
  (expenses: Expense[]) =>
    filters.reduce((acc, f) => f(acc), expenses);
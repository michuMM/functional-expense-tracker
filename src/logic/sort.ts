import { type Expense } from "../types/Expense";

export type SortField = "date" | "amount";
export type SortOrder = "asc" | "desc";

export const sortExpenses =
  (field: SortField, order: SortOrder) =>
  (expenses: Expense[]): Expense[] =>
    [...expenses].sort((a, b) => {
      const valueA = a[field];
      const valueB = b[field];

      if (valueA < valueB) return order === "asc" ? -1 : 1;
      if (valueA > valueB) return order === "asc" ? 1 : -1;
      return 0;
    });

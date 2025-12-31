import { useEffect, useReducer } from "react";
import { type Expense } from "../types/Expense";
import { expenseReducer } from "../logic/reducer";

const init = (): Expense[] =>
  JSON.parse(localStorage.getItem("expenses") || "[]");

export const useExpenses = () => {
  const [expenses, dispatch] = useReducer(expenseReducer, [], init);

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  const addExpense = (e: Expense) =>
    dispatch({ type: "ADD", payload: e });

  const removeExpense = (id: number) =>
    dispatch({ type: "REMOVE", payload: id });

  const updateExpense = (expense: Expense) =>
  dispatch({ type: "UPDATE", payload: expense });

  const clearExpenses = () => {
    localStorage.removeItem("expenses");
    dispatch({ type: "RESET" });
  };

  return { expenses, addExpense, removeExpense, updateExpense, clearExpenses };
};

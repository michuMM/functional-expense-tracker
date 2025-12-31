import { type Expense } from "../types/Expense";

type Action =
  | { type: "ADD"; payload: Expense }
  | { type: "REMOVE"; payload: number }
  | { type: "UPDATE"; payload: Expense }
  | { type: "RESET" };


export const expenseReducer = (
  state: Expense[],
  action: Action
): Expense[] => {
  switch (action.type) {
    case "ADD":
        return [...state, action.payload];
    case "REMOVE":
        return state.filter(e => e.id !== action.payload);
    case "RESET":
        return [];
    case "UPDATE":
        return state.map(e =>
            e.id === action.payload.id ? action.payload : e
        );
    default:
      return state;
  }
};

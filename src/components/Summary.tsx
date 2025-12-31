import { type Expense } from "../types/Expense";
import { totalAmount, averageDaily } from "../logic/calculations";

export const Summary = ({ expenses }: { expenses: Expense[] }) => (
  <div>
    <p>Suma: {totalAmount(expenses).toFixed(2)} zł</p>
    <p>Średnia dzienna: {averageDaily(expenses).toFixed(2)} zł</p>
  </div>
);

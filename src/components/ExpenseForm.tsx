import { useState } from "react";
import { type Expense } from "../types/Expense";

type Props = {
  onAdd: (e: Expense) => void;
};

type Errors = {
  amount?: string;
  date?: string;
  category?: string;
  description?: string;
};

export const ExpenseForm = ({ onAdd }: Props) => {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState<Errors>({});

  const validate = (): Errors => {
    const e: Errors = {};

    if (!amount) e.amount = "Wymagana";
    else if (Number(amount) <= 0) e.amount = "Musi być > 0";

    if (!date) e.date = "Wymagana";
    if (!category) e.category = "Wybierz";

    if (description.length > 100) e.description = "Max 100 znaków";

    return e;
  };

  const submit = (ev: React.FormEvent) => {
    ev.preventDefault();

    const v = validate();
    setErrors(v);
    if (Object.keys(v).length) return;

    onAdd({
      id: Date.now(),
      amount: Number(amount),
      category,
      date,
      description
    });

    setAmount("");
    setCategory("");
    setDate("");
    setDescription("");
    setErrors({});
  };

  return (
    <form
      onSubmit={submit}
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: "0.5rem",
        marginBottom: "0.5rem"
      }}
    >
      {/* Kwota */}
      <div>
        <input
          type="number"
          placeholder="Kwota"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          style={{ width: "90px" }}
        />
        {errors.amount && (
          <div style={{ fontSize: "0.7rem", color: "red" }}>
            {errors.amount}
          </div>
        )}
      </div>

      {/* Data */}
      <div>
        <input
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
        />
        {errors.date && (
          <div style={{ fontSize: "0.7rem", color: "red" }}>
            {errors.date}
          </div>
        )}
      </div>

      {/* Kategoria */}
      <div>
        <select value={category} onChange={e => setCategory(e.target.value)}>
            <option value="">Kategoria</option>
            <option value="Jedzenie">Jedzenie</option>
            <option value="Transport">Transport</option>
            <option value="Rozrywka">Rozrywka</option>
            <option value="Inne">Inne</option>
        </select>
        {errors.category && (
          <div style={{ fontSize: "0.7rem", color: "red" }}>
            {errors.category}
          </div>
        )}
      </div>

      {/* Opis */}
      <div>
        <input
          placeholder="Opis (opcjonalnie)"
          value={description}
          onChange={e => setDescription(e.target.value)}
          style={{ width: "120px" }}
        />
        {errors.description && (
          <div style={{ fontSize: "0.7rem", color: "red" }}>
            {errors.description}
          </div>
        )}
      </div>

      {/* Przycisk */}
      <button type="submit" style={{ height: "30px" }}>
        Dodaj
      </button>
    </form>
  );
};

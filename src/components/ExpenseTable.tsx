import { useState } from "react";
import { type Expense } from "../types/Expense";

type Props = {
  expenses: Expense[];
  onRemove: (id: number) => void;
  onUpdate: (e: Expense) => void;
};

export const ExpenseTable = ({ expenses, onRemove, onUpdate }: Props) => {
  const [editId, setEditId] = useState<number | null>(null);
  const [edited, setEdited] = useState<Expense | null>(null);

  if (expenses.length === 0) return null;

  const startEdit = (e: Expense) => {
    setEditId(e.id);
    setEdited(e);
  };

  const saveEdit = () => {
    if (edited) {
      onUpdate(edited);
      setEditId(null);
      setEdited(null);
    }
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Data</th>
          <th>Kategoria</th>
          <th>Kwota</th>
          <th>Opis</th>
          <th>Akcje</th>
        </tr>
      </thead>
      <tbody>
        {expenses.map(e => (
          <tr key={e.id}>
            <td>
              {editId === e.id ? (
                <input
                  type="date"
                  value={edited?.date}
                  onChange={ev =>
                    setEdited({ ...edited!, date: ev.target.value })
                  }
                />
              ) : (
                e.date
              )}
            </td>

            <td>
              {editId === e.id ? (
                <select
                  value={edited?.category}
                  onChange={ev =>
                    setEdited({ ...edited!, category: ev.target.value })
                  }
                >
                  <option>Jedzenie</option>
                  <option>Transport</option>
                  <option>Rozrywka</option>
                  <option>Inne</option>
                </select>
              ) : (
                e.category
              )}
            </td>

            <td>
              {editId === e.id ? (
                <input
                  type="number"
                  value={edited?.amount}
                  onChange={ev =>
                    setEdited({
                      ...edited!,
                      amount: Number(ev.target.value)
                    })
                  }
                  style={{ width: "80px" }}
                />
              ) : (
                `${e.amount.toFixed(2)} zł`
              )}
            </td>

            <td>
              {editId === e.id ? (
                <input
                  value={edited?.description}
                  onChange={ev =>
                    setEdited({
                      ...edited!,
                      description: ev.target.value
                    })
                  }
                />
              ) : (
                e.description
              )}
            </td>

            <td>
              {editId === e.id ? (
                <>
                  <button onClick={saveEdit}>Zapisz</button>
                  <button onClick={() => setEditId(null)}>Anuluj</button>
                </>
              ) : (
                <>
                  <button onClick={() => startEdit(e)}>Edytuj</button>
                  <button onClick={() => onRemove(e.id)}>Usuń</button>
                </>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

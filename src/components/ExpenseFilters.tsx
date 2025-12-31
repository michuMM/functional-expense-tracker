type Props = {
  category: string;
  from?: string;
  to?: string;
  error?: string;
  onCategoryChange: (c: string) => void;
  onFromChange: (d: string) => void;
  onToChange: (d: string) => void;
  onApply: () => void;
};

export const ExpenseFilters = ({
  category,
  from,
  to,
  error,
  onCategoryChange,
  onFromChange,
  onToChange,
  onApply
}: Props) => (
  <div style={{ margin: "0.5rem 0" }}>
    <select value={category} onChange={e => onCategoryChange(e.target.value)}>
        <option value="ALL">Wszystkie</option>
        <option value="Jedzenie">Jedzenie</option>
        <option value="Transport">Transport</option>
        <option value="Rozrywka">Rozrywka</option>
        <option value="Inne">Inne</option>
    </select>

    <input
      type="date"
      value={from}
      onChange={e => onFromChange(e.target.value)}
    />

    <input
      type="date"
      value={to}
      onChange={e => onToChange(e.target.value)}
    />

    <button onClick={onApply} style={{ marginLeft: "0.5rem" }}>
      Filtruj
    </button>

    {error && (
      <div style={{ fontSize: "0.75rem", color: "red" }}>
        {error}
      </div>
    )}
  </div>
);

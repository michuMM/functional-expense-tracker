import type { SortField, SortOrder } from "../logic/sort";

type Props = {
  field: SortField;
  order: SortOrder;
  onFieldChange: (f: SortField) => void;
  onOrderChange: (o: SortOrder) => void;
};

export const ExpenseSort = ({
  field,
  order,
  onFieldChange,
  onOrderChange
}: Props) => (
  <div>
    <select value={field} onChange={e => onFieldChange(e.target.value as SortField)}>
      <option value="date">Data</option>
      <option value="amount">Kwota</option>
    </select>

    <select value={order} onChange={e => onOrderChange(e.target.value as SortOrder)}>
      <option value="asc">Rosnąco</option>
      <option value="desc">Malejąco</option>
    </select>
  </div>
);

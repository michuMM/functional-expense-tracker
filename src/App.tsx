import { useState } from "react";
import { useExpenses } from "./hooks/useExpenses";
import { ExpenseForm } from "./components/ExpenseForm";
import { ExpenseTable } from "./components/ExpenseTable";
import { Summary } from "./components/Summary";
import { ExpenseChart } from "./components/ExpenseChart";
import { ExpenseFilters } from "./components/ExpenseFilters";
import { ExpenseSort } from "./components/ExpenseSort";
import { ChartSizeSlider } from "./components/ChartSizeSlider";


import {
  filterByCategory,
  filterByDateRange,
  composeFilters
} from "./logic/filters";

import { sortExpenses, type SortField, type SortOrder } from "./logic/sort";

function App() {
  const { expenses, addExpense, removeExpense, updateExpense, clearExpenses } = useExpenses();

  // rozmiar wykresu
  const [chartSize, setChartSize] = useState(300);

  // filtry
    const [categoryInput, setCategoryInput] = useState("ALL");
    const [fromInput, setFromInput] = useState<string | undefined>();
    const [toInput, setToInput] = useState<string | undefined>();

    const [category, setCategory] = useState("ALL");
    const [from, setFrom] = useState<string | undefined>();
    const [to, setTo] = useState<string | undefined>();

    const [filterError, setFilterError] = useState<string | undefined>();

    const applyFilters = () => {
    if (fromInput && toInput && fromInput > toInput) {
        setFilterError("Data „od” nie może być późniejsza niż „do”");
        return;
    }

    setFilterError(undefined);
    setCategory(categoryInput);
    setFrom(fromInput);
    setTo(toInput);
    };

  // sortowanie
  const [sortField, setSortField] = useState<SortField>("date");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");

  const processedExpenses = composeFilters(
    filterByCategory(category),
    filterByDateRange(from, to),
    sortExpenses(sortField, sortOrder)
  )(expenses);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Funkcyjny rejestr wydatków</h1>

      <ExpenseForm onAdd={addExpense} />
      <button
            onClick={() => {
                if (confirm("Czy na pewno chcesz usunąć wszystkie dane?")) {
                clearExpenses();
                }
            }}
            style={{
                margin: "0.5rem 0 1rem 0",
                backgroundColor: "#f44336",
                color: "white",
                border: "none",
                padding: "0.5rem 1rem",
                cursor: "pointer"
            }}
            >
            Wyczyść wszystkie dane
        </button>
      <ExpenseFilters
        category={categoryInput}
        from={fromInput}
        to={toInput}
        error={filterError}
        onCategoryChange={setCategoryInput}
        onFromChange={setFromInput}
        onToChange={setToInput}
        onApply={applyFilters}
       />

      <ExpenseSort
        field={sortField}
        order={sortOrder}
        onFieldChange={setSortField}
        onOrderChange={setSortOrder}
      />

      <Summary expenses={processedExpenses} />
      <ChartSizeSlider
        size={chartSize}
        onChange={setChartSize}
      />

        <ExpenseChart
        expenses={processedExpenses}
        size={chartSize}
        />
      {processedExpenses.length > 0 && (
        <ExpenseTable
            expenses={processedExpenses}
            onRemove={removeExpense}
            onUpdate={updateExpense}
        />
    )}

    </div>
  );
}

export default App;

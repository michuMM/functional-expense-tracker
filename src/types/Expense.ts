export type Expense = Readonly<{
    id: number;
    amount: number;
    category: string;
    date: string;
    description: string;
}>;
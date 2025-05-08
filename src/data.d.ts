interface IPots {
  name: string;
  target: number;
  total: number;
  theme: string;
}

interface IBudgets {
  category: string;
  maximum: number;
  theme: string;
}

interface ITransactions {
  avatar: string;
  name: string;
  category: string;
  date: string;
  amount: number;
  recurring: boolean;
}

interface IBalace {
  current: number;
  income: number;
  expenses: number;
}

export type TFinance = {
  balance: IBalace;
  transactions: ITransactions[];
  budgets: IBudgets[];
  pots: IPots[];
};

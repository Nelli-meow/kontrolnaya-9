export interface ITransaction {
  category: string,
  type: string,
  amount: number,
}

export interface ITransactions {
  id: string,
  category: string,
  type: string,
  amount: number,
}

export interface ITransactionAPI {
  [id: string]: ITransactions;
}
import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface TransactionDTO{
  title: string,
  value: Number,
  type: 'outcome' | 'income';
}
class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    const res = this.transactions.map(transaction => transaction)
    return res;
  }

  public getBalance(): Balance {
    const balance = this.transactions.reduce(
      (acc : Balance,atual: Transaction) => {
        if(atual.type == 'income'){
          acc.income += atual.value;
          acc.total += atual.value;
        }else{
          acc.outcome += atual.value;
          acc.total -= atual.value;
        }

        return acc;
      }, {
        income:0,
        outcome:0,
        total:0
      });

    return balance;
  }

  public create(transaction : Omit<Transaction, 'id'>): Transaction {
    const newTransaction = new Transaction(transaction)
    this.transactions.push(newTransaction);

    return newTransaction;
  }
}

export default TransactionsRepository;

import { EntityRepository, Repository } from 'typeorm';

import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
  public async getBalance(): Promise<Balance> {
    const transactions = await this.find();

    const balance = transactions.reduce(
      (acc: Balance, atual: Transaction) => {
        if (atual.type === 'income') {
          acc.income += Number(atual.value);
          acc.total += Number(atual.value);
        } else {
          acc.outcome += Number(atual.value);
          acc.total -= Number(atual.value);
        }

        return acc;
      },
      {
        income: 0,
        outcome: 0,
        total: 0,
      },
    );
    return balance;
  }
}

export default TransactionsRepository;
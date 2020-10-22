import React, { useState, useEffect } from 'react';

import income from '../../assets/income.svg';
import outcome from '../../assets/outcome.svg';
import total from '../../assets/total.svg';

import api from '../../services/api';

import Header from '../../components/Header';

import formatValue from '../../utils/formatValue';

import { Container, CardContainer, Card, TableContainer } from './styles';
import formatDate from '../../utils/formatDate';

interface Transaction {
  id: string;
  title: string;
  value: number;
  formattedValue: string;
  formattedDate: string;
  type: 'income' | 'outcome';
  category: { title: string };
  created_at: string;
}

interface Balance {
  income: string;
  outcome: string;
  total: string;
}

interface ResponseDTO{
  data:{
    transactions: Transaction[];
    balance: Balance;
  }
}

const Dashboard: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [balance, setBalance] = useState<Balance>({} as Balance);

  useEffect(() => {
    async function loadTransactions(): Promise<void> {
      api.get('/transactions').then((response: ResponseDTO) => {
        const {transactions, balance} = response.data;

        const formatedBalance = {
          income: formatValue(Number(balance.income)),
          outcome: formatValue(Number(balance.outcome)),
          total: formatValue(Number(balance.total)),
        } as Balance;

        setBalance(formatedBalance);
        setTransactions(transactions);
      });
    }

    loadTransactions();
  }, []);

  return (
    <>
      <Header />
        <Container>
        <CardContainer>
          <Card>
            <header>
              <p>Entradas</p>
              <img src={income} alt="Income" />
            </header>
            <h1 data-testid="balance-income">{balance.income}</h1>
          </Card>
          <Card>
            <header>
              <p>Saídas</p>
              <img src={outcome} alt="Outcome" />
            </header>
            <h1 data-testid="balance-outcome">{balance.outcome}</h1>
          </Card>
          <Card total>
            <header>
              <p>Total</p>
              <img src={total} alt="Total" />
            </header>
            <h1 data-testid="balance-total">{balance.total}</h1>
          </Card>
        </CardContainer>

        <TableContainer>
          <table>
            <thead>
              <tr>
                <th>Título</th>
                <th>Preço</th>
                <th>Categoria</th>
                <th>Data</th>
              </tr>
            </thead>

            <tbody>
              {transactions.map(trans => (
                <tr key={trans.id}>
                  <td className="title">{trans.title}</td>
                  <td className={trans.type}> { trans.type === 'outcome' && '- '} { formatValue(Number(trans.value)) } </td>
                  <td> { trans.category.title } </td>
              <td> { formatDate(trans.created_at) } </td>
                </tr>
              ))}
            </tbody>
          </table>
        </TableContainer>
      </Container>
    </>
  );
};

export default Dashboard;

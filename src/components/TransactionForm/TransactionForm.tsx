import { Link } from 'react-router-dom';
import './TransactionForm.css';
import { useState } from 'react';
import { ITransaction, ITransactionAPI } from '../../types';
import * as React from 'react';
import { useAppDispatch } from '../../app/hooks.ts';
import { addTransaction } from '../../store/slices/orderSlice.ts';
import { transactionThunk } from '../../store/thunks/dishesThunk.ts';

const initialForm = {
  type: '',
  category: '',
  amount: 1,
};


const TransactionForm = () => {
  const [transaction, setTransaction] = useState<ITransaction>({...initialForm});
  const dispatch = useAppDispatch();

  const onChangeField = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const {name, value} = e.target;
    setTransaction((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!transaction.type.trim() || !transaction.category.trim() || transaction.amount <= 0) {
      alert('Please fill out all fields correctly');
    } else {
      const newTransaction = {
        ...transaction,
        date: new Date().toISOString(),
      };

      dispatch(addTransaction(newTransaction));
      await dispatch(transactionThunk(newTransaction));
      setTransaction({...initialForm});
    }
  };


  return (
    <div className="modal-overlay">
      <div className="modal-content border border-2 rounded p-4">
        <h2>Add Expense/Income</h2>
        <hr/>
        <form onSubmit={onSubmitForm}>
          <div className="modal-wind">
            <label htmlFor="Type">Type</label>
            <select
              name="type"
              value={transaction.type}
              onChange={onChangeField}
              className="form-select form-select-sm"
              aria-label="Small select example"
            >
              <option value="" disabled>
                Select type
              </option>
              <option value="Expense">Expense</option>
              <option value="Income">Income</option>
            </select>
          </div>
          <div className="my-3">
            <label htmlFor="category">Category</label>
            <select
              value={transaction.category}
              onChange={onChangeField}
              name="category"
              className="form-select form-select-sm"
              aria-label="Small select example"
            >
              <option value="" disabled>
                Select category
              </option>
              {transaction.type === 'Expense' ? (
                <>
                  <option value="Food">Food</option>
                  <option value="Drinks">Drinks</option>
                  <option value="Clothes">Clothes</option>
                </>
              ) : transaction.type === 'Income' ? (
                <>
                  <option value="Salary">Salary</option>
                  <option value="Investments">Investments</option>
                </>
              ) : null}
            </select>
          </div>
          <div className="my-3">
            <label htmlFor="Amount">Amount</label>
            <div className="d-flex align-items-center">
              <input
                value={transaction.amount}
                onChange={onChangeField}
                type="number"
                name="amount"
                min={1}
                className="form-control me-2"
              />
              <span>KGS</span>
            </div>
          </div>
          <hr/>
          <div className="my-3 d-flex justify-content-between align-items-center">
            <Link to="/" type="submit" className="btn btn-outline-info">
              Cancel
            </Link>
            <button type="submit" className="btn btn-outline-success">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TransactionForm;

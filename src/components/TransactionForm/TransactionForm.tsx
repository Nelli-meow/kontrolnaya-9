import { Link } from 'react-router-dom';
import './TransactionForm.css';
import { useEffect, useState } from 'react';
import { ITransaction } from '../../types';
import * as React from 'react';
import { useAppDispatch } from '../../app/hooks.ts';
import { addTransaction } from '../../store/slices/orderSlice.ts';

const initialForm = {
  type: '',
  category: '',
  amount: 1,
};

interface TransactionFormProps {
  submitForm: (transaction: ITransaction) => void,
  transactionToEdit?: ITransaction,
}


const TransactionForm: React.FC<TransactionFormProps> = ({ submitForm, transactionToEdit }) => {
  const [transaction, setTransaction] = useState<ITransaction>(transactionToEdit || initialForm);
  const dispatch = useAppDispatch();

  const onChangeField = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setTransaction((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (transactionToEdit) {
      setTransaction(transactionToEdit);
    }
  }, [transactionToEdit]);

  const onSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!transaction.type.trim() || !transaction.category.trim() || transaction.amount <= 0) {
      alert('Please fill out all fields correctly');
      return;
    }

    const newTransaction = {
      ...transaction,
      date:  new Date().toISOString(),
    };

    await submitForm(newTransaction);

    if (!transactionToEdit) {
      dispatch(addTransaction(newTransaction));
    }

    setTransaction({ ...initialForm });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content border border-2 rounded p-4">
        <h2>{transactionToEdit ? 'Edit Transaction' : 'Add Expense/Income'}</h2>
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
            <Link to="/" className="btn btn-outline-info">
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

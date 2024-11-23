import TransactionForm from '../../components/TransactionForm/TransactionForm.tsx';
import { useNavigate } from 'react-router-dom';
import { ITransaction } from '../../types';
import axiosAPI from '../../axiosAPI.ts';

const NewTransaction = () => {
  const navigate = useNavigate();

  const submitForm = async (transaction: ITransaction) => {
    try {
      await axiosAPI.post(`/transactions.json`, {...transaction});
      navigate('/');
    } catch (e) {
      console.error(e);
    } finally {

    }
  }

  return (
    <>
      <TransactionForm submitForm={submitForm} />
    </>
  );
};

export default NewTransaction;
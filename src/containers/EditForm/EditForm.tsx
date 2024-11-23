import {  useParams } from 'react-router-dom';
import TransactionForm from '../../components/TransactionForm/TransactionForm.tsx';

const EditForm = () => {
  const { id } = useParams() as { id: string };


  return (
    <>
      <TransactionForm/>
    </>
  );
};

export default EditForm;

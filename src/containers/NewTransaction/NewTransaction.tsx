import TransactionForm from '../../components/TransactionForm/TransactionForm.tsx';
import { useAppDispatch } from '../../app/hooks.ts';
import { useNavigate, useParams } from 'react-router-dom';

const NewTransaction = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams() as { id: string };
  const navigate = useNavigate();


  return (
    <>
      <TransactionForm/>
    </>
  );
};

export default NewTransaction;
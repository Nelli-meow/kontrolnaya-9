import './App.css'
import Header from "./components/Header/Header.tsx";
import { Route, Routes } from 'react-router-dom';
import TransactionForm from './components/TransactionForm/TransactionForm.tsx';

const App = () => {

  return (
    <>
      <Header/>
      <Routes>
        <Route path="/add" element={<TransactionForm/>}/>
        <Route path="*" element={<p className="text-center m-5">Page is not found :(</p>} />
      </Routes>
    </>
  )
};

export default App

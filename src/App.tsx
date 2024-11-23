import './App.css'
import Header from "./components/Header/Header.tsx";
import { Route, Routes } from 'react-router-dom';
import TransactionForm from './components/TransactionForm/TransactionForm.tsx';
import MainPage from './containers/MainPage/MainPage.tsx';

const App = () => {

  return (
    <>
      <Header/>
      <Routes>
        <Route path="/" element={<MainPage/>}/>
        <Route path="/add" element={<TransactionForm/>}/>
        <Route path="*" element={<p className="text-center m-5">Page is not found :(</p>} />
      </Routes>
    </>
  )
};

export default App

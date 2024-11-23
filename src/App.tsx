import './App.css'
import Header from "./components/Header/Header.tsx";
import { Route, Routes } from 'react-router-dom';
import MainPage from './containers/MainPage/MainPage.tsx';
import EditForm from './containers/EditForm/EditForm.tsx';
import NewTransaction from './containers/NewTransaction/NewTransaction.tsx';

const App = () => {

  return (
    <>
      <Header/>
      <Routes>
        <Route path="/" element={<MainPage/>}/>
        <Route path="/add" element={<NewTransaction/>}/>
        <Route path="/edit/:id/transaction" element={<EditForm/>}/>
        <Route path="*" element={<p className="text-center m-5">Page is not found :(</p>} />
      </Routes>
    </>
  )
};

export default App

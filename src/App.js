import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { GlobalProvider } from './context/GlobalContext';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Footer from './components/Footer';
import CrudData from './CRUD/CrudData';
import CrudForm from './CRUD/CrudForm';

const App = () => {
  return (
    <>

<BrowserRouter>
    <GlobalProvider>

      <Navbar/>

      <Routes>

        <Route path='/' element={<Home/>} />
        <Route path='/manage-data' element={<CrudData/> } />
        <Route path='/manage-data/create' element={<CrudForm/> } />
        <Route path='/manage-data/edit/:Id' element={<CrudForm/> }/>

      </Routes>

      <Footer/>

    </GlobalProvider>
    </BrowserRouter>

    </>
  );
}

export default App;

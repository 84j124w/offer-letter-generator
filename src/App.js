import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import LetterPdf from './components/LetterPdf';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/generateletter' element={<LetterPdf/>}/>
    </Routes>

  </BrowserRouter>
  );
}

export default App;

import Customerlist from './components/Customerlist';
import Traininglist from './components/Traininglist'
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
  Link
  } from "react-router-dom";
import Header from './components/Header';
import { Button } from '@mui/material';
// react-router by Atte Mäkinen
function App() {
  return (
    <div className="App">
      
            <Header/>
                 <BrowserRouter>
            <Link to="/"><Button style={{margin:10}} variant="contained" >Trainings</Button></Link>{' '}
            <Link to="/customers"><Button variant="contained">Customers</Button></Link>{' '}

            <Routes>
            <Route exact path="/" element={<Traininglist/>} />
            <Route path="/customers" element={<Customerlist/>} />
            </Routes>
            </BrowserRouter>
    </div>
  );
}

export default App;

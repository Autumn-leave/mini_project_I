import Signup from './component/Signup';
import Login from './component/Login';
import Profile from './component/Profile';
import './App.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/Profile' element={<Profile />} />
        <Route path='/Signup' element={<Signup />} />
        <Route path='/' element={<Login />}/>
        
      </Routes>


    </BrowserRouter>
  );
}

export default App;

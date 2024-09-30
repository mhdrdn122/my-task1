import { Route, Routes } from 'react-router-dom';
import Login from './Pages/Auth/Login';
import Dashboard from './Pages/Dashboard/Dashboard';
import AddClinic from './Components/Dashboard/AddClinic'
import AddAdmin from './Components/Dashboard/AddAdmin'
import axios from 'axios'
import { useEffect } from 'react';
import Cookies from 'cookie-universal'
import ClinicInfo from './Components/Dashboard/ClinicInfo';

function App() {
 
  return (
    <div className="App">
     <Routes >
        {/* Login Page */}
        <Route path='/' element={<Login />}/>

        {/* Dashboard Page */}
        <Route path='/dashboard' element={<Dashboard />} >
          <Route path='create-clinic' element={<AddClinic />} />
          <Route path='add-admin' element={<AddAdmin />} />
          <Route path='clinic-info' element={<ClinicInfo />} />        
        </Route>

     </Routes>
    </div>
  );
}

export default App;

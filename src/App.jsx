import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import MyPatients from './pages/MyPatients';
import AddPatient from './pages/AddPatient';
import PatientDetails from './pages/PatientDetails';
import AddMedicine from './pages/AddMedicine';
import '../src/index.css'
function App(){
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/dashboard/:doctorId' element={<Dashboard/>} />
        <Route path='/patients/:doctorId' element={<MyPatients/>} />
        <Route path='/add-patient/:doctorId' element={<AddPatient/>} />
        <Route path='/patient/:id/:doctorId' element={<PatientDetails/>} />
        <Route path='/add-medicine/:patientId/:doctorId' element={<AddMedicine/>} />
      </Routes>
    </Router>
  );
}

export default App;

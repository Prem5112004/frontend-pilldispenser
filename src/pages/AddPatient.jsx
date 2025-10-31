import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import '../pages/design/contain.css';

function AddPatient() {
  const { doctorId } = useParams();
  const [id, setId] = useState('');   // ✅ new state for patientId
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [phoneno, setPhone] = useState('');
  const navigate = useNavigate();

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://pilldispenser.onrender.com/api/patients/add', {
        id,         // ✅ send patientId
        name,
        age,
        phoneno,
        doctorId
      });
      navigate(`/patients/${doctorId}`);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Error adding patient');
    }
  };

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="flex-grow-1">
        <Navbar />
        <div className="container mt-4">
          <h2>ADD PATIENT</h2>
          <form className="card-base" onSubmit={handleAdd}>
            <div className="mb-3">
              <label>Patient ID</label>
              <input
                className="form-control"
                value={id}
                onChange={(e) => setId(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label>Name</label>
              <input
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label>Age</label>
              <input
                type="number"
                className="form-control"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label>Phone</label>
              <input
                className="form-control"
                value={phoneno}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
            <button className="btn btn-success">Add Patient</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddPatient;

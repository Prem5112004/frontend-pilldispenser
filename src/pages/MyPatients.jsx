import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import '../pages/design/contain.css';
function MyPatients(){
  const { doctorId } = useParams();
  const [patients,setPatients] = useState([]);
  const navigate = useNavigate();

  useEffect(()=>{
    const fetchPatients = async () => {
      try {
        const res = await axios.get(`https://pilldispenser.onrender.com/api/patients/${doctorId}`);
        setPatients(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchPatients();
  },[doctorId]);

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="flex-grow-1">
        <Navbar />
        <div className="container mt-4">
          <div className="card-details">
          <h2>My Patients</h2><br/>
          <ul className="list-group">
            {patients.map(p=>(
              <li key={p.id} className="list-group-item d-flex justify-content-between">
                {p.name} ({p.age})
                <button className="btn btn-info btn-sm" onClick={() => navigate(`/patient/${p.id}/${doctorId}`)}>View</button>
              </li>
            ))}
          </ul>
        </div>
        </div>
      </div>
    </div>
  );
}

export default MyPatients;

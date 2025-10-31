import { useNavigate, useParams} from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
function Navbar(){ 
  const navigate = useNavigate();
  const { doctorId } = useParams();
  const [doctor, setDoctor] = useState(null);

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const res = await axios.get(`https://pilldispenser.onrender.com/api/doctor/${doctorId}`);
        setDoctor(res.data);
      } catch (err) {
        console.error("Error fetching doctor:", err.message);
      }
    };
    if (doctorId) fetchDoctor();
  }, [doctorId]);
  return (
    <nav className="navbar navbar-light bg-light shadow-sm">
      <div className="container-fluid">
        <div className="d-flex"><i className="bi bi-person-circle mx-2"></i><h5>{doctor?.name || "Doctor" }</h5></div>
        <span className="navbar-brand fw-bold">MediTrack</span>
        <button className="btn btn-danger btn-sm" onClick={() => navigate('/')}>Logout</button>
      </div>
    </nav>
  );
}

export default Navbar;

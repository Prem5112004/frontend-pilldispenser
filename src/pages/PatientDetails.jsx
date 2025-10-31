import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

function PatientDetails() {
  const { id, doctorId } = useParams();
  const navigate = useNavigate();
  const [medicines, setMedicines] = useState([]);
  const [patient, setPatient] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const pres = await axios.get(`https://pilldispenser.onrender.com/api/patient/${id}`);
        setPatient(pres.data);

        const mres = await axios.get(`https://pilldispenser.onrender.com/api/medicines/${id}`);
        setMedicines(mres.data);
      } catch (err) {
        console.error("Error fetching patient details:", err.message);
      }
    };
    fetchData();
  }, [id]);

  const deletePatient = async () => {
    if (!window.confirm("Are you sure you want to delete this patient and all their medicines?")) {
      return;
    }
    try {
      await axios.delete(`https://pilldispenser.onrender.com/api/patient/${id}`);
      alert('Patient and medicines deleted');
      navigate(`/patients/${doctorId}`);
    } catch (err) {
      console.error(err);
      alert('Error deleting patient');
    }
  };

  const deleteMedicine = async (mid) => {
    if (!window.confirm("Delete this medicine schedule?")) {
      return;
    }
    try {
      await axios.delete(`https://pilldispenser.onrender.com/api/medicines/${mid}`);
      setMedicines(medicines.filter(m => m.id !== mid));
    } catch (err) {
      console.error(err);
      alert('Error deleting medicine');
    }
  };

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="flex-grow-1">
        <Navbar />
        <div className="container mt-4">
          <h2 className="mb-4">Patient Details</h2>
          <div className="card-details">
          {patient ? (
            <div className="container">
                <h5>Name: {patient.name}</h5>
                <p>Age: {patient.age}</p>
                <p>Phone: {patient.phoneno}</p>
            </div>
          ) : (
            <h5>Loading details...</h5>
          )}
          </div>
          <div className="mb-3">
            <button
              className="btn btn-success me-2"
              onClick={() => navigate(`/add-medicine/${id}/${doctorId}`)}
            >
              <i className="bi bi-prescription2 me-2"></i>
              Add Medicine
            </button>
            <button className="btn btn-danger" onClick={deletePatient}>
              <i className="bi bi-person-x-fill me-2"></i>
              Delete Patient
            </button>
          </div>

          <hr />

          <h3 className="mb-3">Medicines</h3>
          <ul className="list-group mb-3 mx-auto" style={{ maxWidth: "600px" }}>
            {medicines.length > 0 ? (
              medicines.map((m) => (
                <li
                  key={m.id}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  <span>{m.name} — {m.scheduledTime}</span>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => deleteMedicine(m.id)}
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                </li>
              ))
            ) : (
              <li className="list-group-item">No medicines scheduled</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default PatientDetails;

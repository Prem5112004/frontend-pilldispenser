import { useLocation, useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import '../pages/design/dashboard.css';
function Dashboard(){
  const { doctorId } = useParams();
  const { state } = useLocation();
  const doctor = state?.doctor;
  const navigate = useNavigate();

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="flex-grow-1">
        <Navbar />
        <div className="container mt-4">
          <h2 className="mb-3">Welcome, Dr. {doctor?.name || '------'}</h2>
          <div className="mt-5">
            <button className="optcards" onClick={() => navigate(`/patients/${doctorId}`)}>
              <h5><i className="bi bi-person-lines-fill mx-2"></i>MY PATIENTS</h5>
            </button>
            <button className="optcards" onClick={() => navigate(`/add-patient/${doctorId}`)}>
              <h5><i className="bi bi-person-add mx-2"></i>ADD PATIENT</h5>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

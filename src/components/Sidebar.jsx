import { useNavigate, useParams } from "react-router-dom";
import './design/sidebar.css';
function Sidebar() {
  const { doctorId } = useParams();
  const navigate = useNavigate();

  return (
    <div className="base-bg border-end vh-100 p-3" style={{ width: 220 }}>
      <h5>Menu</h5>
      <ul className="nav flex-column mt-4">
        <li className="nav-item mb-3 mt-3">
          <button className="btn-custom" onClick={() => navigate(`/dashboard/${doctorId}`)}>
            <i className="bi bi-list"></i> Dashboard
          </button>
        </li>
        <li className="nav-item mb-3">
          <button className="btn-custom" onClick={() => navigate(`/patients/${doctorId}`)}>
            <i className="bi bi-clipboard2-heart-fill"></i> My Patients
          </button>
        </li>
        <li className="nav-item">
          <button className="btn-custom" onClick={() => navigate(`/add-patient/${doctorId}`)}>
            <i className="bi bi-person-fill-add"></i> Add Patient
          </button>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;

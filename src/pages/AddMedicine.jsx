import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import '../pages/design/contain.css';
function AddMedicine() {
  const { patientId, doctorId } = useParams();
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [newMed, setNewMed] = useState("");
  const [scheduledTime, setTime] = useState("");
  const navigate = useNavigate();

 useEffect(() => {
  const fetchSlots = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/patient-slots/${patientId}`);
      setSlots(res.data); // this will be an object: { S1: "A", S2: "B", S3: "C" }
    } catch (err) {
      console.error("Error fetching slots:", err.message);
    }
  };
  fetchSlots();
}, [patientId]);


  const handleAdd = async (e) => {
    e.preventDefault();
    const name = newMed || selectedSlot;
    if (!name) {
      alert("Please select or enter a medicine name");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/medicines/add", {
        name,
        scheduledTime,
        patientId,
      });
      alert("Medicine scheduled");
      navigate(`/patient/${patientId}/${doctorId}`);
    } catch (err) {
      alert(err.response?.data?.message || "Error adding medicine");
    }
  };

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="flex-grow-1">
        <Navbar />
        <div className="container mt-4">
          <h2>ADD MEDICINE</h2>
          <form className="card-base" onSubmit={handleAdd}>
            <div className="mb-3">
              <label className="form-label">Enter New Medicine</label>
              <input
                type="text"
                className="form-control"
                value={newMed}
                onChange={(e) => setNewMed(e.target.value)}
                placeholder="Enter new medicine"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Scheduled Time</label>
              <input
                type="time"
                className="form-control"
                value={scheduledTime}
                onChange={(e) => setTime(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn btn-success">
              Add Medicine
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddMedicine;

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../pages/design/contain.css'
function Register(){
  const [id,setId]=useState('');
  const [name,setName]=useState('');
  const [password,setPassword]=useState('');
  const [msg,setMsg]=useState('');
  const navigate=useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://pilldispenser.onrender.com/api/doctors/register',{ id, name, password });
      setMsg(res.data.message);
      setTimeout(()=>navigate('/'),1200);
    } catch (err) {
      setMsg(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="container mt-5">
      <h1>MediTrack Pill Scheduler</h1>
      <div className="card-base">
      <h2>Register Doctor</h2>
      {msg && <div className="alert alert-info">{msg}</div>}
      <form onSubmit={handleRegister}>
        <div className="mb-3">
          <label>Doctor ID</label>
          <input className="form-control" value={id} onChange={(e)=>setId(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label>Name</label>
          <input className="form-control" value={name} onChange={(e)=>setName(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input type="password" className="form-control" value={password} onChange={(e)=>setPassword(e.target.value)} required />
        </div>
        <button className="btn btn-primary">Register</button>
      </form>
      <br/><p><a href='/'>Login here</a></p>
    </div>
    </div>
  );
}

export default Register;

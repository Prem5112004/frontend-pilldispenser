import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../pages/design/contain.css'
function Login(){
  const [id,setId]=useState('');
  const [password,setPassword]=useState('');
  const [err,setErr]=useState('');
  const navigate=useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/doctors/login',{ id, password });
      navigate(`/dashboard/${res.data.doctor.id}`, { state: { doctor: res.data.doctor } });
    } catch (err) {
      setErr(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="container mt-5">
      <h1 className='text-align-center'>MediTrack Pill Scheduler</h1>
      <div className="card-base">
      <h2>Doctor Login</h2><br/>
      {err && <div className="alert alert-danger">{err}</div>}
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label>Doctor ID</label>
          <input className="form-control" value={id} onChange={(e)=>setId(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input type="password" className="form-control" value={password} onChange={(e)=>setPassword(e.target.value)} required />
        </div>
        <button className="btn btn-success">Login</button>
      </form><br/>
      <p className="mt-3">Don't have an account? <a href="/register">Register</a></p>
    </div>
    </div>
  );
}

export default Login;

import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Style/Login.css'; 

import { BASE_URL, LOGIN } from '../../Api/api';
import Cookies from 'cookie-universal';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user , setUser ] = useState({})

  const cookis = Cookies()

  const navigate = useNavigate()
  
  const login = async (e) => {
    e.preventDefault();

   
    if (username === '') {
      toast.error('اسم المستخدم لا يمكن أن يكون فارغًا');
      return;
    }

    if (password.length < 8) {
      toast.error('كلمة المرور يجب أن تكون أكبر من 7 محارف');
      return;
    }

    try {
      const res = await axios.post(`${BASE_URL}/${LOGIN}`, { username, password });
     
      setUser(res.data.data)

      const token = res.data.data.token
      cookis.set("token-task" , token)
      console.log(res.data.data)
      navigate("/dashboard")
      toast.success('تم تسجيل الدخول بنجاح!');
    } catch (error) {
      console.error(error);
      toast.error('حدث خطأ أثناء تسجيل الدخول');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>تسجيل الدخول</h2>
        <form onSubmit={login}>
          <div className="form-group">
            <label>اسم المستخدم</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="أدخل اسم المستخدم"
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label>كلمة المرور</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="أدخل كلمة المرور"
              className="form-input"
            />
          </div>
          <button type="submit" className="login-button">تسجيل الدخول</button>
        </form>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Login;

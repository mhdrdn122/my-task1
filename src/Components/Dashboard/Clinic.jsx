import React, { useState } from 'react';
import './Style/clinice.css';  
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'cookie-universal';

const Clinic = ({ name = '', address, city, color, logo, url_name }) => {
  const cookie = Cookies();

  const [nameAr, setNameAr] = useState('');
  const [nameEn, setNameEn] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = async () => {
    try {
      const response = await axios.put(
        `https://medical-clinic.serv00.net/api/clinic/1`,
        {
          name_ar: nameAr,
          name_en: nameEn,
        },
        {
          headers: {
            Authorization: 'Bearer ' + cookie.get('token-task'),
          },
        }
      );

      toast.success('تم تعديل العيادة بنجاح!');
      setIsEditing(false);
    } catch (error) {
      if(error.status === 403){
        toast.error("عذرا ليس لديك الصلاحيات  الكافية");
  
        }
      toast.error('حدث خطأ أثناء تعديل العيادة.');
    }
  };

  return (
    <div className="clinic-container">
      <ToastContainer />
      <h2>معلومات العيادة</h2>

      <div className="clinic-info">
        <div>
          <strong>الاسم:</strong> {name}
        </div>
        <div>
          <strong>العنوان:</strong> {address}
        </div>
        <div>
          <strong>المدينة:</strong> {city}
        </div>
        <div>
          <strong>اللون:</strong> {color}
        </div>
        <div>
          <strong>رابط العيادة:</strong> {url_name}
        </div>
      </div>

      <button onClick={() => setIsEditing(!isEditing)} style={{ marginTop: '10px' }}>
        تعديل الاسم
      </button>

      {isEditing && (
        <div style={{ marginTop: '20px' }}>
          <div>
            <label>الاسم العربي الجديد:</label>
            <input
              type="text"
              value={nameAr}
              onChange={(e) => setNameAr(e.target.value)}
              placeholder="أدخل الاسم العربي الجديد"
            />
          </div>
          <div>
            <label>الاسم الإنجليزي الجديد:</label>
            <input
              type="text"
              value={nameEn}
              onChange={(e) => setNameEn(e.target.value)}
              placeholder="أدخل الاسم الإنجليزي الجديد"
            />
          </div>
          <button onClick={handleEdit}>حفظ التعديلات</button>
        </div>
      )}
    </div>
  );
};

export default Clinic;

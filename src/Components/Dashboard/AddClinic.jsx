import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Style/add-clinic.css';
import Cookies from 'cookie-universal';

const CreateClinic = () => {
  // حالة الحقول المطلوبة
  const [nameAr, setNameAr] = useState('');
  const [nameEn, setNameEn] = useState('');
  const [cityId, setCityId] = useState('');

  const [addressAr, setAddressAr] = useState('');
  const [addressEn, setAddressEn] = useState('');
  
  const [urlName, setUrlName] = useState('');
  const [color, setColor] = useState('');
  const [logo, setLogo] = useState(null);
  const [requirements, setRequirements] = useState(['']);
  const [contactInfos, setContactInfos] = useState(['']);

  const cookies = Cookies();

  // دالة للتعامل مع الحقول الإجبارية والاختيارية
  const handleCreateClinic = async (e) => {
    e.preventDefault();

    // التحقق من الحقول الإجبارية
    if (!nameAr || !nameEn || !cityId) {
      toast.error('الحقول الإجبارية: الاسم العربي، الاسم الإنجليزي، والمدينة يجب أن تكون مملوءة');
      return;
    }

    // إنشاء FormData لإرسال البيانات
    const formData = new FormData();
    formData.append('name_ar', nameAr);
    formData.append('name_en', nameEn);
    formData.append('city_id', cityId);

    // إضافة الحقول الاختيارية فقط إذا تم إدخالها
    if (addressAr) formData.append('address_ar', addressAr);
    if (addressEn) formData.append('address_en', addressEn);
    if (urlName) formData.append('url_name', urlName);
    if (color) formData.append('color', color);
    if (logo) formData.append('logo', logo);

    // إضافة المتطلبات (requirements)
    requirements.forEach((req, index) => {
      if (req) formData.append(`requirements[${index}]`, req);
    });

    // إضافة معلومات الاتصال (contactInfos)
    contactInfos.forEach((info, index) => {
      if (info) formData.append(`contactInfos[${index}][value]`, info);
    });

    try {
      const token = cookies.get('token-task');
      const res = await axios.post('https://medical-clinic.serv00.net/api/clinic', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      toast.success('تم إنشاء العيادة بنجاح!');
      console.log(res.data);
    } catch (error) {
      if(error.status === 422) {
      toast.error(' هذه العيادة موجودة بالفعل');
      }
      if(error.status === 403){
      toast.error("عذرا ليس لديك الصلاحيات لإنشاء عيادة");

      }
      else{
        toast.error('حدث خطأ أثناء إنشاء العيادة.');

      }
      console.error(error);
    }
  };

  // دالة لحذف المتطلب أو معلومات الاتصال
  const handleRemoveField = (setFields, fields, index) => {
    const updatedFields = [...fields];
    updatedFields.splice(index, 1);
    setFields(updatedFields);
  };

  return (
    <div className="create-clinic-container">
      <h2>إنشاء عيادة جديدة</h2>
      <form onSubmit={handleCreateClinic}>
        <div className="form-group">
          <label>الاسم بالعربية (إجباري)</label>
          <input type="text" value={nameAr} onChange={(e) => setNameAr(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>الاسم بالإنجليزية (إجباري)</label>
          <input type="text" value={nameEn} onChange={(e) => setNameEn(e.target.value)} required />
        </div>

        {/* اختيار المدينة بدلاً من إدخال معرف المدينة */}
        <div className="form-group">
          <label>المدينة (إجباري)</label>
          <select value={cityId} onChange={(e) => setCityId(e.target.value)} required>
            <option value="">اختر المدينة</option>
            <option value="1">دمشق</option>
            <option value="2">حلب</option>
            <option value="3">حمص</option>
          </select>
        </div>

        {/* الحقول الاختيارية */}
        <div className="form-group">
          <label>العنوان بالعربية (اختياري)</label>
          <input type="text" value={addressAr} onChange={(e) => setAddressAr(e.target.value)} />
        </div>
        <div className="form-group">
          <label>العنوان بالإنجليزية (اختياري)</label>
          <input type="text" value={addressEn} onChange={(e) => setAddressEn(e.target.value)} />
        </div>
        <div className="form-group">
          <label>URL اسم (اختياري)</label>
          <input type="text" value={urlName} onChange={(e) => setUrlName(e.target.value)} />
        </div>
        <div className="form-group">
          <label>اللون (اختياري)</label>
          <input type="text" value={color} onChange={(e) => setColor(e.target.value)} />
        </div>
        <div className="form-group">
          <label>شعار العيادة (اختياري)</label>
          <input type="file" onChange={(e) => setLogo(e.target.files[0])} />
        </div>

        {/* المتطلبات */}
        <div className="form-group">
          <label>المتطلبات (اختياري)</label>
          {requirements.map((req, index) => (
            <div key={index} className="requirement-field">
              <input
                type="text"
                value={req}
                onChange={(e) => {
                  const updatedReqs = [...requirements];
                  updatedReqs[index] = e.target.value;
                  setRequirements(updatedReqs);
                }}
                placeholder={`Requirement ${index + 1}`}
              />
              <button
                type="button"
                onClick={() => handleRemoveField(setRequirements, requirements, index)}
              >
                حذف
              </button>
            </div>
          ))}
          <button type="button" onClick={() => setRequirements([...requirements, ''])}>
            إضافة متطلب آخر
          </button>
        </div>

        {/* معلومات الاتصال */}
        <div className="form-group">
          <label>معلومات الاتصال (اختياري)</label>
          {contactInfos.map((info, index) => (
            <div key={index} className="contact-info-field">
              <input
                type="text"
                value={info}
                onChange={(e) => {
                  const updatedInfos = [...contactInfos];
                  updatedInfos[index] = e.target.value;
                  setContactInfos(updatedInfos);
                }}
                placeholder={`Contact Info ${index + 1}`}
              />
              <button
                type="button"
                onClick={() => handleRemoveField(setContactInfos, contactInfos, index)}
              >
                حذف
              </button>
            </div>
          ))}
          <button type="button" onClick={() => setContactInfos([...contactInfos, ''])}>
            إضافة وسيلة اتصال أخرى
          </button>
        </div>

        <button type="submit" className="submit-button">إنشاء العيادة</button>
      </form>

      <ToastContainer />
    </div>
  );
};

export default CreateClinic;

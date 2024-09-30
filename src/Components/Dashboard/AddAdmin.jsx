import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import Cookies from 'cookie-universal';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Style/add-admin.css'

const AddAdmin = () => {
  const { register, handleSubmit, reset } = useForm();
  const cookies = Cookies();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        'https://medical-clinic.serv00.net/api/actor',
        {
          username: data.username,
          password: data.password,
          city_id: data.city_id,
          role_id: 2, 
          name_ar: data.name_ar,
          name_en: data.name_en,
          phone_number: data.phone_number,
          email: data.email,
          gender: data.gender,
          birth_date: data.birth_date,
          clinic_id: data.clinic_id,  
          specialization_id: data.specialization_id,
          description: data.description,
        },
        {
          headers: {
            Authorization: `Bearer ${cookies.get('token-task')}`,
          },
        }
      );
      toast.success('تم إنشاء المستخدم بنجاح!');
      reset();
    } catch (error) {
      if (error.response.status === 422) {
        toast.error('عذرا  المستخدم موجود بالفعل');
      }
      if(error.status === 403){
        toast.error("عذرا ليس لديك الصلاحيات لإضافة مشرف");
  
        } else {
        toast.error('فشل في إنشاء المستخدم. يرجى التحقق من البيانات المدخلة.');
      }
      console.error('Error creating user:', error);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <ToastContainer /> 
      <h2>إنشاء مشرف</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="admin-form">
        <div className="form-group">
          <label>اسم المستخدم:</label>
          <input {...register('username')} placeholder="اسم المستخدم" required />
        </div>
        <div className="form-group">
          <label>كلمة المرور:</label>
          <input {...register('password')} type="password" placeholder="كلمة المرور" required />
        </div>
        <div className="form-group">
          <label>المدينة:</label>
          <select {...register('city_id')} required>
            <option value="1">دمشق</option>
            <option value="2">حلب</option>
            <option value="3">حمص</option>
          </select>
        </div>
        <div className="form-group">
          <label>الاسم بالعربية:</label>
          <input {...register('name_ar')} placeholder="الاسم بالعربية" required />
        </div>
        <div className="form-group">
          <label>الاسم بالإنجليزية:</label>
          <input {...register('name_en')} placeholder="الاسم بالإنجليزية" required />
        </div>
        <div className="form-group">
          <label>رقم الهاتف:</label>
          <input {...register('phone_number')} placeholder="رقم الهاتف" required />
        </div>
        <div className="form-group">
          <label>البريد الإلكتروني:</label>
          <input {...register('email')} type="email" placeholder="البريد الإلكتروني" />
        </div>
        <div className="form-group">
          <label>الجنس:</label>
          <select {...register('gender')} required>
            <option value="1">ذكر</option>
            <option value="2">أنثى</option>
          </select>
        </div>
        <div className="form-group">
          <label>تاريخ الميلاد:</label>
          <input {...register('birth_date')} type="date" required />
        </div>

        <div className="form-group">
          <label>العيادة:</label>
          <select {...register('clinic_id')} required>
            <option value="1">العيادة الأولى</option>
            <option value="2">العيادة الثانية</option>
            <option value="3">العيادة الثالثة</option>
          </select>
        </div>

        <div className="form-group">
          <label>معرف التخصص:</label>
          <input {...register('specialization_id')} placeholder="معرف التخصص" />
        </div>
        <div className="form-group">
          <label>الوصف:</label>
          <textarea {...register('description')} placeholder="الوصف" />
        </div>
        <button type="submit" className="submit-button">إنشاء مشرف</button>
      </form>
    </div>
  );
};

export default AddAdmin;

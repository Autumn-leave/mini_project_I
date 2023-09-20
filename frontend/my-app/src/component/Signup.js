import React from 'react';
import axios from 'axios';
import Toast from 'react-bootstrap/Toast';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { useNavigate,Link } from 'react-router-dom';

// import { IconName } from "react-icons/bs";

const validationSchema = yup.object().shape({
  name: yup.string()
    .required('Name is required'),
  username: yup.string()
    .required('Username is required'),
  email: yup.string()
    .email('Invalid email')
    .test('com-domain', 'Email must have .com domain', (value) => {
      if (!value) return true; // Skip validation if value is empty
      return value.endsWith('.com');
    })
    .required('Email is required'),
  password: yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
});

function Signup() {
  const nav =useNavigate();
  const handleSubmit = async (values, { resetForm }) => {
    { console.log(values) }
    const response1 = await axios.post('http://localhost:5000/users/', {

      name: values.name,
      username: values.username,
      password: values.password,
      email: values.email,
    }).then((res) => {
      console.log(res);
      resetForm();
    }).catch((d) => {
      alert("Email ID or Username already exists!");
    })
    nav('/');
  };

  return (
    <div className='containers'>
      <img src='./assest/logo.png' />
      <div className='home-page'>
        <div className='own-card'>
          <Formik
            initialValues={{
              name: '',
              username: '',
              email: '',
              password: '',
              confirmPassword: '',
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form>
              <div className="mb-3">
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon1">Name</span>
                  </div>
                  <Field type="text" className="form-control" id="name" name="name" />
                </div>
                <ErrorMessage name="name" component="div" className="text-danger" />
              </div>
              <div className='mb-3'>
                <div className="input-group ">
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon1">Username</span>
                  </div>
                  <Field type="text" className="form-control" id="username" name="username" />

                </div>
                <ErrorMessage name="username" component="div" className="text-danger" />
              </div>
              <div className='mb-3'>
                <div className="input-group ">
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon1">Email</span>
                  </div>
                  <Field type="email" className="form-control" id="email" name="email" />

                </div>
                <ErrorMessage name="email" component="div" className="text-danger" />
              </div>
              <div className='mb-3'>
                <div className="input-group ">
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon1">Password</span>
                  </div>
                  <Field type="password" className="form-control" id="password" name="password" />

                </div>
                <ErrorMessage name="password" component="div" className="text-danger" />
              </div>
              <div className='mb-3'>
                <div className="input-group ">
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon1">Re-Password</span>
                  </div>
                  <Field type="password" className="form-control" id="confirmPassword" name="confirmPassword" />

                </div>
                <ErrorMessage name="confirmPassword" component="div" className="text-danger" />
              </div>
              <div className='buton'>
                <button type="submit" className="btn text-light">Sign Up</button>
              </div>
              <hr/>
              <Link to={'/'} className="link">Account Already Exists</Link>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default Signup;

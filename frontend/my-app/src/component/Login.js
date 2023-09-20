
import React from "react";
import * as yup from 'yup';
import axios from 'axios';
// import { ToastContainer, toast } from "react-toastify";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useNavigate, Link } from 'react-router-dom';

const validationSchema = yup.object().shape({
    username: yup.string()
        .required("Username is required"),
    password: yup.string()
        .required("Password is required"),
});

function Login() {
    const nav = useNavigate();
    const handleSubmit = async (values) => {
        const response1 = await axios.post('http://localhost:5000/users/login', {
            username: values.username,
            password: values.password,
        }).then((d) => {
            console.log(d.data);
            if (d.data.statusCode === 200) {
              localStorage.setItem("user", JSON.stringify(d.data.myData));
              console.log(d.data.myData);
              nav('/Profile');
             
              
            }
        }).catch((d) => {
            alert("Email ID or Password is wrong!");
        })
    };
    return (
        <div className="containers">
            <img src='./assest/logo.png' />
            <div className="home-page">
                <div className="own-card">
                    <Formik
                        initialValues={{
                            username: '',
                            password: '',
                        }}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        <Form>
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
                                        <span className="input-group-text" id="basic-addon1">Password</span>
                                    </div>
                                    <Field type="password" className="form-control" id="password" name="password" />

                                </div>
                                <ErrorMessage name="password" component="div" className="text-danger" />
                            </div>
                            <div className='buton'>
                                <button type="submit" className="btn text-light">Login</button>
                            </div>
                            <hr/>
                            <Link to={'/Signup'} className="link">Create New Account</Link>
                        </Form>
                    </Formik>
                </div>
            </div>
          
        </div>
    )
}

export default Login;
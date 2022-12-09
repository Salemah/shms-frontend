import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
 import './test.css';

import { useHistory } from 'react-router-dom';
import swal from 'sweetalert';
const Register = () => {
    const [regdata, setRegData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
        age: '',
        emergency_contact: '',
        address: '',
        errors: []
    });
    const history = useHistory();
    const [regsuccess, setRegsuccess] = useState(false);
    const handleOnChange = e => {
        const feild = e.target.name;
        const value = e.target.value;
        const newData = { ...regdata };
        newData[feild] = value;
        setRegData(newData);
    }
    const handleonSubmit = e => {
        const data = {
            ...regdata
        }
        console.log(data);
        axios.post('http://127.0.0.1:8000/api/registration', data)
            .then(response => {
                console.log(response.data);
                if (response.data.validation_errors) {
                    setRegData({ ...regdata, errors: response.data.validation_errors });
                    swal("Warning", "Registration Error!", "error");
                } else {
                    swal("success", response.data.message, "success");
                    history.push("/login");

                }

            });

        e.preventDefault();
    }



    return (
     <div className='login-form2'>
     <div className="container login-form2">
         <div className="row align-items-center login-col2">

             <div class="col ">
                 <div className="top-header">
                     <h4>Register</h4>
                 </div>
                 <form onSubmit={handleonSubmit} className="test">
                     <div class="mb-3">
                         <input type="text"
                             name='name'
                             placeholder='Enter  Name'
                             class="form-control  form-input "
                             onBlur={handleOnChange}
                            />
                         <span style={{
                             color: "red", fontSize: "12px", fontWeight: "bold"
                         }}>{regdata.errors.name}</span>
                     </div>
                    
                     <div class="mb-3">
                         <input type="text"
                             name='email'
                             placeholder='Enter  Email'
                             class="form-control  form-input "
                             onBlur={handleOnChange}
                            />
                             <span style={{
                             color: "red", fontSize: "12px", fontWeight: "bold"
                         }}>{regdata.errors.email}</span>

                     </div>
                     <div class="mb-3">
                         <input type="password"
                             name='password'
                             placeholder='Enter  password'
                             class="form-control  form-input"
                             onBlur={handleOnChange}
                             />
                             <span style={{
                             color: "red", fontSize: "12px", fontWeight: "bold"
                         }}>{regdata.errors.password}</span>
                     </div>
                     <div class="mb-3">
                         <input type="password"
                             name='confirmpassword'
                             placeholder='Enter Confirm password'
                             class="form-control  form-input"
                             onBlur={handleOnChange}
                              />
                             <span style={{
                             color: "red", fontSize: "12px", fontWeight: "bold"
                         }}>{regdata.errors.confirmpassword}</span>
                     </div>
                     <div class="mb-3">
                         <input type="text"
                             name='phone'
                             placeholder='Enter  phone'
                             class="form-control  form-input "
                             onBlur={handleOnChange}
                            />
                         <span style={{
                             color: "red", fontSize: "12px", fontWeight: "bold"
                         }}>{regdata.errors.phone}</span>
                     </div>
                     <div class="mb-3">
                         <input type="text"
                             name='age'
                             placeholder='Enter  Age'
                             class="form-control  form-input "
                             onBlur={handleOnChange}
                            />
                         <span style={{
                             color: "red", fontSize: "12px", fontWeight: "bold"
                         }}>{regdata.errors.age}</span>
                     </div>
                     <div class="mb-3">
                         <input type="text"
                             name='emergency_contact'
                             placeholder='Enter  Emergency Contact'
                             class="form-control  form-input "
                             onBlur={handleOnChange}
                            />
                         <span style={{
                             color: "red", fontSize: "12px", fontWeight: "bold"
                         }}>{regdata.errors.emergency_contact}</span>
                     </div>
                     <div class="mb-3">
                         <input type="text"
                             name='address'
                             placeholder='Enter  Address'
                             class="form-control form-input  "
                             onBlur={handleOnChange}
                              />
                              <span style={{
                             color: "red", fontSize: "12px", fontWeight: "bold"
                         }}>{regdata.errors.address}</span>

                     </div>
                     <button type="submit" class="btn btn-primary login-submit-button">Register</button>
                 </form>
                 <div className="not-registersection">
                     <p>Already registerd?<Link style={{ textDecoration: 'none', color: 'red' }} to='/login'>Login</Link></p>
                 </div>
             </div>

         </div>
     </div>
 </div>
    );
};

export default Register;
{/* <div className='login-form'>
            <div className="container ">
                <div className="row align-items-center " id='login-columm'>
                    <div className="col ">
                        <div className="top-header">
                            <h4>Register</h4>
                        </div>
                        <form onSubmit={handleonSubmit}>
                            <div className="mb-3">
                                <input type="text"
                                    name='name'
                                    placeholder='Enter  Name'
                                    className="form-control  form-input "
                                    onBlur={handleOnChange}
                                   />
                                <span style={{
                                    color: "red", fontSize: "12px", fontWeight: "bold"
                                }}>{regdata.errors.name}</span>
                            </div>
                            <div className="mb-3">
                                <input type="text"
                                    name='email'
                                    placeholder='Enter  Email'
                                    className="form-control  form-input "
                                    onBlur={handleOnChange}
                                   />
                                    <span style={{
                                    color: "red", fontSize: "12px", fontWeight: "bold"
                                }}>{regdata.errors.email}</span>

                            </div>
                            <div className="mb-3">
                                <input type="password"
                                    name='password'
                                    placeholder='Enter  password'
                                    className="form-control  form-input"
                                    onBlur={handleOnChange}
                                    />
                                    <span style={{
                                    color: "red", fontSize: "12px", fontWeight: "bold"
                                }}>{regdata.errors.password}</span>
                            </div>
                            <div className="mb-3">
                                <input type="password"
                                    name='confirmpassword'
                                    placeholder='Enter Confirm password'
                                    className="form-control  form-input"
                                    onBlur={handleOnChange}
                                     />
                                    <span style={{
                                    color: "red", fontSize: "12px", fontWeight: "bold"
                                }}>{regdata.errors.confirmpassword}</span>
                            </div>
                            <div className="mb-3">
                                <input type="text"
                                    name='phone'
                                    placeholder='Enter  phone'
                                    className="form-control form-input  "
                                    onBlur={handleOnChange}
                                     />
                                     <span style={{
                                    color: "red", fontSize: "12px", fontWeight: "bold"
                                }}>{regdata.errors.phone}</span>
                            </div>
                            <div className="mb-3">
                                <input type="text"
                                    name='age'
                                    placeholder='Enter  age'
                                    className="form-control form-input  "
                                    onBlur={handleOnChange}
                                     />
                                     <span style={{
                                    color: "red", fontSize: "12px", fontWeight: "bold"
                                }}>{regdata.errors.age}</span>
                            </div>
                            <div className="mb-3">
                                <input type="text"
                                    name='emergency_contact'
                                    placeholder='Enter Emergency Contact'
                                    className="form-control form-input  "
                                    onBlur={handleOnChange}
                                     />
                                     <span style={{
                                    color: "red", fontSize: "12px", fontWeight: "bold"
                                }}>{regdata.errors.emergency_contact}</span>
                            </div>
                            <div className="mb-3">
                              <textarea name="address" id="" cols="30" rows="3"></textarea>
                                <input type="text"
                                    name='emergency_contact'
                                    placeholder='Enter Emergency Contact'
                                    className="form-control form-input  "
                                    onBlur={handleOnChange}
                                     />
                                     <span style={{
                                    color: "red", fontSize: "12px", fontWeight: "bold"
                                }}>{regdata.errors.emergency_contact}</span>
                            </div>
                            <button type="submit" className="btn btn-primary login-submit-button">Register</button>
                        </form>
                        <div className="not-registersection">
                            <p>Already registerd?<Link style={{ textDecoration: 'none', color: 'red' }} to='/login'>Login</Link></p>
                        </div>
                    </div>

                </div>
            </div>
        </div> */}
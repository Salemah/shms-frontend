import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
 import './Register.css';

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
<div class="section">
    <div class="container">
        <div class="row full-height justify-content-center">
            <div class="col-12 text-center align-self-center py-5">
                <div class="section pb-5 pt-5 pt-sm-2 text-center">
                      <label for="reg-log"></label>
                    <div class="card-3d-wrap mx-auto">
                        <div class="card-3d-wrapper">
                            <div class="card-front">
                                <div class="center-wrap">
                                    <div class="section text-center">
                                        <h4 class="mb-4 pb-3 log-head" >Register</h4>
                                        <form onSubmit={handleonSubmit}>
                                        <div class="form-group">
                                            <input type="name" name="name" class="form-style" placeholder="Your Email" id="logemail"  onBlur={handleOnChange}/>
                                            <i class="input-icon uil uil-at"></i>
                                            <span style={{color: "red", fontSize: "12px", fontWeight: "bold"}}>{regdata.errors.name}</span>
                                        </div>	
                                        <div class="form-group">
                                            <input type="email" name="email" class="form-style" placeholder="Your Email" id="logemail"  onBlur={handleOnChange}/>
                                            <i class="input-icon uil uil-at"></i>
                                            <span style={{color: "red", fontSize: "12px", fontWeight: "bold"}}>{regdata.errors.email}</span>
                                        </div>	
                                        <div class="form-group mt-2">
                                            <input type="password" name="password" class="form-style" placeholder="Your Password" id="logpass"  onBlur={handleOnChange}/>
                                            <i class="input-icon uil uil-lock-alt"></i>
                                            <span style={{color: "red", fontSize: "12px", fontWeight: "bold"}}>{regdata.errors.email}</span>
                                        </div>
                                        <div class="form-group mt-2">
                                            <input type="password" name="confirmpassword" class="form-style" placeholder="Your confirmpassword" id="logpass"  onBlur={handleOnChange}/>
                                            <i class="input-icon uil uil-lock-alt"></i>
                                            <span style={{color: "red", fontSize: "12px", fontWeight: "bold"}}>{regdata.errors.confirmpassword}</span>
                                        </div>
                                        <div class="form-group mt-2">
                                            <input type="number" name="phone" class="form-style" placeholder="Your phone" id="logpass"  onBlur={handleOnChange}/>
                                            <i class="input-icon uil uil-lock-alt"></i>
                                            <span style={{color: "red", fontSize: "12px", fontWeight: "bold"}}>{regdata.errors.phone}</span>
                                        </div>
                                        <div class="form-group mt-2">
                                            <input type="number" name="age" class="form-style" placeholder="Your phone" id="logpass"  onBlur={handleOnChange}/>
                                            <i class="input-icon uil uil-lock-alt"></i>
                                            <span style={{color: "red", fontSize: "12px", fontWeight: "bold"}}>{regdata.errors.age}</span>
                                        </div>
                                        <div class="form-group mt-2">
                                            <input type="number" name="emergency_contact" class="form-style" placeholder="Your Emergency Contact" id="logpass"  onBlur={handleOnChange}/>
                                            <i class="input-icon uil uil-lock-alt"></i>
                                            <span style={{color: "red", fontSize: "12px", fontWeight: "bold"}}>{regdata.errors.emergency_contact}</span>
                                        </div>
                                        <div class="form-group mt-2">
                                            <input type="text" name="address" class="form-style" placeholder="Your Address" id="logpass"  onBlur={handleOnChange}/>
                                            <i class="input-icon uil uil-lock-alt"></i>
                                            <span style={{color: "red", fontSize: "12px", fontWeight: "bold"}}>{regdata.errors.address}</span>
                                        </div>
                                        <button type='submit' class="btn  btn-primary my-3">submit</button>
                                        </form>
                                       
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
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
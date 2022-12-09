import axios from 'axios';
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import swal from 'sweetalert';
import './Login.css';
const Login = () => {
     const history = useHistory();
    const [loginData, setLoginData] = useState({
        email: '',
        password: '',
        errors: []
    });
    const handleOnChange = e => {
        const feild = e.target.name;
        const value = e.target.value;
        const newData = { ...loginData };
        newData[feild] = value;
        setLoginData(newData);
   
    }
    const handleonSubmit = e => {
        const data = {
            ...loginData
        }
        axios.post('http://127.0.0.1:8000/api/login', data)
            .then(response => {
                if (response.data.validation_errors) {
                    setLoginData({ ...loginData, errors: response.data.validation_errors });
                    swal("Warning", "Login Error!", "error");
                }
                else {
                    if (response.data.status === "notFound") {
                         swal("Warning", "User not Found!", "error");
                    }
                    else {
                        if (response.data.status === "success") {
                             localStorage.setItem('user_type', response.data.user_type);
                              localStorage.setItem('id', response.data.id);
                             localStorage.setItem('email', response.data.email);
                             localStorage.setItem('name', response.data.name);
                             swal("Success", response.data.message, "success");
                            history.push("/dashboard");
                        }


                    }
                }

            });

        e.preventDefault();
     }
     return (
        //   <div id='login-body' >
        //        <div class="background">
        //             <div class="shape"></div>
        //             <div class="shape"></div>
        //       </div>
        //        <form  onSubmit={handleonSubmit}>
        //             <h3>Login Here</h3>
        //             <label for="email">Email</label>
        //             <input type="email" name='email' placeholder="Email " id="email" onBlur={handleOnChange}/>
        //             <span style={{color: "red", fontSize: "12px", fontWeight: "bold"}}>{loginData.errors.email}</span>
                    
        //             <label for="password">Password</label>
        //             <input type="password" name='password' placeholder="Password" id="password" onBlur={handleOnChange}/>
        //             <span style={{color: "red", fontSize: "12px", fontWeight: "bold"}}>{loginData.errors.password}</span>
                    
        //             <button type="submit">Log In</button>                   
        //             <div className="social">
        //                  <p>Not registerd ?  <Link style={{ textDecoration: 'none', color: 'red' }} to='/register'>Create an account</Link></p>
        //             </div>
        //        </form>
              
        //   </div>
        <>



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
                                        <h4 class="mb-4 pb-3 log-head" >Log In</h4>
                                        <form onSubmit={handleonSubmit}>
                                        <div class="form-group">
                                            <input type="email" name="email" class="form-style" placeholder="Your Email" id="logemail" autocomplete="off" onBlur={handleOnChange}/>
                                            <i class="input-icon uil uil-at"></i>
                                            <span style={{color: "red", fontSize: "12px", fontWeight: "bold"}}>{loginData.errors.email}</span>
                                        </div>	
                                        <div class="form-group mt-2">
                                            <input type="password" name="password" class="form-style" placeholder="Your Password" id="logpass" autocomplete="off" onBlur={handleOnChange}/>
                                            <i class="input-icon uil uil-lock-alt"></i>
                                            <span style={{color: "red", fontSize: "12px", fontWeight: "bold"}}>{loginData.errors.email}</span>
                                        </div>
                                        <button type='submit' class="btn  btn-primary my-3">submit</button>
                                        </form>
                                        <div className="social">
                                            <p style={{color:'white'}}>Not registerd ?  <Link style={{ textDecoration: 'none', color: 'red' }} to='/register'>Create an account</Link></p>
                                         </div>
                                      </div>
                                  </div>
                              </div>
                            {/* <div class="card-back">
                                <div class="center-wrap">
                                    <div class="section text-center">
                                        <h4 class="mb-4 pb-3">Sign Up</h4>
                                        <div class="form-group">
                                            <input type="text" name="logname" class="form-style" placeholder="Your Full Name" id="logname" autocomplete="off"/>
                                            <i class="input-icon uil uil-user"></i>
                                        </div>	
                                        <div class="form-group mt-2">
                                            <input type="email" name="logemail" class="form-style" placeholder="Your Email" id="logemail" autocomplete="off"/>
                                            <i class="input-icon uil uil-at"></i>
                                        </div>	
                                        <div class="form-group mt-2">
                                            <input type="password" name="logpass" class="form-style" placeholder="Your Password" id="logpass" autocomplete="off"/>
                                            <i class="input-icon uil uil-lock-alt"></i>
                                        </div>
                                        <a href="#" class="btn mt-4">submit</a>
                                      </div>
                                  </div>
                              </div> */}
                          </div>
                      </div>
                  </div>
              </div>
          </div>
    </div>
</div>
</>
     );
};

export default Login;
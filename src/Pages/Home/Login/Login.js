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
          <div id='login-body' >
               <div class="background">
                    <div class="shape"></div>
                    <div class="shape"></div>
              </div>
               <form  onSubmit={handleonSubmit}>
                    <h3>Login Here</h3>
                    <label for="email">Email</label>
                    <input type="email" name='email' placeholder="Email " id="email" onBlur={handleOnChange}/>
                    <span style={{color: "red", fontSize: "12px", fontWeight: "bold"}}>{loginData.errors.email}</span>
                    
                    <label for="password">Password</label>
                    <input type="password" name='password' placeholder="Password" id="password" onBlur={handleOnChange}/>
                    <span style={{color: "red", fontSize: "12px", fontWeight: "bold"}}>{loginData.errors.password}</span>
                    
                    <button type="submit">Log In</button>
                    
                    {/* <div class="social">
                         <div class="go"><i class="fab fa-google"></i>  Google</div>
                         <div class="fb"><i class="fab fa-facebook"></i>  Facebook</div>
                    </div> */}
                    <div className="social">
                         <p>Not registerd ?  <Link style={{ textDecoration: 'none', color: 'red' }} to='/register'>Create an account</Link></p>
                    </div>
               </form>
              
          </div>
     );
};

export default Login;